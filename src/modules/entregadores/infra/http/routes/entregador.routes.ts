import { Router } from "express";
import EntregadorController from "../controllers/EntregadorController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const entregadorRouter = Router();

const entregadorController = new EntregadorController();

entregadorRouter.post(
  "/",
  ensureAuthenticated(["entregadors_editar"]),
  entregadorController.create,
);

entregadorRouter.put(
  "/:cod_entregador",
  ensureAuthenticated(["entregadors_editar"]),
  entregadorController.update,
);

entregadorRouter.get(
  "/",
  ensureAuthenticated(["entregadors_visualizar"]),
  entregadorController.getall,
);

entregadorRouter.get(
  "/:cod_entregador",
  ensureAuthenticated(["entregadors_visualizar"]),
  entregadorController.getone,
);

entregadorRouter.delete(
  "/:cod_entregador",
  ensureAuthenticated(["entregadors_deletar"]),
  entregadorController.delete,
);

export default entregadorRouter;
