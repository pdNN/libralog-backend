import AppError from "@shared/errors/AppError";

import { IBancaDTO } from "../dtos/IBancaDTO";
import BancaRepository from "../repositories/IBancaRepository";

class DeleteBancaService {
  constructor(private bancaRepository: BancaRepository) {}

  async execute(cod_banca: number): Promise<IBancaDTO> {
    try {
      const banca = await this.bancaRepository.deleteByCodBanca(cod_banca);

      if (!banca) {
        throw new AppError("Erro ao deletar a banca");
      }

      return banca;
    } catch (error) {
      console.error(error);
      throw new AppError(`Erro ao deletar a banca`);
    }
  }
}

export default DeleteBancaService;
