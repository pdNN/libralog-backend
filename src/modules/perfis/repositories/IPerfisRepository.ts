import {
  IPerfilDTO,
  ICreatePerfilDTO,
  IUpdatePerfilDTO,
} from "../dtos/IPerfisDTO";

interface IPerfisRepository {
  create(data: ICreatePerfilDTO): Promise<IPerfilDTO>;
  updateByCodPerfil(data: IUpdatePerfilDTO): Promise<IPerfilDTO>;
  findByNome(nome_perfil: string): Promise<IPerfilDTO | null>;
  getAll(): Promise<IPerfilDTO[]>;
  getAllAllowed(cod_perfil?: number): Promise<IPerfilDTO[]>;
  getOneByCodPerfil(cod_perfil: number): Promise<IPerfilDTO | null>;
  deleteByCodPerfil(cod_perfil: number): Promise<IPerfilDTO>;
}

export default IPerfisRepository;
