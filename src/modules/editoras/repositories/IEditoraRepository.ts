import {
  IEditoraDTO,
  ICreateEditoraDTO,
  IUpdateEditoraDTO,
} from "../dtos/IEditoraDTO";

interface IEditoraRepository {
  create(data: ICreateEditoraDTO): Promise<IEditoraDTO>;
  updateByCodEditora(data: IUpdateEditoraDTO): Promise<IEditoraDTO>;
  findByNome(nome_editora: string): Promise<IEditoraDTO | null>;
  getAll(): Promise<IEditoraDTO[]>;
  getOneByCodEditora(cod_editora: number): Promise<IEditoraDTO | null>;
  deleteByCodEditora(cod_editora: number): Promise<IEditoraDTO>;
  findByCnpjOrInscEstadualOrEmail(
    cod_cnpj?: String,
    cod_insc_estadual?: String,
    des_email?: String,
  ): Promise<IEditoraDTO | null>;
}

export default IEditoraRepository;
