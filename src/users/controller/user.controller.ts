import { NextFunction, Request, Response } from "express";
import { createUser, updateUser } from "../servies/user.service";
import { HttpStatusCode } from "../../common/enums/httpStatusCode.enum";
import { TokenDto } from "../../auth/dto/token.dto";

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
  res.send(tokenData);
};

export const updateUserProfileHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenData = res.locals.user as TokenDto;
  const updatedUser = await updateUser({id:tokenData.user}, req.body);
  res.status(HttpStatusCode.SUCCESS).send({
    message: "user updated succesfully",
    updatedUser,
  });
};
