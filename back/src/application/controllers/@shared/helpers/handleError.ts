import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import EntityNotFound from "../../../../domain/@shared/errors/EntityNotFound";
import { JsonWebTokenError } from "jsonwebtoken";

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<Response>;

export function handleError(callBack: AsyncHandler) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await callBack(req, res, next);
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        return res
          .status(401)
          .send({ error: "Invalid or expired refreshToken" });
      }

      if (e instanceof ZodError) {
        return res.status(400).send({ error: JSON.parse(e.message) });
      }

      if (e instanceof EntityNotFound) {
        return res
          .status(401)
          .send({ error: `${e.message} not found or unauthorized action` });
      }

      if (e instanceof Error) {
        return res.status(400).send({ error: e.message });
      }

      return res.status(500).send({ error: e });
    }
  };
}
