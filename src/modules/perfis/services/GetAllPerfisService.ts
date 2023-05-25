import { IPerfilDTO } from "../dtos/IPerfisDTO";
import PerfisRepository from "../repositories/IPerfisRepository";

class GetAllPerfilService {
  constructor(private perfisRepository: PerfisRepository) {}

  async execute(): Promise<IPerfilDTO[]> {
    const perfis = await this.perfisRepository.getAll();

    return perfis;
  }
}

export default GetAllPerfilService;
