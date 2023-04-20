import { IUsuarioDTO, ICreateUsuarioDTO } from '../dtos/IUsuarioDTO';
import AppError from '@shared/errors/AppError';
import UsuariosRepository from '../repositories/IUsuariosRepository';

interface IUsuarioCreateRequest extends ICreateUsuarioDTO {}

class CreateUsuarioService {
  constructor(private usuariosRepository: UsuariosRepository) {}

  async execute(data: IUsuarioCreateRequest): Promise<IUsuarioDTO> {
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
