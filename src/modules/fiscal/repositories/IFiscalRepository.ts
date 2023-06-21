import {
  IFiscalDTO,
  ICreateFiscalDTO,
  IUpdateFiscalDTO,
} from "../dtos/IFiscalDTO";

interface IFiscalRepository {
  create(data: ICreateFiscalDTO): Promise<IFiscalDTO>;
  updateByCodFiscal(data: IUpdateFiscalDTO): Promise<IFiscalDTO>;
  getAll(): Promise<IFiscalDTO[]>;
  getOneByCodFiscal(cod_documento: number): Promise<IFiscalDTO | null>;
  deleteByCodFiscal(cod_documento: number): Promise<IFiscalDTO>;
}

export default IFiscalRepository;
