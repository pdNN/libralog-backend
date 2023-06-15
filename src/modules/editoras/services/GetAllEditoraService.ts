import { IEditoraDTO } from "../dtos/IEditoraDTO";
import EditoraRepository from "../repositories/IEditoraRepository";

class GetAllEditoraService {
  constructor(private editoraRepository: EditoraRepository) {}

  async execute(): Promise<IEditoraDTO[]> {
    const editora = await this.editoraRepository.getAll();

    return editora;
  }
}

export default GetAllEditoraService;
