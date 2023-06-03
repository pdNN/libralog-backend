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
    const editoraData = omit(data, ["cod_distribuidora"]);
    const editora = await prisma.editora.create({
      data: {
        ...editoraData,
        distribuidora: {
          connect: {
            cod_distribuidora: data.cod_distribuidora,
          },
        },
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
    const editoraData = omit(data, ["cod_editora", "cod_distribuidora"]);

    const databaseData: any = {
      ...editoraData,
    };

    if (data.cod_distribuidora) {
      databaseData.distribuidora = {
        connect: {
          cod_distribuidora: data.cod_distribuidora,
        },
      };
    }

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
      include: {
        distribuidora: true,
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
