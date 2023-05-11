import { IBancaDTO, ICreateBancaDTO, IUpdateBancaDTO } from "../dtos/IBancaDTO";

interface IBancaRepository {
  create(data: ICreateBancaDTO): Promise<IBancaDTO>;
  updateByCodBanca(data: IUpdateBancaDTO): Promise<IBancaDTO>;
  findByNome(nome_banca: string): Promise<IBancaDTO | null>;
  getAll(): Promise<IBancaDTO[]>;
  getOneByCodBanca(cod_banca: number): Promise<IBancaDTO | null>;
  deleteByCodBanca(cod_banca: number): Promise<IBancaDTO>;
}

export default IBancaRepository;
