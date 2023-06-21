import { IFiscalDTO } from "../dtos/IFiscalDTO";
import FiscalRepository from "../repositories/IFiscalRepository.1";

class GetAllFiscalService {
  constructor(private fiscalRepository: FiscalRepository) {}

  async execute(): Promise<IFiscalDTO[]> {
    const fiscal = await this.fiscalRepository.getAll();

    return fiscal;
  }
}

export default GetAllFiscalService;
