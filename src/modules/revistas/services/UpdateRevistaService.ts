import AppError from "@shared/errors/AppError";

import { IRevistaDTO, IUpdateRevistaDTO } from "../dtos/IRevistaDTO";
import RevistasRepository from "../repositories/IRevistasRepository";
import IEditoraRepository from "@modules/editoras/repositories/IEditoraRepository";

interface RevistaUpdateRequest extends IUpdateRevistaDTO {}

class UpdateRevistaService {
  constructor(
    private revistasRepository: RevistasRepository,
    private editoraRepository: IEditoraRepository,
  ) {}

  async execute(data: RevistaUpdateRequest): Promise<IRevistaDTO> {
    const { cod_revista, nome_revista, cod_editora } = data;

    if (cod_editora) {
      const editora = await this.editoraRepository.getOneByCodEditora(
        cod_editora,
      );

      if (!editora) {
        throw new AppError(`Editora com o código ${cod_editora} não existe`);
      }
    }

    if (nome_revista) {
      const revistaAlreadyExists =
        await this.revistasRepository.findByNomeRevista(nome_revista);

      if (
        revistaAlreadyExists &&
        revistaAlreadyExists.nome_revista !== nome_revista
      ) {
        throw new AppError("Nome já utilizado por outra revista", 406);
      }
    }

    const revista = await this.revistasRepository.updateByCodRevista({
      cod_revista,
      nome_revista,
      cod_editora,
    });

    return revista;
  }
}

export default UpdateRevistaService;
