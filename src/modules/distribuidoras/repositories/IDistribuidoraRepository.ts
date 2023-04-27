import {
  IDistribuidoraDTO,
  ICreateDistribuidoraDTO,
  IUpdateDistribuidoraDTO,
} from "../dtos/IDistribuidoraDTO";

interface IDistribuidoraRepository {
  create(data: ICreateDistribuidoraDTO): Promise<IDistribuidoraDTO>;
  updateByCodDistribuidora(
    data: IUpdateDistribuidoraDTO,
  ): Promise<IDistribuidoraDTO>;
  findByNome(nome_distribuidora: string): Promise<IDistribuidoraDTO | null>;
  getAll(): Promise<IDistribuidoraDTO[]>;
  getOneByCodDistribuidora(
    cod_distribuidora: number,
  ): Promise<IDistribuidoraDTO | null>;
  deleteByCodDistribuidora(
    cod_distribuidora: number,
  ): Promise<IDistribuidoraDTO>;
}

export default IDistribuidoraRepository;
