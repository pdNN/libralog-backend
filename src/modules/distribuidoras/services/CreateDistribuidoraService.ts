import AppError from "@shared/errors/AppError";

import {
  IDistribuidoraDTO,
  ICreateDistribuidoraDTO,
} from "../dtos/IDistribuidoraDTO";
import DistribuidoraRepository from "../repositories/IDistribuidoraRepository";

interface DistribuidoraCreationRequest extends ICreateDistribuidoraDTO {}

class CreateDistribuidoraService {
  constructor(private distribuidoraRepository: DistribuidoraRepository) {}

  async execute(
    data: DistribuidoraCreationRequest,
  ): Promise<IDistribuidoraDTO> {
    const { nome_distribuidora, qtd_licencas } = data;

    const distribuidoraAlreadyExists =
      await this.distribuidoraRepository.findByNome(nome_distribuidora);

    if (distribuidoraAlreadyExists) {
      throw new AppError("Nome já utilizado por outra distribuidora", 406);
    }

    const distribuidora = await this.distribuidoraRepository.create({
      nome_distribuidora,
      qtd_licencas,
    });

    return distribuidora;
  }
}

export default CreateDistribuidoraService;
