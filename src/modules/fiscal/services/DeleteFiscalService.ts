import AppError from "@shared/errors/AppError";

import { IFiscalDTO } from "../dtos/IFiscalDTO";
import FiscalRepository from "../repositories/IFiscalRepository.1";

class DeleteFiscalService {
  constructor(private fiscalRepository: FiscalRepository) {}

  async execute(cod_documento: number): Promise<IFiscalDTO> {
    try {
      const fiscal = await this.fiscalRepository.deleteByCodFiscal(
        cod_documento,
      );

      if (!fiscal) {
        throw new AppError("Erro ao deletar documento");
      }

      return fiscal;
    } catch (error) {
      console.error(error);
      throw new AppError(`Erro ao deletar a documento`);
    }
  }
}

export default DeleteFiscalService;
