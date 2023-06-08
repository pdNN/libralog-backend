import { IEditoraDTO } from "@modules/editoras/dtos/IEditoraDTO";

export type IUpdateRevistaDTO = {
  cod_revista: number;
  nome_revista?: string;
  cod_edicao_revista?: number;
  cod_editora?: number;
};

export type ICreateRevistaDTO = {
  cod_revista: number;
  nome_revista?: string;
  cod_edicao_revista?: number;
  cod_editora: number;
};

export type IRevistaDTO = {
  cod_revista: number;
  nome_revista?: string;
  cod_edicao_revista?: number;
  cod_editora?: number;
  dthr_criacao: Date;
  dthr_atualizacao: Date;
  editora?: IEditoraDTO;
};
