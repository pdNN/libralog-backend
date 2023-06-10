import { prisma } from "@shared/infra/prisma";
import {
  ICreateRevistaDTO,
  IRevistaDTO,
  IUpdateRevistaDTO,
} from "../../dtos/IRevistaDTO";
import IRevistasRepository from "../../repositories/IRevistasRepository";
import { omit } from "lodash";

class RevistaRepository implements IRevistasRepository {
  async create(data: ICreateRevistaDTO): Promise<IRevistaDTO> {
    const revistaData = omit(data, ["cod_editora"]);

    const revista = await prisma.revista.create({
      data: {
        ...revistaData,
        editora: {
          connect: {
            cod_editora: data.cod_editora,
          },
        },
      },
    });

    return revista;
  }

  async findByNomeRevista(nome_revista: string): Promise<IRevistaDTO | null> {
    const revista = await prisma.revista.findFirst({
      where: {
        nome_revista,
      },
    });

    return revista;
  }

  async updateByCodRevista(data: IUpdateRevistaDTO): Promise<IRevistaDTO> {
    const revistaData = omit(data, ["cod_revista", "cod_editora"]);

    const databaseData: any = {
      ...revistaData,
    };

    if (data.cod_editora) {
      databaseData.editora = {
        connect: {
          cod_editora: data.cod_editora,
        },
      };
    }

    const revista = await prisma.revista.update({
      where: {
        cod_revista: data.cod_revista,
      },
      data: databaseData,
    });

    return revista;
  }

  async getAll(): Promise<IRevistaDTO[]> {
    const revista = await prisma.revista.findMany({
      orderBy: {
        dthr_atualizacao: "desc",
      },
    });

    return revista;
  }

  async getOneByCodRevista(cod_revista: number): Promise<IRevistaDTO | null> {
    const revista = await prisma.revista.findUnique({
      where: {
        cod_revista,
      },
      include: {
        editora: true,
      },
    });

    return revista;
  }

  async deleteByCodRevista(cod_revista: number): Promise<IRevistaDTO> {
    const revista = await prisma.revista.delete({
      where: {
        cod_revista,
      },
    });

    return revista;
  }
}

export default RevistaRepository;
