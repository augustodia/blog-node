import { NextFunction, Response } from "express";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import process from "process";

import { UnauthorizedError } from "@application/controllers/@shared/errors";
import combineMiddlewares from "@application/controllers/@shared/middlewares/combineMiddlewares";
import contextMiddleware from "@application/controllers/@shared/middlewares/contextMiddleware";
import CustomRequest from "../interfaces/CustomRequest";

function verifyToken(req: CustomRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) return next(new UnauthorizedError("Need a valid token"));

  try {
    const clearToken = token.replace("Bearer ", "");

    const payload = jwt.verify(clearToken, process.env.JWT_SECRET as string, {
      ignoreExpiration: false,
    }) as JwtPayload;

    if (payload.sub) req.userId = payload.sub;

    return next();
  } catch (e) {
    if (e instanceof JsonWebTokenError) {
      return res.status(401).send(e.message);
    }

    next(e);
  }
}

export const authMiddleware = combineMiddlewares([
  verifyToken,
  contextMiddleware,
]);
