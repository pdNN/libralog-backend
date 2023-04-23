import {
  IDistribuidoraDTO,
  ICreateDistribuidoraDTO,
} from "../dtos/IDistribuidoraDTO";

interface IDistribuidoraRepository {
  create(data: ICreateDistribuidoraDTO): Promise<IDistribuidoraDTO>;
}

export default IDistribuidoraRepository;
