import { omit } from "lodash";

import { prisma } from "@shared/infra/prisma";

import {
  ICreateDistribuidoraDTO,
  IDistribuidoraDTO,
  IUpdateDistribuidoraDTO,
} from "../../dtos/IDistribuidoraDTO";
import IDistribuidoraRepository from "../../repositories/IDistribuidoraRepository";

class DistribuidoraRepository implements IDistribuidoraRepository {
  async create(data: ICreateDistribuidoraDTO): Promise<IDistribuidoraDTO> {
    const distribuidora = await prisma.distribuidora.create({
      data: {
        ...data,
      },
    });

    return distribuidora;
  }

  async updateByCodDistribuidora(
    data: IUpdateDistribuidoraDTO,
  ): Promise<IDistribuidoraDTO> {
    const distribuidoraData = omit(data, ["cod_distribuidora"]);

    const distribuidora = await prisma.distribuidora.update({
      where: {
        cod_distribuidora: data.cod_distribuidora,
      },
      data: {
        ...distribuidoraData,
      },
    });

    return distribuidora;
  }

  async findByNome(
    nome_distribuidora: string,
  ): Promise<IDistribuidoraDTO | null> {
    const distribuidora = await prisma.distribuidora.findFirst({
      where: {
        nome_distribuidora,
      },
    });

    return distribuidora;
  }

  async getAll(): Promise<IDistribuidoraDTO[]> {
    const distribuidoras = await prisma.distribuidora.findMany({
      orderBy: {
        dthr_atualizacao: "desc",
      },
    });

    return distribuidoras;
  }

  async getOneByCodDistribuidora(
    cod_distribuidora: number,
  ): Promise<IDistribuidoraDTO | null> {
    const distribuidora = await prisma.distribuidora.findUnique({
      where: {
        cod_distribuidora,
      },
    });

    return distribuidora;
  }

  async deleteByCodDistribuidora(
    cod_distribuidora: number,
  ): Promise<IDistribuidoraDTO> {
    const distribuidora = await prisma.distribuidora.delete({
      where: {
        cod_distribuidora,
      },
    });

    return distribuidora;
  }
}

export default DistribuidoraRepository;
