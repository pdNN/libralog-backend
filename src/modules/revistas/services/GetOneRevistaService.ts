import AppError from "@shared/errors/AppError";

import { IRevistaDTO } from "../dtos/IRevistaDTO";
import RevistasRepository from "../repositories/IRevistasRepository";

class GetOneRevistaService {
  constructor(private revistasRepository: RevistasRepository) {}

  async execute(cod_revista: number): Promise<IRevistaDTO | null> {
    const revista = await this.revistasRepository.getOneByCodRevista(
      cod_revista,
    );

    if (!revista) {
      throw new AppError("Usuário com o código fornecido não existe", 404);
    }
    return revista;
  }
}

export default GetOneRevistaService;
