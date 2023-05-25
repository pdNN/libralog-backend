import AppError from "@shared/errors/AppError";

import { IPerfilDTO } from "../dtos/IPerfisDTO";
import PerfisRepository from "../repositories/IPerfisRepository";

class GetOnePerfilService {
  constructor(private perfisRepository: PerfisRepository) {}

  async execute(cod_perfil: number): Promise<IPerfilDTO | null> {
    const perfil = await this.perfisRepository.getOneByCodPerfil(cod_perfil);

    if (!perfil) {
      throw new AppError("Perfil com o código fornecido não existe", 404);
    }

    return perfil;
  }
}

export default GetOnePerfilService;
