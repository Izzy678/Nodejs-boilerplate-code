import { Router } from "express";
import { SignInUserHandler, SignOutUserHandler } from "../controller/auth.controller";
import { ValidateUserInput } from "../../middleware/validation.middleware";
import { signInSchema } from "../validation/auth.validation";

const authRouter = Router();

authRouter.get('/sign-in',ValidateUserInput(signInSchema),SignInUserHandler);
authRouter.post('/sign-out',SignOutUserHandler);

export default authRouter;