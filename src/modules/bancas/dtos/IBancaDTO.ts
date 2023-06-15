import { IDistribuidoraDTO } from "@modules/distribuidoras/dtos/IDistribuidoraDTO";
import { IEntregadorDTO } from "@modules/entregadores/dtos/IEntregadorDTO";

export type IUpdateBancaDTO = {
  cod_banca: number;
  nome_banca?: string;
  des_razao_social?: string;
  des_contato?: string;
  des_endereco?: string;
  nr_endereco?: string;
  des_bairro?: string;
  des_cidade?: string;
  nr_cep?: string;
  nr_telefone?: string;
  cod_cnpj?: string;
  cod_insc_estadual?: string;
  des_email?: string;
  cod_distribuidora?: number;
  cod_entregador?: number;
};

export type ICreateBancaDTO = {
  nome_banca: string;
  des_razao_social: string;
  des_contato: string;
  des_endereco: string;
  nr_endereco: string;
  des_bairro: string;
  des_cidade: string;
  nr_cep: string;
  nr_telefone: string;
  cod_cnpj: string;
  cod_insc_estadual: string;
  des_email: string;
  cod_distribuidora?: number;
  cod_entregador?: number;
};

export type IBancaDTO = {
  cod_banca: number;
  nome_banca: string;
  des_razao_social: string;
  des_contato: string;
  des_endereco: string;
  nr_endereco: string;
  des_bairro: string;
  des_cidade: string;
  nr_cep: string;
  nr_telefone: string;
  cod_cnpj: string;
  cod_insc_estadual: string;
  des_email: string;
  dthr_criacao: Date;
  dthr_atualizacao: Date;
  distribuidora?: IDistribuidoraDTO;
  cod_distribuidora?: number;
  entregador?: IEntregadorDTO;
  cod_entregador?: number;
};
