import AppError from "@shared/errors/AppError";

import { IMovimentoDTO } from "../dtos/IMovimentoDTO";
import MovimentoRepository from "../repositories/IMovimentoRepository";

class DeleteMovimentoService {
  constructor(private movimentoRepository: MovimentoRepository) {}

  async execute(cod_movimento: number): Promise<IMovimentoDTO> {
    try {
      const movimento = await this.movimentoRepository.deleteByCodMovimento(
        cod_movimento,
      );

      if (!movimento) {
        throw new AppError("Erro ao deletar o movimento");
      }

      return movimento;
    } catch (error) {
      console.error(error);
      throw new AppError(`Erro ao deletar o movimento`);
    }
  }
}

export default DeleteMovimentoService;
