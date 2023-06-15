import AppError from "@shared/errors/AppError";

import { IEditoraDTO, IUpdateEditoraDTO } from "../dtos/IEditoraDTO";
import EditoraRepository from "../repositories/IEditoraRepository";
import IDistribuidoraRepository from "@modules/distribuidoras/repositories/IDistribuidoraRepository";

interface EditoraUpdateRequest extends IUpdateEditoraDTO {}

class UpdateEditoraService {
  constructor(
    private editoraRepository: EditoraRepository,
    private distribuidoraRepository: IDistribuidoraRepository,
  ) {}

  async execute(data: EditoraUpdateRequest): Promise<IEditoraDTO> {
    const {
      cod_editora,
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

    if (cod_distribuidora) {
      const distribuidora =
        await this.distribuidoraRepository.getOneByCodDistribuidora(
          cod_distribuidora,
        );

      if (!distribuidora) {
        throw new AppError(
          `Distribuidora com o código ${cod_distribuidora} não existe`,
        );
      }
    }

    if (cod_cnpj || cod_insc_estadual) {
      const editoraAlreadyExists =
        await this.editoraRepository.findByCnpjOrInscEstadualOrEmail(
          cod_cnpj,
          cod_insc_estadual,
          des_email,
        );

      if (
        editoraAlreadyExists &&
        editoraAlreadyExists.cod_editora !== data.cod_editora
      ) {
        throw new AppError(
          "CNPJ ou Inscrição Estadual ou E-mail já utilizado por outra editora",
          406,
        );
      }
    }

    const editora = await this.editoraRepository.updateByCodEditora({
      cod_editora,
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

export default UpdateEditoraService;
