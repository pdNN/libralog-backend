import { IFiscalDTO } from "@modules/fiscal/dtos/IFiscalDTO";

export type IUpdateMovimentoDTO = {
  cod_movimento: number;
  des_movimento?: string;
};

export type ICreateMovimentoDTO = {
  des_movimento: string;
};

export type IMovimentoDTO = {
  cod_movimento: number;
  des_movimento: string;
  dthr_criacao: Date;
  dthr_atualizacao: Date;
  fiscal?: IFiscalDTO[];
};
