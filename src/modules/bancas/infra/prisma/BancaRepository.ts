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
    const bancaData = omit(data, ["cod_distribuidora", "cod_entregador"]);

    const banca = await prisma.banca.create({
      data: {
        ...bancaData,
        distribuidora: {
          connect: {
            cod_distribuidora: data.cod_distribuidora,
          },
        },
        entregador: {
          connect: {
            cod_entregador: data.cod_entregador,
          },
        },
      },
    });
    return banca;
  }

  async updateByCodBanca(data: IUpdateBancaDTO): Promise<IBancaDTO> {
    const bancaData = omit(data, [
      "cod_banca",
      "cod_distribuidora",
      "cod_entregador",
    ]);

    const databaseData: any = {
      ...bancaData,
    };

    if (data.cod_distribuidora) {
      databaseData.distribuidora = {
        connect: {
          cod_distribuidora: data.cod_distribuidora,
        },
      };
    }

    if (data.cod_entregador) {
      databaseData.entregador = {
        connect: {
          cod_entregador: data.cod_entregador,
        },
      };
    }

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

  async findByCnpjOrInscEstadualOrEmail(
    cod_cnpj?: string,
    cod_insc_estadual?: string,
    des_email?: string,
  ): Promise<IBancaDTO | null> {
    const banca = await prisma.banca.findFirst({
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
      where: {
        cod_banca,
      },
      include: {
        distribuidora: true,
      },
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
