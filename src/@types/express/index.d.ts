/* eslint-disable no-unused-vars */
declare namespace Express {
  interface Request {
    usuario: {
      id: number;
      cod_perfil: number;
      cod_distribuidora: number;
    };
  }
}
