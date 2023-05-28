import {
  IEntregadorDTO,
  ICreateEntregadorDTO,
  IUpdateEntregadorDTO,
} from "../dtos/IEntregadorDTO";

interface IEntregadorRepository {
  create(data: ICreateEntregadorDTO): Promise<IEntregadorDTO>;
  updateByCodEntregador(data: IUpdateEntregadorDTO): Promise<IEntregadorDTO>;
  findByCpforCnh(
    cod_cpf?: string,
    cod_cnh?: string,
  ): Promise<IEntregadorDTO | null>;
  getAll(): Promise<IEntregadorDTO[]>;
  getOneByCodEntregador(cod_entregador: number): Promise<IEntregadorDTO | null>;
  deleteByCodEntregador(cod_entregador: number): Promise<IEntregadorDTO>;
}

export default IEntregadorRepository;
