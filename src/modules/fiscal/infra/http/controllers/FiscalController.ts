import { Request, Response } from "express";
import { z } from "zod";

import FiscalRepository from "@modules/fiscal/infra/prisma/FiscalRepository";
import DistribuidoraRepository from "@modules/distribuidoras/infra/prisma/DistribuidoraRepository";
import EntregadorRepository from "@modules/entregadores/infra/prisma/EntregadorRepository";
import CreateFiscalService from "@modules/fiscal/services/CreateFiscalService";
import UpdateFiscalService from "@modules/fiscal/services/UpdateFiscalService";
import GetAllFiscalService from "@modules/fiscal/services/GetAllFiscalService";
import GetOneFiscalService from "@modules/fiscal/services/GetOneFiscalService";
import DeleteFiscalService from "@modules/fiscal/services/DeleteFiscalService";
import EditoraRepository from "@modules/editoras/infra/prisma/EditoraRepository";
import RevistaRepository from "@modules/revistas/infra/prisma/RevistasRepository";
import MovimentoRepository from "@modules/movimento/infra/prisma/MovimentoRepository";
import BancaRepository from "@modules/bancas/infra/prisma/BancaRepository";

class FiscalController {
  public async create(req: Request, res: Response): Promise<Response> {
    const fiscalBody = z.object({
      cod_n_nfe: z
        .number({
          required_error: "NF obrigatório.",
        })
        .min(1, { message: "NF deve ser preenchido." }),
      n_quantidade: z
        .number({
          required_error: "Quantidade é obrigatória.",
        })
        .min(1, { message: "Quantidade deve ser preenchida." }),
      vlr_unitario: z
        .number({
          required_error: "Valor unitário é obrigatório.",
        })
        .min(1, { message: "Valor unitário deve ser preenchido." }),
      vlr_total: z
        .number({
          required_error: "Valor total é obrigatório.",
        })
        .min(1, { message: "Valor total deve ser preenchido." }),
      dthr_documento: z.date({
        required_error: "Data documento é obrigatório.",
      }),
      cod_editora: z.number({
        required_error: "editora é obrigatória",
      }),
      cod_revista: z.number({
        required_error: "revista é obrigatória",
      }),
      cod_movimento: z.number({
        required_error: "movimento é obrigatório",
      }),
      cod_entregador: z.number({
        required_error: "Entregador é obrigatório",
      }),
      cod_banca: z.number({
        required_error: "banca é obrigatória",
      }),
      cod_distribuidora: z.number({
        required_error: "Distribuidora é obrigatória",
      }),
    });

    const {
      cod_n_nfe,
      n_quantidade,
      vlr_unitario,
      vlr_total,
      dthr_documento,
      cod_editora,
      cod_revista,
      cod_movimento,
      cod_entregador,
      cod_banca,
      cod_distribuidora,
    } = fiscalBody.parse(req.body);

    const fiscalRepository = new FiscalRepository();
    const editoraRepository = new EditoraRepository();
    const revistaRepository = new RevistaRepository();
    const movimentoRepository = new MovimentoRepository();
    const entregadorRepository = new EntregadorRepository();
    const bancaRepository = new BancaRepository();
    const distribuidoraRepository = new DistribuidoraRepository();

    const createFiscal = new CreateFiscalService(
      fiscalRepository,
      editoraRepository,
      revistaRepository,
      movimentoRepository,
      entregadorRepository,
      bancaRepository,
      distribuidoraRepository,
    );

    const banca = await createFiscal.execute({
      cod_n_nfe,
      n_quantidade,
      vlr_unitario,
      vlr_total,
      dthr_documento,
      cod_editora,
      cod_revista,
      cod_movimento,
      cod_entregador,
      cod_banca,
      cod_distribuidora,
    });

    return res.status(201).json(banca);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { cod_documento } = req.params;

    const fiscalBody = z.object({
      cod_n_nfe: z.number().optional(),
      n_quantidade: z.number().optional(),
      vlr_unitario: z.number().optional(),
      vlr_total: z.number().optional(),
      dthr_documento: z.date().optional(),
      cod_editora: z.number().optional(),
      cod_revista: z.number().optional(),
      cod_movimento: z.number().optional(),
      cod_entregador: z.number().optional(),
      cod_banca: z.number().optional(),
      cod_distribuidora: z.number().optional(),
    });

    const {
      cod_n_nfe,
      n_quantidade,
      vlr_unitario,
      vlr_total,
      dthr_documento,
      cod_editora,
      cod_revista,
      cod_movimento,
      cod_entregador,
      cod_banca,
      cod_distribuidora,
    } = fiscalBody.parse(req.body);

    const fiscalRepository = new FiscalRepository();
    const editoraRepository = new EditoraRepository();
    const revistaRepository = new RevistaRepository();
    const movimentoRepository = new MovimentoRepository();
    const entregadorRepository = new EntregadorRepository();
    const bancaRepository = new BancaRepository();
    const distribuidoraRepository = new DistribuidoraRepository();
    const updatefiscal = new UpdateFiscalService(
      fiscalRepository,
      editoraRepository,
      revistaRepository,
      movimentoRepository,
      entregadorRepository,
      bancaRepository,
      distribuidoraRepository,
    );

    const fiscal = await updatefiscal.execute({
      cod_documento: parseInt(cod_documento),
      cod_n_nfe,
      n_quantidade,
      vlr_unitario,
      vlr_total,
      dthr_documento,
      cod_editora,
      cod_revista,
      cod_movimento,
      cod_entregador,
      cod_banca,
      cod_distribuidora,
    });

    return res.status(200).json(fiscal);
  }

  public async getall(req: Request, res: Response): Promise<Response> {
    const fiscalRepository = new FiscalRepository();
    const getAllfiscal = new GetAllFiscalService(fiscalRepository);

    const fiscal = await getAllfiscal.execute();

    return res.status(200).json(fiscal);
  }

  public async getone(req: Request, res: Response): Promise<Response> {
    const { cod_documento } = req.params;

    const fiscalRepository = new FiscalRepository();
    const getOnefiscal = new GetOneFiscalService(fiscalRepository);

    const fiscal = await getOnefiscal.execute(parseInt(cod_documento));

    return res.status(200).json(fiscal);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { cod_documento } = req.params;

    const fiscalRepository = new FiscalRepository();
    const deletefiscal = new DeleteFiscalService(fiscalRepository);

    const fiscal = await deletefiscal.execute(parseInt(cod_documento));

    return res.status(200).json(fiscal);
  }
}

export default FiscalController;
