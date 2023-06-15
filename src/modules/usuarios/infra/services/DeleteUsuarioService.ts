import AppError from "@shared/errors/AppError";

import { IUsuarioDTO } from "../../dtos/IUsuarioDTO";
import UsuariosRepository from "../../repositories/IUsuariosRepository";

class DeleteUsuarioService {
  constructor(private usuariosRepository: UsuariosRepository) {}

  async execute(cod_usuario: number): Promise<IUsuarioDTO> {
    try {
      const usuario = await this.usuariosRepository.deleteByCodUsuario(
        cod_usuario,
      );

      if (!usuario) {
        throw new AppError("Erro ao deletar o usuário");
      }

      delete usuario.des_senha;

      return usuario;
    } catch (error) {
      console.error(error);
      throw new AppError(`Erro ao deletar o usuário`);
    }
  }
}

export default DeleteUsuarioService;
