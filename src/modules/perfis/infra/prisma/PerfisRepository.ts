import { prisma } from "@shared/infra/prisma";
import {
  ICreatePerfilDTO,
  IPerfilDTO,
  IUpdatePerfilDTO,
} from "../../dtos/IPerfisDTO";
import IPerfisRepository from "../../repositories/IPerfisRepository";

class PerfisRepository implements IPerfisRepository {
  async create(data: ICreatePerfilDTO): Promise<IPerfilDTO> {
    const perfil = await prisma.perfil.create({
      data,
    });

    return perfil;
  }

  async updateByCodPerfil(data: IUpdatePerfilDTO): Promise<IPerfilDTO> {
    const perfil = await prisma.perfil.update({
      where: {
        cod_perfil: data.cod_perfil,
      },
      data,
    });

    return perfil;
  }

  async findByNome(nome_perfil: string): Promise<IPerfilDTO | null> {
    const perfil = await prisma.perfil.findFirst({
      where: {
        nome_perfil,
      },
    });

    return perfil;
  }

  async getAll(): Promise<IPerfilDTO[]> {
    const perfis = await prisma.perfil.findMany({
      orderBy: {
        dthr_atualizacao: "desc",
      },
    });

    return perfis;
  }

  async getOneByCodPerfil(cod_perfil: number): Promise<IPerfilDTO | null> {
    const perfil = await prisma.perfil.findUnique({
      where: {
        cod_perfil,
      },
    });

    return perfil;
  }

  async deleteByCodPerfil(cod_perfil: number): Promise<IPerfilDTO> {
    const perfil = await prisma.perfil.delete({
      where: {
        cod_perfil,
      },
    });

    return perfil;
  }
}

export default PerfisRepository;
