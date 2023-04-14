import { Distribuidora } from "./distribuidora";

export type UsuarioCreationProps = {
  nome_usuario: string;
  email_usuario: string;
  des_senha: string;
  cod_distribuidora: number;
};

export type Usuario = {
  cod_usuario: number;
  nome_usuario: string;
  email_usuario: string;
  des_senha: string;
  dthr_criacao: Date;
  dthr_atualizacao: Date;
  distribuidora?: Distribuidora;
  cod_distribuidora: number;
};
