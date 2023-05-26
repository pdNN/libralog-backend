import { Router } from "express";
import EditoraController from "../controllers/EditoraController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const editoraRouter = Router();

const editoraController = new EditoraController();

editoraRouter.post("/", ensureAuthenticated(1), editoraController.create);

editoraRouter.put(
  "/:cod_editora",
  ensureAuthenticated(1),
  editoraController.update,
);

editoraRouter.get("/", ensureAuthenticated(1), editoraController.getall);

editoraRouter.get(
  "/:cod_editora",
  ensureAuthenticated(1),
  editoraController.getone,
);

editoraRouter.delete(
  "/:cod_editora",
  ensureAuthenticated(1),
  editoraController.delete,
);

export default editoraRouter;
