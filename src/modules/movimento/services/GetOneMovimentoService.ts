import AppError from "@shared/errors/AppError";

import { IMovimentoDTO } from "../dtos/IMovimentoDTO";
import MovimentoRepository from "../repositories/IMovimentoRepository";

class GetOnePerfilService {
  constructor(private movimentoRepository: MovimentoRepository) {}

  async execute(cod_movimento: number): Promise<IMovimentoDTO | null> {
    const movimento = await this.movimentoRepository.getOneByCodMovimento(
      cod_movimento,
    );

    if (!movimento) {
      throw new AppError("Movimento com o código fornecido não existe", 404);
    }

    return movimento;
  }
}

export default GetOnePerfilService;
