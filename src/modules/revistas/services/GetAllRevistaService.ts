import { IRevistaDTO } from "../dtos/IRevistaDTO";
import RevistasRepository from "../repositories/IRevistasRepository";

class GetAllRevistaService {
  constructor(private revistasRepository: RevistasRepository) {}

  async execute(): Promise<IRevistaDTO[]> {
    const revistas = await this.revistasRepository.getAll();
    return revistas;
  }
}

export default GetAllRevistaService;
