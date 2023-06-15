import {
  IRevistaDTO,
  ICreateRevistaDTO,
  IUpdateRevistaDTO,
} from "../dtos/IRevistaDTO";

interface IRevistasRepository {
  create(data: ICreateRevistaDTO): Promise<IRevistaDTO>;
  updateByCodRevista(data: IUpdateRevistaDTO): Promise<IRevistaDTO>;
  findByNomeRevista(nome_revista: string): Promise<IRevistaDTO | null>;
  getAll(): Promise<IRevistaDTO[]>;
  getOneByCodRevista(cod_revista: number): Promise<IRevistaDTO | null>;
  deleteByCodRevista(cod_revista: number): Promise<IRevistaDTO>;
}

export default IRevistasRepository;
