import { Router } from "express";
import UsuariosController from "../controllers/UsuariosController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const usuariosRouter = Router();

const usuariosController = new UsuariosController();

usuariosRouter.post("/", ensureAuthenticated(1), usuariosController.create);

usuariosRouter.put(
  "/:cod_usuario",
  ensureAuthenticated(1),
  usuariosController.update,
);

usuariosRouter.get("/", ensureAuthenticated(1), usuariosController.getall);

usuariosRouter.get(
  "/:cod_usuario",
  ensureAuthenticated(1),
  usuariosController.getone,
);

usuariosRouter.delete(
  "/:cod_usuario",
  ensureAuthenticated(1),
  usuariosController.delete,
);

export default usuariosRouter;
