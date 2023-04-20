import { Router } from 'express';
import DistribuidoraController from '../controllers/DistribuidoraController';

const distribuidoraRouter = Router();

const distribuidoraController = new DistribuidoraController();

distribuidoraRouter.post('/', (req, res, next) => {
  distribuidoraController.create(req, res).catch((error) => {
    next(error);
  });
});

export default distribuidoraRouter;
