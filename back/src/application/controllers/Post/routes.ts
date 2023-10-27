import Container from "@infra/Ioc";
import { Router } from "express";
import { IPostController } from "@application/controllers/@shared/interfaces";
import { handleError } from "src/application/controllers/@shared/helpers";
import { authMiddleware } from "src/application/controllers/@shared/middlewares";

const router = Router();

router.use(authMiddleware);

const controller = Container.get(IPostController);

router.get("/", handleError(controller.getAll.bind(controller)));
router.get("/:id", handleError(controller.getById.bind(controller)));
router.get(
  "/by-user/:userId",
  handleError(controller.getByUser.bind(controller))
);
router.post("/create", handleError(controller.create.bind(controller)));
router.post("/create", handleError(controller.create.bind(controller)));
router.put("/update/:id", handleError(controller.update.bind(controller)));
router.post(
  "/inactivate/:id",
  handleError(controller.inactivate.bind(controller))
);
router.post(
  "/reactivate/:id",
  handleError(controller.reactivate.bind(controller))
);
router.delete("/delete/:id", handleError(controller.delete.bind(controller)));

export default { basePath: "/post", router };
