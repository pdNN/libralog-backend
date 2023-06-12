import { IRevistaDTO, ICreateRevistaDTO } from "../dtos/IRevistaDTO";
import IRevistasRepository from "../repositories/IRevistasRepository";
import AppError from "@shared/errors/AppError";
import IEditoraRepository from "@modules/editoras/repositories/IEditoraRepository";

interface IRevistaCreateRequest extends ICreateRevistaDTO {}

class CreateRevistaService {
  constructor(
    private revistasRepository: IRevistasRepository,
    private editoraRepository: IEditoraRepository,
  ) {}

  async execute(data: IRevistaCreateRequest): Promise<IRevistaDTO> {
    const { nome_revista, cod_editora, nr_isbn } = data;

    const editora = await this.editoraRepository.getOneByCodEditora(
      cod_editora,
    );

    if (!editora) {
      throw new AppError(`Editora com o código ${cod_editora} não existe`);
    }

    const revista = await this.revistasRepository.create({
      nome_revista,
      nr_isbn,
      cod_editora,
    });

    return revista;
  }
}

export default CreateRevistaService;
