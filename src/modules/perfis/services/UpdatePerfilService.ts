import AppError from "@shared/errors/AppError";

import { IPerfilDTO, IUpdatePerfilDTO } from "../dtos/IPerfisDTO";
import PerfisRepository from "../repositories/IPerfisRepository";
import { validate_registred_permission } from "@shared/utils/PermissionModuleList";

interface PerfilUpdateRequest extends IUpdatePerfilDTO {}

class UpdatePerfilService {
  constructor(private perfisRepository: PerfisRepository) {}

  async execute(data: PerfilUpdateRequest): Promise<IPerfilDTO> {
    const { cod_perfil, nome_perfil, permissoes } = data;

    if (nome_perfil) {
      const perfilAlreadyExists = await this.perfisRepository.findByNome(
        nome_perfil,
      );

      if (
        perfilAlreadyExists &&
        perfilAlreadyExists.cod_perfil !== cod_perfil
      ) {
        throw new AppError("Nome já utilizado por outro perfil", 406);
      }
    }

    validate_registred_permission(permissoes);

    const perfil = await this.perfisRepository.updateByCodPerfil({
      cod_perfil,
      nome_perfil,
      permissoes,
    });

    return perfil;
  }
}

export default UpdatePerfilService;
