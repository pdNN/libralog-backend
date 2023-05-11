import { IUsuarioDTO } from "@modules/usuarios/dtos/IUsuarioDTO";

export type IUpdateBancaDTO = {
  cod_banca: number;
  nome_banca?: string;
  razao_social?: string;
  tipo?: string;
  contato?: string;
  endereco?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  cep?: string;
  telefone?: string;
  cnpj?: string;
  insc_estadual?: string;
  email?: string;
};

export type ICreateBancaDTO = {
  nome_banca?: string;
  razao_social?: string;
  tipo?: string;
  contato?: string;
  endereco?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  cep?: string;
  telefone?: string;
  cnpj?: string;
  insc_estadual?: string;
  email?: string;
};

export type IBancaDTO = {
  cod_banca: number;
  nome_banca?: string;
  razao_social?: string;
  tipo?: string;
  contato?: string;
  endereco?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  cep?: string;
  telefone?: string;
  cnpj?: string;
  insc_estadual?: string;
  email?: string;
  dthr_criacao: Date;
  dthr_atualizacao: Date;
  usuarios?: IUsuarioDTO[];
};
