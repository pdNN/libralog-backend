import AppError from "@shared/errors/AppError";

import { IUsuarioDTO, IUpdateUsuarioDTO } from "../dtos/IUsuarioDTO";
import UsuariosRepository from "../repositories/IUsuariosRepository";
import IDistribuidoraRepository from "@modules/distribuidoras/repositories/IDistribuidoraRepository";
import IPerfisRepository from "@modules/perfis/repositories/IPerfisRepository";

interface UsuarioUpdateRequest extends IUpdateUsuarioDTO {}

class UpdateUsuarioService {
  constructor(
    private usuariosRepository: UsuariosRepository,
    private distribuidoraRepository: IDistribuidoraRepository,
    private perfilRepository: IPerfisRepository,
  ) {}

  async execute(data: UsuarioUpdateRequest): Promise<IUsuarioDTO> {
    const {
      cod_usuario,
      nome_usuario,
      email_usuario,
      cod_perfil,
      cod_distribuidora,
    } = data;

    if (cod_distribuidora) {
      const distribuidora =
        await this.distribuidoraRepository.getOneByCodDistribuidora(
          cod_distribuidora,
        );

      if (!distribuidora) {
        throw new AppError(
          `Distribuidora com o código ${cod_distribuidora} não existe`,
        );
      }
    }

    if (email_usuario) {
      const usuarioAlreadyExists = await this.usuariosRepository.findByEmail(
        email_usuario,
      );

      if (
        usuarioAlreadyExists &&
        usuarioAlreadyExists.cod_usuario !== cod_usuario
      ) {
        throw new AppError("E-mail já utilizado por outro usuário", 406);
      }
    }

    if (cod_perfil !== undefined) {
      const perfil = await this.perfilRepository.getOneByCodPerfil(cod_perfil);

      if (!perfil) {
        throw new AppError(`Perfil com o código ${cod_perfil} não existe`);
      }
    }

    const usuario = await this.usuariosRepository.updateByCodUsuario({
      cod_usuario,
      nome_usuario,
      email_usuario,
      cod_perfil,
      cod_distribuidora,
    });

    delete usuario.des_senha;

    return usuario;
  }
}

export default UpdateUsuarioService;
