import AppError from "@shared/errors/AppError";

import { IEditoraDTO } from "../dtos/IEditoraDTO";
import EditoraRepository from "../repositories/IEditoraRepository";

class GetOneEditoraService {
  constructor(private editoraRepository: EditoraRepository) {}

  async execute(cod_editora: number): Promise<IEditoraDTO | null> {
    const editora = await this.editoraRepository.getOneByCodEditora(
      cod_editora,
    );

    if (!editora) {
      throw new AppError("Editora com o código fornecido não existe", 404);
    }
    return editora;
  }
}

export default GetOneEditoraService;
