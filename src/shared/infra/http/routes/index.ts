import { Router } from "express";

import sessionsRouter from "@modules/usuarios/infra/http/routes/sessions.routes";

import usuariosRouter from "@modules/usuarios/infra/http/routes/usuarios.routes";
import distribuidoraRouter from "@modules/distribuidoras/infra/http/routes/distribuidora.routes";

const routes = Router();

routes.use("/sessions", sessionsRouter);

routes.use("/usuarios", usuariosRouter);
routes.use("/distribuidoras", distribuidoraRouter);

export default routes;
