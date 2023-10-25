import { Router } from "express";
import IUserController from "@application/controllers/@shared/interfaces/IUserController";
import Container from "@infra/Ioc";
import { handleError } from "src/application/controllers/@shared/helpers";

const router = Router();

const controller = Container.get(IUserController);

router.post("/create", handleError(controller.create.bind(controller)));

export default { basePath: "/user", router };
