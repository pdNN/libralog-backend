import {
  IEditoraDTO,
  ICreateEditoraDTO,
  IUpdateEditoraDTO,
} from "../dtos/IEditoraDTO";

interface IEditoraRepository {
  create(data: ICreateEditoraDTO): Promise<IEditoraDTO>;
  updateByCodEditora(data: IUpdateEditoraDTO): Promise<IEditoraDTO>;
  findByCnpjOrInscEstadualOrEmail(
    cod_cnpj?: string,
    cod_insc_estadual?: string,
    des_email?: string,
  ): Promise<IEditoraDTO | null>;
  getAll(): Promise<IEditoraDTO[]>;
  getOneByCodEditora(cod_editora: number): Promise<IEditoraDTO | null>;
  deleteByCodEditora(cod_editora: number): Promise<IEditoraDTO>;
}

export default IEditoraRepository;
