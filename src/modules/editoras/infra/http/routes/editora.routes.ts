import { Router } from "express";
import EditoraController from "../controllers/EditoraController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const editoraRouter = Router();

const editoraController = new EditoraController();

editoraRouter.post(
  "/",
  ensureAuthenticated(["editoras_editar"]),
  editoraController.create,
);

editoraRouter.put(
  "/:cod_editora",
  ensureAuthenticated(["editoras_editar"]),
  editoraController.update,
);

editoraRouter.get(
  "/",
  ensureAuthenticated(["editoras_editar"]),
  editoraController.getall,
);

editoraRouter.get(
  "/:cod_editora",
  ensureAuthenticated(["editoras_editar"]),
  editoraController.getone,
);

editoraRouter.delete(
  "/:cod_editora",
  ensureAuthenticated(["editoras_editar"]),
  editoraController.delete,
);

export default editoraRouter;
