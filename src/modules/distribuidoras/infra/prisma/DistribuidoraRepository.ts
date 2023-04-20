import { prisma } from '@shared/infra/prisma';
import {
  ICreateDistribuidoraDTO,
  IDistribuidoraDTO,
} from '../../dtos/IDistribuidoraDTO';
import IDistribuidoraRepository from '../../repositories/IDistribuidoraRepository';

class DistribuidoraRepository implements IDistribuidoraRepository {
  async create(data: ICreateDistribuidoraDTO): Promise<IDistribuidoraDTO> {
    const distribuidora = await prisma.distribuidora.create({
      data: {
        ...data,
      },
    });

    return distribuidora;
  }
}

export default DistribuidoraRepository;
