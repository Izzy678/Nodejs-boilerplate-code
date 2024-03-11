import { Router } from "express";
import { createUserHandler, updateUserProfileHandler, viewUserProfileHandler } from "../controller/user.controller";
import { ValidateUserInput } from "../../middleware/validation.middleware";
import { signUpSchema, updateUserSchema } from "../validator/user.validator";
import requireUser from "../../middleware/requireUser.middleware";

const userRoutes = Router();

userRoutes.post('/sign-up',ValidateUserInput(signUpSchema),createUserHandler);
userRoutes.get('/view-profile',viewUserProfileHandler);
userRoutes.patch('/update-profile',[requireUser, ValidateUserInput(updateUserSchema)],updateUserProfileHandler);

export default userRoutes;