import AppError from "@shared/errors/AppError";

import { IEntregadorDTO } from "../dtos/IEntregadorDTO";
import EntregadorRepository from "../repositories/IEntregadorRepository";

class DeleteEntregadorService {
  constructor(private entregadorRepository: EntregadorRepository) {}

  async execute(cod_entregador: number): Promise<IEntregadorDTO> {
    try {
      const entregador = await this.entregadorRepository.deleteByCodEntregador(
        cod_entregador,
      );

      if (!entregador) {
        throw new AppError("Erro ao deletar entregador");
      }

      return entregador;
    } catch (error) {
      console.error(error);
      throw new AppError(`Erro ao deletar entregador`);
    }
  }
}

export default DeleteEntregadorService;
