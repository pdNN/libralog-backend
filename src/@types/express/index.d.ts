/* eslint-disable no-unused-vars */
declare namespace Express {
  interface Request {
    usuario: {
      cod_usuario: number;
      permissoes: string[];
      nome_perfil: string;
      cod_distribuidora: number;
    };
  }
}
