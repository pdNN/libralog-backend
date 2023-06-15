import { Request, Response } from "express";
import { z } from "zod";

import DistribuidoraRepository from "@modules/distribuidoras/infra/prisma/DistribuidoraRepository";
import CreateDistribuidoraService from "@modules/distribuidoras/services/CreateDistribuidoraService";
import UpdateDistribuidoraService from "@modules/distribuidoras/services/UpdateDistribuidoraService";
import GetAllDistribuidoraService from "@modules/distribuidoras/services/GetAllDistribuidoraService";
import GetOneDistribuidoraService from "@modules/distribuidoras/services/GetOneDistribuidoraService";
import DeleteDistribuidoraService from "@modules/distribuidoras/services/DeleteDistribuidoraService";

class DistribuidoraController {
  public async create(req: Request, res: Response): Promise<Response> {
    const distribuidoraBody = z.object({
      nome_distribuidora: z
        .string({
          required_error: "O nome é obrigatório.",
        })
        .min(1, { message: "O nome deve ser preenchido" }),
      qtd_licencas: z.number().optional(),
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

  public async update(req: Request, res: Response): Promise<Response> {
    const { cod_distribuidora } = req.params;

    const distribuidoraBody = z.object({
      nome_distribuidora: z.string().optional(),
      qtd_licencas: z.number().optional(),
    });
    const { nome_distribuidora, qtd_licencas } = distribuidoraBody.parse(
      req.body,
    );

    const distribuidoraRepository = new DistribuidoraRepository();
    const updateDistribuidora = new UpdateDistribuidoraService(
      distribuidoraRepository,
    );

    const distribuidora = await updateDistribuidora.execute({
      cod_distribuidora: parseInt(cod_distribuidora),
      nome_distribuidora,
      qtd_licencas,
    });

    return res.status(200).json(distribuidora);
  }

  public async getall(req: Request, res: Response): Promise<Response> {
    const distribuidoraRepository = new DistribuidoraRepository();
    const getAllDistribuidora = new GetAllDistribuidoraService(
      distribuidoraRepository,
    );

    const distribuidoras = await getAllDistribuidora.execute();

    return res.status(200).json(distribuidoras);
  }

  public async getone(req: Request, res: Response): Promise<Response> {
    const { cod_distribuidora } = req.params;

    const distribuidoraRepository = new DistribuidoraRepository();
    const getOneDistribuidoras = new GetOneDistribuidoraService(
      distribuidoraRepository,
    );

    const distribuidora = await getOneDistribuidoras.execute(
      parseInt(cod_distribuidora),
    );

    return res.status(200).json(distribuidora);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { cod_distribuidora } = req.params;

    const distribuidoraRepository = new DistribuidoraRepository();
    const deleteDistribuidora = new DeleteDistribuidoraService(
      distribuidoraRepository,
    );

    const distribuidora = await deleteDistribuidora.execute(
      parseInt(cod_distribuidora),
    );

    return res.status(200).json(distribuidora);
  }
}

export default DistribuidoraController;
