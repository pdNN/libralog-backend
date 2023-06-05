import { Router } from "express";
import RevistasController from "../controllers/RevistasController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const revistasRouter = Router();

const revistasController = new RevistasController();

revistasRouter.post(
  "/",
  ensureAuthenticated(["revistas_editar"]),
  revistasController.create,
);

revistasRouter.put(
  "/:cod_revista",
  ensureAuthenticated(["revistas_editar"]),
  revistasController.update,
);

revistasRouter.get(
  "/",
  ensureAuthenticated(["revistas_visualizar"]),
  revistasController.getall,
);

revistasRouter.get(
  "/:cod_revista",
  ensureAuthenticated(["revistas_visualizar"]),
  revistasController.getone,
);

revistasRouter.delete(
  "/:cod_revista",
  ensureAuthenticated(["revistas_deletar"]),
  revistasController.delete,
);

export default revistasRouter;
