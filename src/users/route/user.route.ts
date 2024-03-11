import { Router } from "express";
import { createUserHandler, viewUserProfileHandler } from "../controller/user.controller";
import { ValidateUserInput } from "../../middleware/validation.middleware";
import { signUpValidator } from "../validator/user.validator";

const userRoutes = Router();

userRoutes.post('/sign-up',ValidateUserInput(signUpValidator),createUserHandler)
userRoutes.get('/view-profile',viewUserProfileHandler)

export default userRoutes;