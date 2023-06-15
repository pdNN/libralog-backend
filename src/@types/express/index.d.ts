/* eslint-disable no-unused-vars */
declare namespace Express {
  interface Request {
    usuario: {
      cod_usuario: number;
      permissoes: string[];
      cod_perfil: number;
      nome_perfil: string;
      cod_distribuidora: number;
      distribuidora: {
        cod_distribuidora: number;
        nome_distribuidora: string;
        qtd_licencas: number;
        dthr_criacao: Date;
        dthr_atualizacao: Date;
      };
    };
  }
}
