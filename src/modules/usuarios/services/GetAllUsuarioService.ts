import { IUsuarioDTO } from "../dtos/IUsuarioDTO";
import UsuariosRepository from "../repositories/IUsuariosRepository";

class GetAllUsuarioService {
  constructor(private usuariosRepository: UsuariosRepository) {}

  async execute(): Promise<IUsuarioDTO[]> {
    const usuarios = await this.usuariosRepository.getAll();

    return usuarios;
  }
}

export default GetAllUsuarioService;
