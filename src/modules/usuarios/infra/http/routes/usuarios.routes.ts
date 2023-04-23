import { Router } from "express";
import UsuariosController from "../controllers/UsuariosController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const usuariosRouter = Router();

const usuariosController = new UsuariosController();

usuariosRouter.post("/", ensureAuthenticated(1), usuariosController.create);

export default usuariosRouter;
