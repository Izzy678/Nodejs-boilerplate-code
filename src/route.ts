import { Router } from "express";
import authRouter from "./auth/route/auth.router";
import userRoutes from "./users/route/user.route";
import sessionRoute from "./session/routes/session.routes";

const appRoute = Router();

appRoute.use('/api/auth',authRouter);
appRoute.use('/api/users',userRoutes);
appRoute.use('/api/sessions',sessionRoute);

export default appRoute;