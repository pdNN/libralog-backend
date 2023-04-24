import AppError from "@shared/errors/AppError";

import { IDistribuidoraDTO } from "../dtos/IDistribuidoraDTO";
import DistribuidoraRepository from "../repositories/IDistribuidoraRepository";

class DeleteDistribuidoraService {
  constructor(private distribuidoraRepository: DistribuidoraRepository) {}

  async execute(cod_distribuidora: number): Promise<IDistribuidoraDTO> {
    try {
      const distribuidora =
        await this.distribuidoraRepository.deleteByCodDistribuidora(
          cod_distribuidora,
        );

      if (!distribuidora) {
        throw new AppError("Erro ao deletar a distribuidora");
      }

      return distribuidora;
    } catch (error) {
      console.error(error);
      throw new AppError(`Erro ao deletar a distribuidora`);
    }
  }
}

export default DeleteDistribuidoraService;
