import AppError from "@shared/errors/AppError";

import { IPerfilDTO } from "../dtos/IPerfisDTO";
import PerfisRepository from "../repositories/IPerfisRepository";

class DeletePerfilService {
  constructor(private perfisRepository: PerfisRepository) {}

  async execute(cod_perfil: number): Promise<IPerfilDTO> {
    try {
      const perfil = await this.perfisRepository.deleteByCodPerfil(cod_perfil);

      if (!perfil) {
        throw new AppError("Erro ao deletar o perfil");
      }

      return perfil;
    } catch (error) {
      console.error(error);
      throw new AppError(`Erro ao deletar o perfil`);
    }
  }
}

export default DeletePerfilService;
