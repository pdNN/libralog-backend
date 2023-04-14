import { Router } from "express";

import usuariosRouter from "./usuarios.routes";
import distribuidoraRouter from "./distribuidora.routes";

const routes = Router();

routes.use("/usuarios", usuariosRouter);
routes.use("/distribuidoras", distribuidoraRouter);

export default routes;
