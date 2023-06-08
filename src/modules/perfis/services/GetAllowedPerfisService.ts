import { IPerfilDTO } from "../dtos/IPerfisDTO";
import PerfisRepository from "../repositories/IPerfisRepository";

class GetAllowedPerfisService {
  constructor(private perfisRepository: PerfisRepository) {}

  async execute(cod_perfil: number): Promise<IPerfilDTO[]> {
    const perfis = await this.perfisRepository.getAllAllowed(cod_perfil);

    return perfis;
  }
}

export default GetAllowedPerfisService;
