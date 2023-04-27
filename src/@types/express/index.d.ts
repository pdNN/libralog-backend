/* eslint-disable no-unused-vars */
declare namespace Express {
  interface Request {
    usuario: {
      cod_usuario: number;
      cod_perfil: number;
      cod_distribuidora: number;
    };
  }
}
