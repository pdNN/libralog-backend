import { Router } from "express";
import BancaController from "../controllers/BancaController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const bancaRouter = Router();

const bancaController = new BancaController();

bancaRouter.post(
  "/",
  ensureAuthenticated(["bancas_editar"]),
  bancaController.create,
);

bancaRouter.put(
  "/:cod_banca",
  ensureAuthenticated(["bancas_editar"]),
  bancaController.update,
);

bancaRouter.get(
  "/",
  ensureAuthenticated(["bancas_visualizar"]),
  bancaController.getall,
);

bancaRouter.get(
  "/:cod_banca",
  ensureAuthenticated(["bancas_visualizar"]),
  bancaController.getone,
);

bancaRouter.delete(
  "/:cod_banca",
  ensureAuthenticated(["bancas_deletar"]),
  bancaController.delete,
);

export default bancaRouter;
