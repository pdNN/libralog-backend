import { hash } from "bcryptjs";

import { IUsuarioDTO, ICreateUsuarioDTO } from "../dtos/IUsuarioDTO";
import IUsuariosRepository from "../repositories/IUsuariosRepository";
import AppError from "@shared/errors/AppError";
import IDistribuidoraRepository from "@modules/distribuidoras/repositories/IDistribuidoraRepository";
import IPerfisRepository from "@modules/perfis/repositories/IPerfisRepository";

interface IUsuarioCreateRequest extends ICreateUsuarioDTO {}

class CreateUsuarioService {
  constructor(
    private usuariosRepository: IUsuariosRepository,
    private distribuidoraRepository: IDistribuidoraRepository,
    private perfilRepository: IPerfisRepository,
  ) {}

  async execute(data: IUsuarioCreateRequest): Promise<IUsuarioDTO> {
    const {
      nome_usuario,
      email_usuario,
      des_senha,
      cod_perfil,
      cod_distribuidora,
    } = data;

    const distribuidora =
      await this.distribuidoraRepository.getOneByCodDistribuidora(
        cod_distribuidora,
      );

    if (!distribuidora) {
      throw new AppError(
        `Distribuidora com o código ${cod_distribuidora} não existe`,
      );
    }

    const perfil = await this.perfilRepository.getOneByCodPerfil(cod_perfil);

    if (!perfil) {
      throw new AppError(`Perfil com o código ${cod_perfil} não existe`);
    }

    const usuarioAlreadyExists = await this.usuariosRepository.findByEmail(
      email_usuario,
    );

    if (usuarioAlreadyExists) {
      throw new AppError("E-mail já utilizado por outro usuário", 406);
    }

    const hashedPassword = await hash(des_senha, 8);

    const usuario = await this.usuariosRepository.create({
      nome_usuario,
      email_usuario,
      des_senha: hashedPassword,
      cod_perfil,
      cod_distribuidora,
    });

    delete usuario.des_senha;

    return usuario;
  }
}

export default CreateUsuarioService;
