import { Router } from "express";

import sessionsRouter from "@modules/usuarios/infra/http/routes/sessions.routes";
import usuariosRouter from "@modules/usuarios/infra/http/routes/usuarios.routes";
import distribuidoraRouter from "@modules/distribuidoras/infra/http/routes/distribuidora.routes";
import bancaRouter from "@modules/bancas/infra/http/routes/banca.routes";
import editorasRouter from "@modules/editoras/infra/http/routes/editora.routes";

const routes = Router();

routes.use("/sessions", sessionsRouter);
routes.use("/editoras", editorasRouter);
routes.use("/usuarios", usuariosRouter);
routes.use("/distribuidoras", distribuidoraRouter);
routes.use("/bancas", bancaRouter);

export default routes;
