import { Router } from "express";
import PerfisController from "../controllers/PerfisController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const perfisRouter = Router();

const perfisController = new PerfisController();

perfisRouter.post(
  "/",
  ensureAuthenticated(["perfis_editar"]),
  perfisController.create,
);

perfisRouter.put(
  "/:cod_perfil",
  ensureAuthenticated(["perfis_editar"]),
  perfisController.update,
);

perfisRouter.get(
  "/",
  ensureAuthenticated(["perfis_visualizar"]),
  perfisController.getall,
);

perfisRouter.get(
  "/:cod_perfil",
  ensureAuthenticated(["perfis_visualizar"]),
  perfisController.getone,
);

perfisRouter.delete(
  "/:cod_perfil",
  ensureAuthenticated(["perfis_deletar"]),
  perfisController.delete,
);

export default perfisRouter;
