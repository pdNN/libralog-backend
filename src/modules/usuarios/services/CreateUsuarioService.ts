import { hash } from 'bcryptjs';

import { IUsuarioDTO, ICreateUsuarioDTO } from '../dtos/IUsuarioDTO';
import IUsuariosRepository from '../repositories/IUsuariosRepository';
import AppError from '@shared/errors/AppError';

interface IUsuarioCreateRequest extends ICreateUsuarioDTO {}

class CreateUsuarioService {
  constructor(private usuariosRepository: IUsuariosRepository) {}

  async execute(data: IUsuarioCreateRequest): Promise<IUsuarioDTO> {
    const {
      nome_usuario,
      email_usuario,
      des_senha,
      cod_perfil,
      cod_distribuidora,
    } = data;

    const usuarioAlreadyExists = await this.usuariosRepository.findByEmail(
      email_usuario,
    );

    if (usuarioAlreadyExists) {
      throw new AppError('E-mail já utilizado por outro usuário', 404);
    }

    let des_perfil = 'Inicial';
    switch (cod_perfil) {
      case 0:
        break;
      case 1:
        des_perfil = 'Admin';
        break;
      default:
        break;
    }

    const hashedPassword = await hash(des_senha, 8);

    const usuario = await this.usuariosRepository.create({
      nome_usuario,
      email_usuario,
      des_senha: hashedPassword,
      cod_perfil,
      des_perfil,
      cod_distribuidora,
    });

    delete usuario.des_senha;

    return usuario;
  }
}

export default CreateUsuarioService;
