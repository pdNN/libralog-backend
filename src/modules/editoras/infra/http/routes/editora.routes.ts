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
  "/editora/:cod_editora",
  ensureAuthenticated(["editoras_editar"]),
  editoraController.update,
);

editoraRouter.get(
  "/",
  ensureAuthenticated(["editoras_visualizar"]),
  editoraController.getall,
);

editoraRouter.get(
  "/editora/:cod_editora",
  ensureAuthenticated(["editoras_visualizar"]),
  editoraController.getone,
);

editoraRouter.delete(
  "/editora/:cod_editora",
  ensureAuthenticated(["editoras_deletar"]),
  editoraController.delete,
);

export default editoraRouter;
