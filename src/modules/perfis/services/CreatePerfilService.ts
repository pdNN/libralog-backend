import { IPerfilDTO, ICreatePerfilDTO } from "../dtos/IPerfisDTO";
import IPerfisRepository from "../repositories/IPerfisRepository";
import AppError from "@shared/errors/AppError";

interface IPerfilCreateRequest extends ICreatePerfilDTO {}

class CreatePerfilService {
  constructor(private perfisRepository: IPerfisRepository) {}

  async execute(data: IPerfilCreateRequest): Promise<IPerfilDTO> {
    const { nome_perfil, permissoes } = data;

    const perfilAlreadyExists = await this.perfisRepository.findByNome(
      nome_perfil,
    );

    if (perfilAlreadyExists) {
      throw new AppError("Nome já utilizado por outro perfil", 406);
    }

    const perfil = await this.perfisRepository.create({
      nome_perfil,
      permissoes,
    });

    return perfil;
  }
}

export default CreatePerfilService;
