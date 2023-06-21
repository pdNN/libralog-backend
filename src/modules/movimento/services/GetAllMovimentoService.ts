import { IMovimentoDTO } from "../dtos/IMovimentoDTO";
import MovimentoRepository from "../repositories/IMovimentoRepository";

class GetAllMovimentoService {
  constructor(private movimentoRepository: MovimentoRepository) {}

  async execute(): Promise<IMovimentoDTO[]> {
    const movimento = await this.movimentoRepository.getAll();

    return movimento;
  }
}

export default GetAllMovimentoService;
