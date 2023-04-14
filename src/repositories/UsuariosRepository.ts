import { Usuario, UsuarioCreationProps } from "../dto/usuario";

interface UsuariosRepository {
  create(data: UsuarioCreationProps): Promise<Usuario>;
}

export default UsuariosRepository;
