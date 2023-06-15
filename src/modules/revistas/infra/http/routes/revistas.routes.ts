import { Router } from "express";
import RevistasController from "../controllers/RevistaController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const revistasRouter = Router();

const revistasController = new RevistasController();

revistasRouter.post(
  "/",
  ensureAuthenticated(["revistas_editar"]),
  revistasController.create,
);

revistasRouter.put(
  "/revista/:cod_revista",
  ensureAuthenticated(["revistas_editar"]),
  revistasController.update,
);

revistasRouter.get(
  "/",
  ensureAuthenticated(["revistas_visualizar"]),
  revistasController.getall,
);

revistasRouter.get(
  "/revista/:cod_revista",
  ensureAuthenticated(["revistas_visualizar"]),
  revistasController.getone,
);

revistasRouter.delete(
  "/revista/:cod_revista",
  ensureAuthenticated(["revistas_deletar"]),
  revistasController.delete,
);

export default revistasRouter;
