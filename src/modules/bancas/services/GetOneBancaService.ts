import AppError from "@shared/errors/AppError";

import { IBancaDTO } from "../dtos/IBancaDTO";
import BancaRepository from "../repositories/IBancaRepository";

class GetOneBancaService {
  constructor(private bancaRepository: BancaRepository) {}

  async execute(cod_banca: number): Promise<IBancaDTO | null> {
    const banca = await this.bancaRepository.getOneByCodBanca(cod_banca);

    if (!banca) {
      throw new AppError("Banca com o código fornecido não existe", 404);
    }

    return banca;
  }
}

export default GetOneBancaService;
