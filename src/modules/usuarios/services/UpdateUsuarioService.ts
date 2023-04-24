import AppError from "@shared/errors/AppError";

import { IUsuarioDTO, IUpdateUsuarioDTO } from "../dtos/IUsuarioDTO";
import UsuariosRepository from "../repositories/IUsuariosRepository";
import IDistribuidoraRepository from "@modules/distribuidoras/repositories/IDistribuidoraRepository";

interface UsuarioUpdateRequest extends IUpdateUsuarioDTO {}

class UpdateUsuarioService {
  constructor(
    private usuariosRepository: UsuariosRepository,
    private distribuidoraRepository: IDistribuidoraRepository,
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

    let des_perfil;
    if (cod_perfil !== undefined) {
      switch (cod_perfil) {
        case 0:
          des_perfil = "Inicial";
          break;
        case 1:
          des_perfil = "Admin";
          break;
        default:
          break;
      }
    }

    const usuario = await this.usuariosRepository.updateByCodUsuario({
      cod_usuario,
      nome_usuario,
      email_usuario,
      cod_perfil,
      des_perfil,
      cod_distribuidora,
    });

    delete usuario.des_senha;

    return usuario;
  }
}

export default UpdateUsuarioService;
