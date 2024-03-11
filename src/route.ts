import { Router } from "express";
import authRouter from "./auth/route/auth.router";
import userRoutes from "./users/route/user.route";
import sessionRoute from "./session/routes/session.routes";

const appRoute = Router();

appRoute.use('/auth',authRouter);
appRoute.use('/users',userRoutes);
appRoute.use('/sessions',sessionRoute)

export default appRoute;