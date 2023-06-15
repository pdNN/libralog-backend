import AppError from "@shared/errors/AppError";

import { IEditoraDTO, ICreateEditoraDTO } from "../dtos/IEditoraDTO";
import EditoraRepository from "../repositories/IEditoraRepository";
import IDistribuidoraRepository from "@modules/distribuidoras/repositories/IDistribuidoraRepository";

interface EditoraCreationRequest extends ICreateEditoraDTO {}

class CreateEditoraService {
  constructor(
    private editoraRepository: EditoraRepository,
    private distribuidoraRepository: IDistribuidoraRepository,
  ) {}

  async execute(data: EditoraCreationRequest): Promise<IEditoraDTO> {
    const {
      nome_editora,
      des_razao_social,
      des_contato,
      des_endereco,
      nr_endereco,
      des_bairro,
      des_cidade,
      nr_cep,
      nr_telefone,
      cod_cnpj,
      cod_insc_estadual,
      des_email,
      cod_distribuidora,
    } = data;

    const distribuidora =
      await this.distribuidoraRepository.getOneByCodDistribuidora(
        cod_distribuidora,
      );

    if (!distribuidora) {
      throw new AppError(
        `Distribuidora com o código ${cod_distribuidora} não existe`,
      );
    }

    const editoraAlreadyExists =
      await this.editoraRepository.findByCnpjOrInscEstadualOrEmail(
        cod_cnpj,
        cod_insc_estadual,
        des_email,
      );

    if (editoraAlreadyExists) {
      throw new AppError("CNPJ/E-mail/Inscrição estadual já cadastrados", 406);
    }

    const editora = await this.editoraRepository.create({
      nome_editora,
      des_razao_social,
      des_contato,
      des_endereco,
      nr_endereco,
      des_bairro,
      des_cidade,
      nr_cep,
      nr_telefone,
      cod_cnpj,
      cod_insc_estadual,
      des_email,
      cod_distribuidora,
    });

    return editora;
  }
}

export default CreateEditoraService;
