import { prisma } from "@shared/infra/prisma";
import {
  ICreateUsuarioDTO,
  IUsuarioDTO,
  IUpdateUsuarioDTO,
} from "../../dtos/IUsuarioDTO";
import IUsuariosRepository from "../../repositories/IUsuariosRepository";
import { omit } from "lodash";

class UsuariosRepository implements IUsuariosRepository {
  async create(data: ICreateUsuarioDTO): Promise<IUsuarioDTO> {
    const usuarioData = omit(data, ["cod_distribuidora", "cod_perfil"]);

    const usuario = await prisma.usuario.create({
      data: {
        ...usuarioData,
        distribuidora: {
          connect: {
            cod_distribuidora: data.cod_distribuidora,
          },
        },
        perfil: {
          connect: {
            cod_perfil: data.cod_perfil,
          },
        },
      },
    });

    return usuario;
  }

  async updateByCodUsuario(data: IUpdateUsuarioDTO): Promise<IUsuarioDTO> {
    const usuarioData = omit(data, [
      "cod_usuario",
      "cod_distribuidora",
      "cod_perfil",
    ]);

    const databaseData: any = {
      ...usuarioData,
    };

    if (data.cod_distribuidora) {
      databaseData.distribuidora = {
        connect: {
          cod_distribuidora: data.cod_distribuidora,
        },
      };
    }

    if (data.cod_perfil) {
      databaseData.perfil = {
        connect: {
          cod_perfil: data.cod_perfil,
        },
      };
    }

    const usuario = await prisma.usuario.update({
      where: {
        cod_usuario: data.cod_usuario,
      },
      data: databaseData,
    });

    return usuario;
  }

  async findByEmail(email_usuario: string): Promise<IUsuarioDTO | null> {
    const usuario = await prisma.usuario.findFirst({
      where: {
        email_usuario,
      },
      include: {
        perfil: true,
        distribuidora: true,
      },
    });

    return usuario;
  }

  async getAll(): Promise<IUsuarioDTO[]> {
    const usuarios = await prisma.usuario.findMany({
      orderBy: {
        dthr_atualizacao: "desc",
      },
      include: {
        distribuidora: true,
        perfil: true,
      },
    });

    return usuarios;
  }

  async getOneByCodUsuario(cod_usuario: number): Promise<IUsuarioDTO | null> {
    const usuario = await prisma.usuario.findUnique({
      where: {
        cod_usuario,
      },
      include: {
        distribuidora: true,
        perfil: true,
      },
    });

    return usuario;
  }

  async deleteByCodUsuario(cod_usuario: number): Promise<IUsuarioDTO> {
    const usuario = await prisma.usuario.delete({
      where: {
        cod_usuario,
      },
    });

    return usuario;
  }
}

export default UsuariosRepository;
