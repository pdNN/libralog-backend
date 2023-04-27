import { Router } from "express";
import DistribuidoraController from "../controllers/DistribuidoraController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const distribuidoraRouter = Router();

const distribuidoraController = new DistribuidoraController();

distribuidoraRouter.post(
  "/",
  ensureAuthenticated(1),
  distribuidoraController.create,
);

distribuidoraRouter.put(
  "/:cod_distribuidora",
  ensureAuthenticated(1),
  distribuidoraController.update,
);

distribuidoraRouter.get(
  "/",
  ensureAuthenticated(1),
  distribuidoraController.getall,
);

distribuidoraRouter.get(
  "/:cod_distribuidora",
  ensureAuthenticated(1),
  distribuidoraController.getone,
);

distribuidoraRouter.delete(
  "/:cod_distribuidora",
  ensureAuthenticated(1),
  distribuidoraController.delete,
);

export default distribuidoraRouter;
