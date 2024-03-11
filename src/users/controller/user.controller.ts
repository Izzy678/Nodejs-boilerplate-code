import { NextFunction, Request, Response } from "express";
import { createUser } from "../servies/user.service";
import { HttpStatusCode } from "../../common/enums/httpStatusCode.enum";
import log from "../../common/utils/function/logger";

export const createUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createdUser = await createUser(req.body);
    res.status(HttpStatusCode.SUCCESS).send(createdUser);
  } catch (error: any) {
    next(error);
  }
};

export const viewUserProfileHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenData = res.locals.user;
  res.send(tokenData)
};
