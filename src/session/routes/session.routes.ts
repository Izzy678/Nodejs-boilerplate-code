import { Router } from "express";
import { createSessionHandler, deleteSessionHandler } from "../controller/session.controller";
import { ValidateUserInput } from "../../middleware/validation.middleware";
import { createSessionSchema } from "../validator/session.validator";
const sessionRoutes = Router();

sessionRoutes.post('/create-session',ValidateUserInput(createSessionSchema),createSessionHandler);
sessionRoutes.delete('/delete-session',deleteSessionHandler);

export default sessionRoutes;