import { Application, Request, Response } from "express";
import type { RouteType } from "@application/controllers/@types/routeType";
import authController from "@application/controllers/auth/routes";
import userController from "@application/controllers/user/routes";

function defineRoutes(app: Application) {
  return ({ basePath, router }: RouteType) => {
    app.use(basePath, router);
  };
}

export default function initiateRoutes(app: Application) {
  const routes: RouteType[] = [authController, userController];

  routes.map(defineRoutes(app));

  app.use("/ping", (req: Request, res: Response) => {
    res.send("pong");
  });
}
