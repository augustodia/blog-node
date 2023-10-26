import Container from "@infra/Ioc";
import { Router } from "express";
import { IPostController } from "@application/controllers/@shared/interfaces";
import { handleError } from "src/application/controllers/@shared/helpers";
import { authMiddleware } from "src/application/controllers/@shared/middlewares";

const router = Router();

router.use(authMiddleware);

const controller = Container.get(IPostController);

router.post("/create", handleError(controller.create.bind(controller)));
router.put("/update/:idSync", handleError(controller.update.bind(controller)));
router.post(
  "/inactivate/:idSync",
  handleError(controller.inactivate.bind(controller))
);
router.post(
  "/reactivate/:idSync",
  handleError(controller.reactivate.bind(controller))
);
router.delete(
  "/delete/:idSync",
  handleError(controller.delete.bind(controller))
);

export default { basePath: "/post", router };
