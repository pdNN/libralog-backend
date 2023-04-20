import { Router } from 'express';
import UsuariosController from '../controllers/UsuariosController';

const usuariosRouter = Router();

const usuariosController = new UsuariosController();

usuariosRouter.post('/', (req, res, next) => {
  usuariosController.create(req, res).catch((error) => {
    next(error);
  });
});

export default usuariosRouter;
