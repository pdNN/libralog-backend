import { Router } from "express";

import sessionsRouter from "@modules/usuarios/infra/http/routes/sessions.routes";
import usuariosRouter from "@modules/usuarios/infra/http/routes/usuarios.routes";
import distribuidoraRouter from "@modules/distribuidoras/infra/http/routes/distribuidora.routes";
import bancaRouter from "@modules/bancas/infra/http/routes/banca.routes";
import editorasRouter from "@modules/editoras/infra/http/routes/editora.routes";
import perfisRouter from "@modules/perfis/infra/http/routes/perfis.routes";
import revistasRouter from "@modules/revistas/infra/http/routes/revistas.routes";

const routes = Router();

routes.use("/sessions", sessionsRouter);
routes.use("/editoras", editorasRouter);
routes.use("/usuarios", usuariosRouter);
routes.use("/perfis", perfisRouter);
routes.use("/revistas", revistasRouter);
routes.use("/distribuidoras", distribuidoraRouter);
routes.use("/bancas", bancaRouter);

export default routes;
