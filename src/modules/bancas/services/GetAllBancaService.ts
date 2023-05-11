import { IBancaDTO } from "../dtos/IBancaDTO";
import BancaRepository from "../repositories/IBancaRepository";

class GetAllBancaService {
  constructor(private bancaRepository: BancaRepository) {}

  async execute(): Promise<IBancaDTO[]> {
    const banca = await this.bancaRepository.getAll();

    return banca;
  }
}

export default GetAllBancaService;
