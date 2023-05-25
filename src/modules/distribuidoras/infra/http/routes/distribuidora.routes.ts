import { Router } from "express";
import DistribuidoraController from "../controllers/DistribuidoraController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const distribuidoraRouter = Router();

const distribuidoraController = new DistribuidoraController();

distribuidoraRouter.post(
  "/",
  ensureAuthenticated(["distribuidora_editar"]),
  distribuidoraController.create,
);

distribuidoraRouter.put(
  "/:cod_distribuidora",
  ensureAuthenticated(["distribuidora_editar"]),
  distribuidoraController.update,
);

distribuidoraRouter.get(
  "/",
  ensureAuthenticated(["distribuidora_visualizar"]),
  distribuidoraController.getall,
);

distribuidoraRouter.get(
  "/:cod_distribuidora",
  ensureAuthenticated(["distribuidora_visualizar"]),
  distribuidoraController.getone,
);

distribuidoraRouter.delete(
  "/:cod_distribuidora",
  ensureAuthenticated(["distribuidora_deletar"]),
  distribuidoraController.delete,
);

export default distribuidoraRouter;
