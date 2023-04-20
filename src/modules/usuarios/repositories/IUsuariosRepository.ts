import { IUsuarioDTO, ICreateUsuarioDTO } from '../dtos/IUsuarioDTO';

interface IUsuariosRepository {
  create(data: ICreateUsuarioDTO): Promise<IUsuarioDTO>;
}

export default IUsuariosRepository;
