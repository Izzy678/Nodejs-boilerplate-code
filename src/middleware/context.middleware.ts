import { Request,Response, NextFunction } from "express";

export function contextMiddleware(req: Request, res: Response, next: NextFunction) {
    // Set the request and response objects on the global context
    (global as any).request = req;
    (global as any).response = res;

    console.log((global as any).request);
    next();
  }