import { Usuario, UsuarioCreationProps } from "../../dto/usuario";
import { AlreadyExistsError } from "../../errors/AlreadyExistsError";
import UsuariosRepository from "../../repositories/UsuariosRepository";

interface UsuarioCreationRequest extends UsuarioCreationProps {}

class CreateUsuarioService {
  constructor(private usuariosRepository: UsuariosRepository) {}

  async execute(data: UsuarioCreationRequest): Promise<Usuario> {
    const { nome_usuario, email_usuario, des_senha, cod_distribuidora } = data;

    // const songAlreadyExists =
    //   await this.usuariosRepository.findByTitleAndAuthor(title, author);

    // if (songAlreadyExists) {
    //   throw new AlreadyExistsError("Song already registered");
    // }

    const usuario = await this.usuariosRepository.create({
      nome_usuario,
      email_usuario,
      des_senha,
      cod_distribuidora,
    });

    return usuario;
  }
}

export default CreateUsuarioService;
