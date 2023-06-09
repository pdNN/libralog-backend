import { Router } from "express";
import DistribuidoraController from "../controllers/DistribuidoraController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const distribuidoraRouter = Router();

const distribuidoraController = new DistribuidoraController();

distribuidoraRouter.post(
  "/",
  ensureAuthenticated(["distribuidoras_editar"]),
  distribuidoraController.create,
);

distribuidoraRouter.put(
  "/distribuidora/:cod_distribuidora",
  ensureAuthenticated(["distribuidoras_editar"]),
  distribuidoraController.update,
);

distribuidoraRouter.get(
  "/",
  ensureAuthenticated(["distribuidoras_visualizar"]),
  distribuidoraController.getall,
);

distribuidoraRouter.get(
  "/distribuidora/:cod_distribuidora",
  ensureAuthenticated(["distribuidoras_visualizar"]),
  distribuidoraController.getone,
);

distribuidoraRouter.delete(
  "/distribuidora/:cod_distribuidora",
  ensureAuthenticated(["distribuidoras_deletar"]),
  distribuidoraController.delete,
);

export default distribuidoraRouter;
