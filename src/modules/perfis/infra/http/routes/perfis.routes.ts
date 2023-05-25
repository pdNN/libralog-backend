import { Router } from "express";
import PerfisController from "../controllers/PerfisController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const perfisRouter = Router();

const perfisController = new PerfisController();

perfisRouter.post("/", ensureAuthenticated(1), perfisController.create);

perfisRouter.put("/:cod_perfil", perfisController.update);

perfisRouter.get("/", ensureAuthenticated(1), perfisController.getall);

perfisRouter.get(
  "/:cod_perfil",
  ensureAuthenticated(1),
  perfisController.getone,
);

perfisRouter.delete(
  "/:cod_perfil",
  ensureAuthenticated(1),
  perfisController.delete,
);

export default perfisRouter;
