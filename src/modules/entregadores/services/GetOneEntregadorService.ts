import AppError from "@shared/errors/AppError";

import { IEntregadorDTO } from "../dtos/IEntregadorDTO";
import EntregadorRepository from "../repositories/IEntregadorRepository";

class GetOneEntregadorService {
  constructor(private entregadorRepository: EntregadorRepository) {}

  async execute(cod_entregador: number): Promise<IEntregadorDTO | null> {
    const entregador = await this.entregadorRepository.getOneByCodEntregador(
      cod_entregador,
    );

    if (!entregador) {
      throw new AppError("Entregador com o código fornecido não existe", 404);
    }

    return entregador;
  }
}

export default GetOneEntregadorService;
