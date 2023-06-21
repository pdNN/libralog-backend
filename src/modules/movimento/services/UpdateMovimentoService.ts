import { IMovimentoDTO, IUpdateMovimentoDTO } from "../dtos/IMovimentoDTO";
import MovimentoRepository from "../repositories/IMovimentoRepository";

interface MovimentoUpdateRequest extends IUpdateMovimentoDTO {}

class UpdateMovimentoService {
  constructor(private movimentoRepository: MovimentoRepository) {}

  async execute(data: MovimentoUpdateRequest): Promise<IMovimentoDTO> {
    const { cod_movimento, des_movimento } = data;

    const movimento = await this.movimentoRepository.updateByCodMovimento({
      cod_movimento,
      des_movimento,
    });

    return movimento;
  }
}

export default UpdateMovimentoService;
