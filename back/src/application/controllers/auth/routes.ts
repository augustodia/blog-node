import { Router, Response, Request } from "express";
import Container from "@infra/Ioc";
import { IAuthController } from "@application/controllers/@interfaces";
import { handleError } from "@application/controllers/@helpers";

const router = Router();

const controller = Container.get(IAuthController);
router.post("/login", handleError(controller.login.bind(controller)));

export default { basePath: "/auth", router };
