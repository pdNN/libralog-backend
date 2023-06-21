import AppError from "@shared/errors/AppError";

import { IFiscalDTO } from "../dtos/IFiscalDTO";
import FiscalRepository from "../repositories/IFiscalRepository.1";

class GetOneFiscalService {
  constructor(private FiscalRepository: FiscalRepository) {}

  async execute(cod_documento: number): Promise<IFiscalDTO | null> {
    const fiscal = await this.FiscalRepository.getOneByCodFiscal(cod_documento);

    if (!fiscal) {
      throw new AppError("fiscal com o código fornecido não existe", 404);
    }

    return fiscal;
  }
}

export default GetOneFiscalService;
