import { omit } from "lodash";

import { prisma } from "@shared/infra/prisma";

import {
  ICreateEntregadorDTO,
  IEntregadorDTO,
  IUpdateEntregadorDTO,
} from "../../dtos/IEntregadorDTO";
import IEntregadorRepository from "../../repositories/IEntregadorRepository";

class EntregadorRepository implements IEntregadorRepository {
  async create(data: ICreateEntregadorDTO): Promise<IEntregadorDTO> {
    const entregador = await prisma.entregador.create({
      data: {
        ...data,
      },
    });

    return entregador;
  }

  async updateByCodEntregador(
    data: IUpdateEntregadorDTO,
  ): Promise<IEntregadorDTO> {
    const entregadorData = omit(data, ["cod_entregador"]);

    const entregador = await prisma.entregador.update({
      where: {
        cod_entregador: data.cod_entregador,
      },
      data: {
        ...entregadorData,
      },
    });

    return entregador;
  }

  async findByCpforCnh(
    cod_cpf?: string,
    cod_cnh?: string,
  ): Promise<IEntregadorDTO | null> {
    const entregador = await prisma.entregador.findFirst({
      where: {
        OR: [
          {
            cod_cpf,
          },
          {
            cod_cnh,
          },
        ],
      },
    });

    return entregador;
  }

  async getAll(): Promise<IEntregadorDTO[]> {
    const entregador = await prisma.entregador.findMany({
      orderBy: {
        dthr_atualizacao: "desc",
      },
    });

    return entregador;
  }

  async getOneByCodEntregador(
    cod_entregador: number,
  ): Promise<IEntregadorDTO | null> {
    const entregador = await prisma.entregador.findUnique({
      where: { cod_entregador },
    });

    return entregador;
  }

  async deleteByCodEntregador(cod_entregador: number): Promise<IEntregadorDTO> {
    const entregador = await prisma.entregador.delete({
      where: { cod_entregador },
    });

    return entregador;
  }
}

export default EntregadorRepository;
