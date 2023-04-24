import { IDistribuidoraDTO } from "../dtos/IDistribuidoraDTO";
import DistribuidoraRepository from "../repositories/IDistribuidoraRepository";

class GetAllDistribuidoraService {
  constructor(private distribuidoraRepository: DistribuidoraRepository) {}

  async execute(): Promise<IDistribuidoraDTO[]> {
    const distribuidoras = await this.distribuidoraRepository.getAll();

    return distribuidoras;
  }
}

export default GetAllDistribuidoraService;
