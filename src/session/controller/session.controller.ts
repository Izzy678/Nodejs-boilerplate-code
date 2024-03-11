import { generateTokens } from "../../auth/service/token.service";
import { HttpStatusCode } from "../../common/enums/httpStatusCode.enum";
import { BadRequestException } from "../../common/error/http.error.";
import { comparePassword } from "../../common/utils/function/bcrypt";
import { ISignIn } from "../../users/dto/user.dto";
import { findUserByEmail } from "../../users/servies/user.service";
import {
  createSession,
  deleteSession,
  updateSession,
} from "../service/session.service";
import { NextFunction, Request, Response } from "express";

export async function createSessionHandler(req: Request, res: Response) {
  const { email, password } = req.body;
  const foundUser = await findUserByEmail(email);
  if (!foundUser) throw new BadRequestException("invalid email or password");
  const isValidPassword = await comparePassword(password, foundUser.password);
  if (!isValidPassword)
    throw new BadRequestException("invalid email or password");
  const createdSession = await createSession(
    foundUser.id,
    req.get("user-agent") || ""
  );
  const { accessToken, refreshToken } = generateTokens(
    foundUser,
    createdSession.id
  );
  // return access & refresh tokens

  res.cookie("accessToken", accessToken, {
    maxAge: 900000, // 15 mins
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "strict",
    secure: false,
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 30 * 24 * 60 * 60, //  30 days * 24 hours * 60 minutes * 60 seconds)
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "strict",
    secure: false,
  });

  res
    .status(HttpStatusCode.SUCCESS)
    .json({ message: "user logged in successfully", createdSession });
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;
  const deletedSession = await deleteSession({
    id: sessionId,
  });
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res
    .status(HttpStatusCode.SUCCESS)
    .json({ deletedSession, message: "session deleted" });
}
