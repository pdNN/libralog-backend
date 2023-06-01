import { Router } from "express";
import EntregadorController from "../controllers/EntregadorController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const entregadorRouter = Router();

const entregadorController = new EntregadorController();

entregadorRouter.post(
  "/",
  ensureAuthenticated(["entregadores_editar"]),
  entregadorController.create,
);

entregadorRouter.put(
  "/:cod_entregador",
  ensureAuthenticated(["entregadores_editar"]),
  entregadorController.update,
);

entregadorRouter.get(
  "/",
  ensureAuthenticated(["entregadores_visualizar"]),
  entregadorController.getall,
);

entregadorRouter.get(
  "/:cod_entregador",
  ensureAuthenticated(["entregadores_visualizar"]),
  entregadorController.getone,
);

entregadorRouter.delete(
  "/:cod_entregador",
  ensureAuthenticated(["entregadores_deletar"]),
  entregadorController.delete,
);

export default entregadorRouter;
