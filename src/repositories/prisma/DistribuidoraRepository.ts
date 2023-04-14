import { prisma } from "../../database/prisma";
import {
  DistribuidoraCreationProps,
  Distribuidora,
} from "../../dto/distribuidora";
import DistribuidoraRepository from "../DistribuidoraRepository";

class PrismaDistribuidoraRepository implements DistribuidoraRepository {
  async create(data: DistribuidoraCreationProps): Promise<Distribuidora> {
    const distribuidora = await prisma.distribuidora.create({
      data: {
        ...data,
      },
    });

    return distribuidora;
  }
}

export default PrismaDistribuidoraRepository;
