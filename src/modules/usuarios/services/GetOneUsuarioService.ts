import AppError from "@shared/errors/AppError";

import { IUsuarioDTO } from "../dtos/IUsuarioDTO";
import UsuariosRepository from "../repositories/IUsuariosRepository";

class GetOneUsuarioService {
  constructor(private usuariosRepository: UsuariosRepository) {}

  async execute(cod_usuario: number): Promise<IUsuarioDTO | null> {
    const usuario = await this.usuariosRepository.getOneByCodUsuario(
      cod_usuario,
    );

    if (!usuario) {
      throw new AppError("Usuário com o código fornecido não existe", 404);
    }

    return usuario;
  }
}

export default GetOneUsuarioService;
