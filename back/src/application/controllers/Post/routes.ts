import Container from "@infra/Ioc";
import { Router } from "express";
import { IPostController } from "@application/controllers/@shared/interfaces";
import { handleError } from "src/application/controllers/@shared/helpers";
import { authMiddleware } from "src/application/controllers/@shared/middlewares";

const router = Router();

router.use(authMiddleware);

const controller = Container.get(IPostController);

router.post("/create", handleError(controller.create.bind(controller)));

export default { basePath: "/post", router };
