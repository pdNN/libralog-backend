import { Request, Response } from "express";
import { z } from "zod";

import MovimentoRepository from "../../prisma/MovimentoRepository";
import CreateMovimentoService from "../../../services/CreateMovimentoService";
import UpdateMovimentoService from "@modules/movimento/services/UpdateMovimentoService";
import DeleteMovimentoService from "@modules/movimento/services/DeleteMovimentoService";
import GetAllMovimentoService from "@modules/movimento/services/GetAllMovimentoService";
import GetOneMovimentoService from "@modules/movimento/services/GetOneMovimentoService";

class MovimentoController {
  public async create(req: Request, res: Response): Promise<Response> {
    const movimentoBody = z.object({
      des_movimento: z
        .string({
          required_error: "Descrição obrigatória.",
        })
        .min(1, { message: "Descrição deve ser preenchido" }),
    });

    const { des_movimento } = movimentoBody.parse(req.body);

    const movimentoRepository = new MovimentoRepository();
    const createMovimento = new CreateMovimentoService(movimentoRepository);

    const movimento = await createMovimento.execute({
      des_movimento,
    });

    return res.status(201).json(movimento);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { cod_movimento } = req.params;
    const movimentoBody = z.object({
      des_movimento: z.string().optional(),
    });

    const { des_movimento } = movimentoBody.parse(req.body);

    const movimentoRepository = new MovimentoRepository();
    const updateMovimento = new UpdateMovimentoService(movimentoRepository);

    const movimento = await updateMovimento.execute({
      cod_movimento: parseInt(cod_movimento),
      des_movimento,
    });

    return res.status(200).json(movimento);
  }

  public async getall(req: Request, res: Response): Promise<Response> {
    const movimentoRepository = new MovimentoRepository();
    const getAllMovimento = new GetAllMovimentoService(movimentoRepository);

    const movimento = await getAllMovimento.execute();

    return res.status(200).json(movimento);
  }

  public async getone(req: Request, res: Response): Promise<Response> {
    const { cod_movimento } = req.params;

    const movimentoRepository = new MovimentoRepository();
    const getOneMovimento = new GetOneMovimentoService(movimentoRepository);

    const movimento = await getOneMovimento.execute(parseInt(cod_movimento));

    return res.status(200).json(movimento);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { cod_movimento } = req.params;

    const movimentoRepository = new MovimentoRepository();
    const deleteMovimento = new DeleteMovimentoService(movimentoRepository);

    const movimento = await deleteMovimento.execute(parseInt(cod_movimento));

    return res.status(200).json(movimento);
  }
}

export default MovimentoController;
