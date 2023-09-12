import { Router } from "express";
import IUserController from "@application/controllers/@interfaces/IUserController";
import Container from "@infra/Ioc";
import { handleError } from "@application/controllers/@helpers";

const router = Router();

const controller = Container.get(IUserController);

router.post("/create", handleError(controller.create.bind(controller)));

export default { basePath: "/user", router };
