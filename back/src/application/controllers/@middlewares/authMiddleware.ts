import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import process from "process";
import { UnauthorizedError } from "../../../domain/@errors";
import * as console from "console";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) return next(new UnauthorizedError("Need a valid token"));
  try {
    const clearToken = token.replace("Bearer ", "");

    jwt.verify(clearToken, process.env.JWT_SECRET as string, {});

    return next();
  } catch (e) {
    if (e instanceof JsonWebTokenError) {
      return res.status(401).send({ error: "Invalid or expired token" });
    }

    next(e);
  }
}
