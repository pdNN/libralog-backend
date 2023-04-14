import {
  Distribuidora,
  DistribuidoraCreationProps,
} from "../../dto/distribuidora";
import { AlreadyExistsError } from "../../errors/AlreadyExistsError";
import DistribuidoraRepository from "../../repositories/DistribuidoraRepository";

interface DistribuidoraCreationRequest extends DistribuidoraCreationProps {}

class CreateDistribuidoraService {
  constructor(private distribuidoraRepository: DistribuidoraRepository) {}

  async execute(data: DistribuidoraCreationRequest): Promise<Distribuidora> {
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
