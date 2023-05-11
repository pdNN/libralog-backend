import { Request, Response } from "express";
import { z } from "zod";

import BancaRepository from "@modules/bancas/infra/prisma/BancaRepository";
import CreateBancaService from "@modules/bancas/services/CreateBancaService";
import UpdateBancaService from "@modules/bancas/services/UpdateBancaService";
import GetAllBancaService from "@modules/bancas/services/GetAllBancaService";
import GetOneBancaService from "@modules/bancas/services/GetOneBancaService";
import DeleteBancaService from "@modules/bancas/services/DeleteBancaService";

class BancaController {
  public async create(req: Request, res: Response): Promise<Response> {
    const bancaBody = z.object({
      nome_banca: z
        .string({
          required_error: "O nome é obrigatório.",
        })
        .min(1, { message: "O nome deve ser preenchido" }),
    });

    const { nome_banca } = bancaBody.parse(req.body);
    const { razao_social } = req.body;
    const { tipo } = req.body;
    const { contato } = req.body;
    const { endereco } = req.body;
    const { numero } = req.body;
    const { bairro } = req.body;
    const { cidade } = req.body;
    const { cep } = req.body;
    const { telefone } = req.body;
    const { cnpj } = req.body;
    const { insc_estadual } = req.body;
    const { email } = req.body;

    const bancaRepository = new BancaRepository();
    const createBanca = new CreateBancaService(bancaRepository);

    const banca = await createBanca.execute({
      nome_banca,
      razao_social,
      tipo,
      contato,
      endereco,
      numero,
      bairro,
      cidade,
      cep,
      telefone,
      cnpj,
      insc_estadual,
      email,
    });

    return res.status(201).json(banca);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { cod_banca } = req.params;
    const {
      nome_banca,
      razao_social,
      tipo,
      contato,
      endereco,
      numero,
      bairro,
      cidade,
      cep,
      telefone,
      cnpj,
      insc_estadual,
      email,
    } = req.body;

    const bancaRepository = new BancaRepository();
    const updatebanca = new UpdateBancaService(bancaRepository);

    const banca = await updatebanca.execute({
      cod_banca: parseInt(cod_banca),
      nome_banca,
      razao_social,
      tipo,
      contato,
      endereco,
      numero,
      bairro,
      cidade,
      cep,
      telefone,
      cnpj,
      insc_estadual,
      email,
    });

    return res.status(200).json(banca);
  }

  public async getall(req: Request, res: Response): Promise<Response> {
    const bancaRepository = new BancaRepository();
    const getAllbanca = new GetAllBancaService(bancaRepository);

    const bancas = await getAllbanca.execute();

    return res.status(200).json(bancas);
  }

  public async getone(req: Request, res: Response): Promise<Response> {
    const { cod_banca } = req.params;

    const bancaRepository = new BancaRepository();
    const getOnebancas = new GetOneBancaService(bancaRepository);

    const banca = await getOnebancas.execute(parseInt(cod_banca));

    return res.status(200).json(banca);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { cod_banca } = req.params;

    const bancaRepository = new BancaRepository();
    const deletebanca = new DeleteBancaService(bancaRepository);

    const banca = await deletebanca.execute(parseInt(cod_banca));

    return res.status(200).json(banca);
  }
}

export default BancaController;
