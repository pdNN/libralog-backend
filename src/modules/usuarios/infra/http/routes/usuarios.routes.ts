import { Router } from "express";
import UsuariosController from "../controllers/UsuariosController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const usuariosRouter = Router();

const usuariosController = new UsuariosController();

usuariosRouter.post(
  "/",
  ensureAuthenticated(["usuarios_editar"]),
  usuariosController.create,
);

usuariosRouter.put(
  "/:cod_usuario",
  ensureAuthenticated(["usuarios_editar"]),
  usuariosController.update,
);

usuariosRouter.get(
  "/",
  ensureAuthenticated(["usuarios_visualizar"]),
  usuariosController.getall,
);

usuariosRouter.get(
  "/:cod_usuario",
  ensureAuthenticated(["usuarios_visualizar"]),
  usuariosController.getone,
);

usuariosRouter.delete(
  "/:cod_usuario",
  ensureAuthenticated(["usuarios_deletar"]),
  usuariosController.delete,
);

export default usuariosRouter;
