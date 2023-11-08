import { Router } from "express";
import IUserController from "@application/controllers/@shared/interfaces/IUserController";
import Container from "@infra/Ioc";
import { handleError } from "src/application/controllers/@shared/helpers";
import { authMiddleware } from "@application/controllers/@shared/middlewares";

const router = Router();

const controller = Container.get(IUserController);

router.get("/get/:id", handleError(controller.findUser.bind(controller)));
router.post("/create", handleError(controller.create.bind(controller)));

router.use(authMiddleware);
router.get(
  "/my-profile",
  handleError(controller.getMyProfile.bind(controller))
);

export default { basePath: "/user", router };
