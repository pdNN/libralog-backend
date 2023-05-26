import AppError from "@shared/errors/AppError";

import { IEditoraDTO, ICreateEditoraDTO } from "../dtos/IEditoraDTO";
import EditoraRepository from "../repositories/IEditoraRepository";

interface EditoraCreationRequest extends ICreateEditoraDTO {}

class CreateEditoraService {
  constructor(private editoraRepository: EditoraRepository) {}

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
    } = data;

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
    });

    return editora;
  }
}

export default CreateEditoraService;
