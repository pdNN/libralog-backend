import { Router } from "express";
import MovimentoController from "../controllers/MovimentoController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const movimentoRouter = Router();

const movimentoController = new MovimentoController();

movimentoRouter.post(
  "/",
  ensureAuthenticated(["movimento_editar"]),
  movimentoController.create,
);

movimentoRouter.put(
  "/movimento/:cod_movimento",
  ensureAuthenticated(["movimento_editar"]),
  movimentoController.update,
);

movimentoRouter.get(
  "/",
  ensureAuthenticated(["movimento_visualizar"]),
  movimentoController.getall,
);

movimentoRouter.get(
  "/movimento/:cod_movimento",
  ensureAuthenticated(["movimento_visualizar"]),
  movimentoController.getone,
);

movimentoRouter.delete(
  "/movimento/:cod_movimento",
  ensureAuthenticated(["movimento_deletar"]),
  movimentoController.delete,
);

export default movimentoRouter;
