import {
  IUsuarioDTO,
  ICreateUsuarioDTO,
  IUpdateUsuarioDTO,
} from "../dtos/IUsuarioDTO";

interface IUsuariosRepository {
  create(data: ICreateUsuarioDTO): Promise<IUsuarioDTO>;
  updateByCodUsuario(data: IUpdateUsuarioDTO): Promise<IUsuarioDTO>;
  findByEmail(email_usuario: string): Promise<IUsuarioDTO | null>;
  getAll(): Promise<IUsuarioDTO[]>;
  getOneByCodUsuario(cod_usuario: number): Promise<IUsuarioDTO | null>;
  deleteByCodUsuario(cod_usuario: number): Promise<IUsuarioDTO>;
}

export default IUsuariosRepository;
