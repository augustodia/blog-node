import { Application, Request, Response } from "express";
import type { RouteType } from "@application/controllers/@shared/types/routeType";
import authController from "@application/controllers/Auth/routes";
import userController from "@application/controllers/User/routes";
import postController from "@application/controllers/Post/routes";

function defineRoutes(app: Application) {
  return ({ basePath, router }: RouteType) => {
    app.use(basePath, router);
  };
}

export default function initiateRoutes(app: Application) {
  const routes: RouteType[] = [authController, userController, postController];

  routes.map(defineRoutes(app));

  app.use("/ping", (req: Request, res: Response) => {
    res.send("pong");
  });
}
