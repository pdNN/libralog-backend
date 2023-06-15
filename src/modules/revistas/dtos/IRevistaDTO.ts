import { IEditoraDTO } from "@modules/editoras/dtos/IEditoraDTO";

export type IUpdateRevistaDTO = {
  cod_revista: number;
  nome_revista?: string;
  nr_isbn?: string;
  cod_editora?: number;
};

export type ICreateRevistaDTO = {
  nome_revista: string;
  nr_isbn: string;
  cod_editora: number;
};

export type IRevistaDTO = {
  cod_revista: number;
  nome_revista: string;
  nr_isbn: string;
  dthr_criacao: Date;
  dthr_atualizacao: Date;
  editora?: IEditoraDTO;
  cod_editora: number;
};
