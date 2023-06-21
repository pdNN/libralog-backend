import { IMovimentoDTO, ICreateMovimentoDTO } from "../dtos/IMovimentoDTO";
import IMovimentoRepository from "../repositories/IMovimentoRepository";

interface IMovimentoCreateRequest extends ICreateMovimentoDTO {}

class CreateMovimentoService {
  constructor(private movimentoRepository: IMovimentoRepository) {}

  async execute(data: IMovimentoCreateRequest): Promise<IMovimentoDTO> {
    const { des_movimento } = data;

    const movimento = await this.movimentoRepository.create({
      des_movimento,
    });

    return movimento;
  }
}

export default CreateMovimentoService;
