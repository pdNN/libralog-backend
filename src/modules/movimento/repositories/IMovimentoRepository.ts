import {
  IMovimentoDTO,
  ICreateMovimentoDTO,
  IUpdateMovimentoDTO,
} from "../dtos/IMovimentoDTO";

interface IMovimentoRepository {
  create(data: ICreateMovimentoDTO): Promise<IMovimentoDTO>;
  updateByCodMovimento(data: IUpdateMovimentoDTO): Promise<IMovimentoDTO>;
  getAll(): Promise<IMovimentoDTO[]>;
  getOneByCodMovimento(cod_Movimento: number): Promise<IMovimentoDTO | null>;
  deleteByCodMovimento(cod_Movimento: number): Promise<IMovimentoDTO>;
}

export default IMovimentoRepository;
