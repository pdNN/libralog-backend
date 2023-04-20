import { IUsuarioDTO, ICreateUsuarioDTO } from '../dtos/IUsuarioDTO';

interface IUsuariosRepository {
  create(data: ICreateUsuarioDTO): Promise<IUsuarioDTO>;
  findByEmail(email_usuario: string): Promise<IUsuarioDTO | null>;
}

export default IUsuariosRepository;
