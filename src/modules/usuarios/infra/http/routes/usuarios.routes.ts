import { Router } from "express";
import UsuariosController from "../controllers/UsuariosController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const usuariosRouter = Router();

const usuariosController = new UsuariosController();

usuariosRouter.post(
  "/",
  ensureAuthenticated(["perfis_editar"]),
  usuariosController.create,
);

usuariosRouter.put(
  "/:cod_usuario",
  ensureAuthenticated(["perfis_editar"]),
  usuariosController.update,
);

usuariosRouter.get(
  "/",
  ensureAuthenticated(["perfis_visualizar"]),
  usuariosController.getall,
);

usuariosRouter.get(
  "/:cod_usuario",
  ensureAuthenticated(["perfis_visualizar"]),
  usuariosController.getone,
);

usuariosRouter.delete(
  "/:cod_usuario",
  ensureAuthenticated(["perfis_deletar"]),
  usuariosController.delete,
);

export default usuariosRouter;
