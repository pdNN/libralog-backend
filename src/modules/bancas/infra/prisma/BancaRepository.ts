import { omit } from "lodash";

import { prisma } from "@shared/infra/prisma";

import {
  ICreateBancaDTO,
  IBancaDTO,
  IUpdateBancaDTO,
} from "../../dtos/IBancaDTO";
import IBancaRepository from "../../repositories/IBancaRepository";

class BancaRepository implements IBancaRepository {
  async create(data: ICreateBancaDTO): Promise<IBancaDTO> {
    const banca = await prisma.banca.create({
      data: {
        ...data,
      },
    });

    return banca;
  }

  async updateByCodBanca(data: IUpdateBancaDTO): Promise<IBancaDTO> {
    const bancaData = omit(data, ["cod_banca"]);

    const banca = await prisma.banca.update({
      where: {
        cod_banca: data.cod_banca,
      },
      data: {
        ...bancaData,
      },
    });

    return banca;
  }

  async findByNome(nome_banca: string): Promise<IBancaDTO | null> {
    const banca = await prisma.banca.findFirst({
      where: {
        nome_banca,
      },
    });

    return banca;
  }

  async getAll(): Promise<IBancaDTO[]> {
    const banca = await prisma.banca.findMany({
      orderBy: {
        dthr_atualizacao: "desc",
      },
    });

    return banca;
  }

  async getOneByCodBanca(cod_banca: number): Promise<IBancaDTO | null> {
    const banca = await prisma.banca.findUnique({
      where: { cod_banca },
    });

    return banca;
  }

  async deleteByCodBanca(cod_banca: number): Promise<IBancaDTO> {
    const banca = await prisma.banca.delete({
      where: {
        cod_banca,
      },
    });

    return banca;
  }
}

export default BancaRepository;
