import AppError from "@shared/errors/AppError";

import { IDistribuidoraDTO } from "../dtos/IDistribuidoraDTO";
import DistribuidoraRepository from "../repositories/IDistribuidoraRepository";

class GetOneDistribuidoraService {
  constructor(private distribuidoraRepository: DistribuidoraRepository) {}

  async execute(cod_distribuidora: number): Promise<IDistribuidoraDTO | null> {
    const distribuidora =
      await this.distribuidoraRepository.getOneByCodDistribuidora(
        cod_distribuidora,
      );

    if (!distribuidora) {
      throw new AppError(
        "Distribuidora com o código fornecido não existe",
        404,
      );
    }

    return distribuidora;
  }
}

export default GetOneDistribuidoraService;
