import { IDistribuidoraDTO } from "@modules/distribuidoras/dtos/IDistribuidoraDTO";
import { IEditoraDTO } from "@modules/editoras/dtos/IEditoraDTO";
import { IEntregadorDTO } from "@modules/entregadores/dtos/IEntregadorDTO";
import { IRevistaDTO } from "@modules/revistas/dtos/IRevistaDTO";
import { IMovimentoDTO } from "@modules/movimento/dtos/IMovimentoDTO";
import { IBancaDTO } from "@modules/bancas/dtos/IBancaDTO";

export type IUpdateFiscalDTO = {
  cod_documento: number;
  cod_n_nfe?: number;
  n_quantidade?: number;
  vlr_unitario?: number;
  vlr_total?: number;
  dthr_documento?: Date;
  cod_editora?: number;
  cod_revista?: number;
  cod_movimento?: number;
  cod_entregador?: number;
  cod_banca?: number;
  cod_distribuidora?: number;
};

export type ICreateFiscalDTO = {
  cod_n_nfe: number;
  n_quantidade: number;
  vlr_unitario: number;
  vlr_total: number;
  dthr_documento: Date;
  cod_editora: number;
  cod_revista: number;
  cod_movimento: number;
  cod_entregador: number;
  cod_banca: number;
  cod_distribuidora: number;
};

export type IFiscalDTO = {
  cod_documento: number;
  cod_n_nfe: number;
  n_quantidade?: number;
  vlr_unitario: number;
  vlr_total: number;
  dthr_documento: Date;
  dthr_criacao: Date;
  dthr_atualizacao: Date;
  editora?: IEditoraDTO;
  cod_editora: number;
  revista?: IRevistaDTO;
  cod_revista: number;
  movimento?: IMovimentoDTO;
  cod_movimento: number;
  entregador?: IEntregadorDTO;
  cod_entregador: number;
  banca?: IBancaDTO;
  cod_banca: number;
  distribuidora?: IDistribuidoraDTO;
  cod_distribuidora: number;
};
