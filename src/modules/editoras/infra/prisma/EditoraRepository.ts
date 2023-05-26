import { omit } from "lodash";

import { prisma } from "@shared/infra/prisma";

import {
  ICreateEditoraDTO,
  IEditoraDTO,
  IUpdateEditoraDTO,
} from "../../dtos/IEditoraDTO";
import IEditoraRepository from "../../repositories/IEditoraRepository";

class EditoraRepository implements IEditoraRepository {
  async create(data: ICreateEditoraDTO): Promise<IEditoraDTO> {
    const editora = await prisma.editora.create({
      data: {
        ...data,
      },
    });

    return editora;
  }

  async findByCnpjOrInscEstadualOrEmail(
    cod_cnpj?: string,
    cod_insc_estadual?: string,
    des_email?: string,
  ): Promise<IEditoraDTO | null> {
    const editora = await prisma.editora.findFirst({
      where: {
        OR: [
          {
            cod_cnpj,
          },
          {
            cod_insc_estadual,
          },
          {
            des_email,
          },
        ],
      },
    });

    return editora;
  }

  async updateByCodEditora(data: IUpdateEditoraDTO): Promise<IEditoraDTO> {
    const editoraData = omit(data, ["cod_editora"]);

    const editora = await prisma.editora.update({
      where: {
        cod_editora: data.cod_editora,
      },
      data: {
        ...editoraData,
      },
    });

    return editora;
  }

  async findByNome(nome_editora: string): Promise<IEditoraDTO | null> {
    const editora = await prisma.editora.findFirst({
      where: {
        nome_editora,
      },
    });

    return editora;
  }

  async getAll(): Promise<IEditoraDTO[]> {
    const editora = await prisma.editora.findMany({
      orderBy: {
        dthr_atualizacao: "desc",
      },
    });

    return editora;
  }

  async getOneByCodEditora(cod_editora: number): Promise<IEditoraDTO | null> {
    const editora = await prisma.editora.findUnique({
      where: {
        cod_editora,
      },
    });

    return editora;
  }

  async deleteByCodEditora(cod_editora: number): Promise<IEditoraDTO> {
    const editora = await prisma.editora.delete({
      where: {
        cod_editora,
      },
    });

    return editora;
  }
}

export default EditoraRepository;
