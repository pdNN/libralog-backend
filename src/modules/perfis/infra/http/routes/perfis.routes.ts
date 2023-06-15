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
  "/perfil/:cod_perfil",
  ensureAuthenticated(["perfis_editar"]),
  perfisController.update,
);

perfisRouter.get(
  "/",
  ensureAuthenticated(["perfis_visualizar"]),
  perfisController.getall,
);

perfisRouter.get(
  "/",
  ensureAuthenticated(["perfis_visualizar"]),
  perfisController.getallallowed,
);

perfisRouter.get(
  "/perfil/:cod_perfil",
  ensureAuthenticated(["perfis_visualizar"]),
  perfisController.getone,
);

perfisRouter.delete(
  "/perfil/:cod_perfil",
  ensureAuthenticated(["perfis_deletar"]),
  perfisController.delete,
);

perfisRouter.get(
  "/list_permissions",
  ensureAuthenticated(["perfis_editar", "perfis_visualizar"]),
  perfisController.listpermissionsmodule,
);

export default perfisRouter;
