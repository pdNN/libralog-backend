import {
  IDistribuidoraDTO,
  ICreateDistribuidoraDTO,
} from '../dtos/IDistribuidoraDTO';
import AppError from '@shared/errors/AppError';
import DistribuidoraRepository from '../repositories/IDistribuidoraRepository';

interface DistribuidoraCreationRequest extends ICreateDistribuidoraDTO {}

class CreateDistribuidoraService {
  constructor(private distribuidoraRepository: DistribuidoraRepository) {}

  async execute(
    data: DistribuidoraCreationRequest,
  ): Promise<IDistribuidoraDTO> {
    const { nome_distribuidora, qtd_licencas } = data;

    // const songAlreadyExists =
    //   await this.usuariosRepository.findByTitleAndAuthor(title, author);

    // if (songAlreadyExists) {
    //   throw new AlreadyExistsError("Song already registered");
    // }

    const distribuidora = await this.distribuidoraRepository.create({
      nome_distribuidora,
      qtd_licencas,
    });

    return distribuidora;
  }
}

export default CreateDistribuidoraService;
