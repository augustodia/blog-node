import { NextFunction, Response } from "express";
import CustomRequest from "../interfaces/CustomRequest";

export default function combineMiddlewares(
  middlewares: Array<
    (req: CustomRequest, res: Response, next: NextFunction) => void
  >
): (req: CustomRequest, res: Response, next: NextFunction) => void {
  return middlewares.reduce((a, b) => (req, res, next) => {
    a(req, res, (err) => {
      if (err) {
        return next(err);
      }
      return b(req, res, next);
    });
  });
}
