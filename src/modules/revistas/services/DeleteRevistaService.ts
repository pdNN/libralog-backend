import AppError from "@shared/errors/AppError";

import { IRevistaDTO } from "../dtos/IRevistaDTO";
import RevistasRepository from "../repositories/IRevistasRepository";

class DeleteRevistaService {
  constructor(private revistasRepository: RevistasRepository) {}

  async execute(cod_revista: number): Promise<IRevistaDTO> {
    try {
      const revista = await this.revistasRepository.deleteByCodRevista(
        cod_revista,
      );

      if (!revista) {
        throw new AppError("Erro ao deletar o revista");
      }

      return revista;
    } catch (error) {
      console.error(error);
      throw new AppError(`Erro ao deletar o revista`);
    }
  }
}

export default DeleteRevistaService;
