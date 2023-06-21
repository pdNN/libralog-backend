import { prisma } from "@shared/infra/prisma";
import {
  ICreateMovimentoDTO,
  IMovimentoDTO,
  IUpdateMovimentoDTO,
} from "../../dtos/IMovimentoDTO";
import IMovimentoRepository from "../../repositories/IMovimentoRepository";
import { omit } from "lodash";

class MovimentoRepository implements IMovimentoRepository {
  async create(data: ICreateMovimentoDTO): Promise<IMovimentoDTO> {
    const movimento = await prisma.movimento.create({
      data: {
        ...data,
      },
    });

    return movimento;
  }

  async updateByCodMovimento(
    data: IUpdateMovimentoDTO,
  ): Promise<IMovimentoDTO> {
    const movimentoData = omit(data, ["cod_movimento"]);

    const movimento = await prisma.movimento.update({
      where: {
        cod_movimento: data.cod_movimento,
      },
      data: {
        ...movimentoData,
      },
    });

    return movimento;
  }

  async getAll(): Promise<IMovimentoDTO[]> {
    const movimento = await prisma.movimento.findMany({
      orderBy: {
        dthr_atualizacao: "desc",
      },
    });

    return movimento;
  }

  async getOneByCodMovimento(
    cod_movimento: number,
  ): Promise<IMovimentoDTO | null> {
    const movimento = await prisma.movimento.findUnique({
      where: { cod_movimento },
    });

    return movimento;
  }

  async deleteByCodMovimento(cod_movimento: number): Promise<IMovimentoDTO> {
    const movimento = await prisma.movimento.delete({
      where: { cod_movimento },
    });

    return movimento;
  }
}

export default MovimentoRepository;
