import AppError from "@shared/errors/AppError";

import {
  IDistribuidoraDTO,
  IUpdateDistribuidoraDTO,
} from "../dtos/IDistribuidoraDTO";
import DistribuidoraRepository from "../repositories/IDistribuidoraRepository";

interface DistribuidoraUpdateRequest extends IUpdateDistribuidoraDTO {}

class UpdateDistribuidoraService {
  constructor(private distribuidoraRepository: DistribuidoraRepository) {}

  async execute(data: DistribuidoraUpdateRequest): Promise<IDistribuidoraDTO> {
    const { cod_distribuidora, nome_distribuidora, qtd_licencas } = data;

    if (nome_distribuidora) {
      const distribuidoraAlreadyExists =
        await this.distribuidoraRepository.findByNome(nome_distribuidora);

      if (
        distribuidoraAlreadyExists &&
        distribuidoraAlreadyExists.cod_distribuidora !== data.cod_distribuidora
      ) {
        throw new AppError("Nome já utilizado por outra distribuidora", 406);
      }
    }

    const distribuidora =
      await this.distribuidoraRepository.updateByCodDistribuidora({
        cod_distribuidora,
        nome_distribuidora,
        qtd_licencas,
      });

    return distribuidora;
  }
}

export default UpdateDistribuidoraService;
