import { Router } from 'express';
import DistribuidoraController from '../controllers/DistribuidoraController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const distribuidoraRouter = Router();

const distribuidoraController = new DistribuidoraController();

distribuidoraRouter.post(
  '/',
  ensureAuthenticated(1),
  distribuidoraController.create,
);

export default distribuidoraRouter;
