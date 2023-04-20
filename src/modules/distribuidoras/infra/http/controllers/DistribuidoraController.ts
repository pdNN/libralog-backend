import { Request, Response } from 'express';
import { z } from 'zod';
import DistribuidoraRepository from '../../prisma/DistribuidoraRepository';
import CreateDistribuidoraService from '../../../services/CreateDistribuidoraService';

class DistribuidoraController {
  public async create(req: Request, res: Response): Promise<Response> {
    const distribuidoraBody = z.object({
      nome_distribuidora: z
        .string({
          required_error: 'O nome é obrigatório.',
        })
        .min(1, { message: 'O nome deve ser preenchido' }),
      qtd_licencas: z.number(),
    });

    const { nome_distribuidora, qtd_licencas } = distribuidoraBody.parse(
      req.body,
    );

    const distribuidoraRepository = new DistribuidoraRepository();
    const createDistribuidora = new CreateDistribuidoraService(
      distribuidoraRepository,
    );

    const distribuidora = await createDistribuidora.execute({
      nome_distribuidora,
      qtd_licencas,
    });

    return res.status(201).json(distribuidora);
  }
}

export default DistribuidoraController;
