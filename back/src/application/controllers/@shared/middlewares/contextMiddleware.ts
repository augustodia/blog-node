import { NextFunction, Response } from "express";
import Container from "@infra/Ioc";

import { IUserService } from "@interfaces/services";

import { UserContext } from "@DTO";

import { UnauthorizedError } from "@application/controllers/@shared/errors";
import { CustomRequest } from "@application/controllers/@shared/interfaces";

async function mountContext(userId: string): Promise<UserContext> {
  const userService = Container.get(IUserService);

  const user = await userService.findById(userId);

  if (!user) throw new UnauthorizedError("Invalid Credentials");

  return {
    userId: user.id,
  };
}

export default async function contextMiddleware(
  req: CustomRequest,
  _res: Response,
  next: NextFunction
): Promise<void> {
  if (req.userId) {
    try {
      const response = await mountContext(req.userId);

      req.context = response;
    } catch (error) {
      next(new UnauthorizedError("Invalid Credentials"));

      return;
    }
  }

  next();
}