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
    const usuarioData = omit(data, ["cod_distribuidora"]);

    const usuario = await prisma.usuario.create({
      data: {
        ...usuarioData,
        distribuidora: {
          connect: {
            cod_distribuidora: data.cod_distribuidora,
          },
        },
      },
    });

    return usuario;
  }

  async updateByCodUsuario(data: IUpdateUsuarioDTO): Promise<IUsuarioDTO> {
    const usuarioData = omit(data, ["cod_usuario", "cod_distribuidora"]);

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
    });

    return usuario;
  }

  async getAll(): Promise<IUsuarioDTO[]> {
    const usuarios = await prisma.usuario.findMany({
      orderBy: {
        dthr_atualizacao: "desc",
      },
    });

    return usuarios;
  }

  async getOneByCodUsuario(cod_usuario: number): Promise<IUsuarioDTO | null> {
    const usuario = await prisma.usuario.findUnique({
      where: {
        cod_usuario,
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
