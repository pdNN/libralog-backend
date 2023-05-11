import { Router } from "express";
import BancaController from "../controllers/BancaController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const bancaRouter = Router();

const bancaController = new BancaController();

bancaRouter.post("/", ensureAuthenticated(1), bancaController.create);

bancaRouter.put("/:cod_banca", ensureAuthenticated(1), bancaController.update);

bancaRouter.get("/", ensureAuthenticated(1), bancaController.getall);

bancaRouter.get("/:cod_banca", ensureAuthenticated(1), bancaController.getone);

bancaRouter.delete(
  "/:cod_banca",
  ensureAuthenticated(1),
  bancaController.delete,
);

export default bancaRouter;
