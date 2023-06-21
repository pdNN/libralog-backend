import { IUsuarioDTO } from "@modules/usuarios/dtos/IUsuarioDTO";
import { IBancaDTO } from "@modules/bancas/dtos/IBancaDTO";
import { IEditoraDTO } from "@modules/editoras/dtos/IEditoraDTO";
import { IFiscalDTO } from "@modules/fiscal/dtos/IFiscalDTO";

export type IUpdateDistribuidoraDTO = {
  cod_distribuidora: number;
  nome_distribuidora?: string;
  qtd_licencas?: number;
};

export type ICreateDistribuidoraDTO = {
  nome_distribuidora: string;
  qtd_licencas?: number;
};

export type IDistribuidoraDTO = {
  cod_distribuidora: number;
  nome_distribuidora: string;
  qtd_licencas: number;
  dthr_criacao: Date;
  dthr_atualizacao: Date;
  usuarios?: IUsuarioDTO[];
  bancas?: IBancaDTO[];
  editoras?: IEditoraDTO[];
  fiscal?: IFiscalDTO[];
};
