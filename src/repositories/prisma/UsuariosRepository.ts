import { prisma } from "../../database/prisma";
import { UsuarioCreationProps, Usuario } from "../../dto/usuario";
import UsuariosRepository from "../UsuariosRepository";
import { omit } from "lodash";

class PrismaUsuariosRepository implements UsuariosRepository {
  async create(data: UsuarioCreationProps): Promise<Usuario> {
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
}

export default PrismaUsuariosRepository;
