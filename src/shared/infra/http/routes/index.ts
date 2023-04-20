import { Router } from 'express';

import usuariosRouter from '@modules/usuarios/infra/http/routes/usuarios.routes';
import distribuidoraRouter from '@modules/distribuidoras/infra/http/routes/distribuidora.routes';

const routes = Router();

routes.use('/usuarios', usuariosRouter);
routes.use('/distribuidoras', distribuidoraRouter);

export default routes;
