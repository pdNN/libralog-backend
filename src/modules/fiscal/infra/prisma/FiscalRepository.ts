import { omit } from "lodash";

import { prisma } from "@shared/infra/prisma";

import {
  ICreateFiscalDTO,
  IFiscalDTO,
  IUpdateFiscalDTO,
} from "../../dtos/IFiscalDTO";
import IFiscalRepository from "@modules/fiscal/repositories/IFiscalRepository";

class FiscalRepository implements IFiscalRepository {
  async create(data: ICreateFiscalDTO): Promise<IFiscalDTO> {
    const fiscalData = omit(data, [
      "cod_editora",
      "cod_revista",
      "cod_movimento",
      "cod_entregador",
      "cod_banca",
      "cod_distribuidora",
    ]);

    const fiscal = await prisma.fiscal.create({
      data: {
        ...fiscalData,
        editora: {
          connect: {
            cod_editora: data.cod_editora,
          },
        },
        revista: {
          connect: {
            cod_revista: data.cod_revista,
          },
        },
        movimento: {
          connect: {
            cod_movimento: data.cod_movimento,
          },
        },
        entregador: {
          connect: {
            cod_entregador: data.cod_entregador,
          },
        },
        banca: {
          connect: {
            cod_banca: data.cod_banca,
          },
        },
        distribuidora: {
          connect: {
            cod_distribuidora: data.cod_distribuidora,
          },
        },
      },
    });
    return fiscal;
  }

  async updateByCodFiscal(data: IUpdateFiscalDTO): Promise<IFiscalDTO> {
    const fiscalData = omit(data, [
      "cod_documento",
      "cod_editora",
      "cod_revista",
      "cod_movimento",
      "cod_entregador",
      "cod_banca",
      "cod_distribuidora",
    ]);

    const databaseData: any = {
      ...fiscalData,
    };

    if (data.cod_editora) {
      databaseData.editora = {
        connect: {
          cod_editora: data.cod_editora,
        },
      };
    }

    if (data.cod_revista) {
      databaseData.revista = {
        connect: {
          cod_revista: data.cod_revista,
        },
      };
    }
    if (data.cod_movimento) {
      databaseData.movimento = {
        connect: {
          cod_movimento: data.cod_movimento,
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

    if (data.cod_banca) {
      databaseData.banca = {
        connect: {
          cod_banca: data.cod_banca,
        },
      };
    }
    if (data.cod_distribuidora) {
      databaseData.distribuidora = {
        connect: {
          cod_distribuidora: data.cod_distribuidora,
        },
      };
    }

    const fiscal = await prisma.fiscal.update({
      where: {
        cod_documento: data.cod_documento,
      },
      data: {
        ...fiscalData,
      },
    });

    return fiscal;
  }

  async getAll(): Promise<IFiscalDTO[]> {
    const fiscal = await prisma.fiscal.findMany({
      orderBy: {
        dthr_atualizacao: "desc",
      },
      include: {
        editora: true,
        revista: true,
        movimento: true,
        entregador: true,
        banca: true,
        distribuidora: true,
      },
    });

    return fiscal;
  }

  async getOneByCodFiscal(cod_documento: number): Promise<IFiscalDTO | null> {
    const fiscal = await prisma.fiscal.findUnique({
      where: {
        cod_documento,
      },
      include: {
        editora: true,
        revista: true,
        movimento: true,
        entregador: true,
        banca: true,
        distribuidora: true,
      },
    });

    return fiscal;
  }

  async deleteByCodFiscal(cod_documento: number): Promise<IFiscalDTO> {
    const fiscal = await prisma.fiscal.delete({
      where: {
        cod_documento,
      },
    });

    return fiscal;
  }
}

export default FiscalRepository;
