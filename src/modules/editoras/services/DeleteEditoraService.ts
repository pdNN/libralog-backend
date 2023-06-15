import AppError from "@shared/errors/AppError";

import { IEditoraDTO } from "../dtos/IEditoraDTO";
import EditoraRepository from "../repositories/IEditoraRepository";

class DeleteEditoraService {
  constructor(private editoraRepository: EditoraRepository) {}

  async execute(cod_editora: number): Promise<IEditoraDTO> {
    try {
      const editora = await this.editoraRepository.deleteByCodEditora(
        cod_editora,
      );

      if (!editora) {
        throw new AppError("Erro ao deletar a editora");
      }

      return editora;
    } catch (error) {
      console.error(error);
      throw new AppError(`Erro ao deletar a editora`);
    }
  }
}

export default DeleteEditoraService;
