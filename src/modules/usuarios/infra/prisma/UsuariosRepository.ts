import { prisma } from '@shared/infra/prisma';
import { ICreateUsuarioDTO, IUsuarioDTO } from '../../dtos/IUsuarioDTO';
import IUsuariosRepository from '../../repositories/IUsuariosRepository';
import { omit } from 'lodash';

class UsuariosRepository implements IUsuariosRepository {
  async create(data: ICreateUsuarioDTO): Promise<IUsuarioDTO> {
    const usuarioData = omit(data, ['cod_distribuidora']);

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

  async findByEmail(email_usuario: string): Promise<IUsuarioDTO | null> {
    const usuario = await prisma.usuario.findFirst({
      where: {
        email_usuario,
      },
    });

    return usuario;
  }
}

export default UsuariosRepository;
