import { Router } from "express";
import Container from "@infra/Ioc";
import { IAuthController } from "src/application/controllers/@shared/interfaces";
import { handleError } from "src/application/controllers/@shared/helpers";

const router = Router();

const controller = Container.get(IAuthController);
router.post("/login", handleError(controller.login.bind(controller)));
router.post(
  "/refresh-token",
  handleError(controller.refreshToken.bind(controller))
);

export default { basePath: "/auth", router };
