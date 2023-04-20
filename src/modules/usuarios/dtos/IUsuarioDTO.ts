import { IDistribuidoraDTO } from '@modules/distribuidoras/dtos/IDistribuidoraDTO';

export type ICreateUsuarioDTO = {
  nome_usuario: string;
  email_usuario: string;
  des_senha: string;
  cod_distribuidora: number;
};

export type IUsuarioDTO = {
  cod_usuario: number;
  nome_usuario: string;
  email_usuario: string;
  des_senha: string;
  dthr_criacao: Date;
  dthr_atualizacao: Date;
  distribuidora?: IDistribuidoraDTO;
  cod_distribuidora: number;
};
