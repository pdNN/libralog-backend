import { Router } from "express";
import FiscalController from "../controllers/FiscalController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const fiscalRouter = Router();

const fiscalController = new FiscalController();

fiscalRouter.post(
  "/fiscal/",
  ensureAuthenticated(["fiscal_editar"]),
  fiscalController.create,
);

fiscalRouter.put(
  "/fiscal/:cod_documento",
  ensureAuthenticated(["fiscal_editar"]),
  fiscalController.update,
);

fiscalRouter.get(
  "/",
  ensureAuthenticated(["fiscal_visualizar"]),
  fiscalController.getall,
);

fiscalRouter.get(
  "/fiscal/:cod_documento",
  ensureAuthenticated(["fiscal_visualizar"]),
  fiscalController.getone,
);

fiscalRouter.delete(
  "/fiscal/:cod_documento",
  ensureAuthenticated(["fiscal_deletar"]),
  fiscalController.delete,
);

export default fiscalRouter;
