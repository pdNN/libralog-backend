import { Request, Response } from "express";
import { z } from "zod";

import BancaRepository from "@modules/bancas/infra/prisma/BancaRepository";
import DistribuidoraRepository from "@modules/distribuidoras/infra/prisma/DistribuidoraRepository";
import EntregadorRepository from "@modules/entregadores/infra/prisma/EntregadorRepository";
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
        .min(1, { message: "O nome deve ser preenchido." }),
      des_razao_social: z
        .string({
          required_error: "A razão social é obrigatória.",
        })
        .min(1, { message: "A razão social deve ser preenchida." }),
      des_contato: z
        .string({
          required_error: "O contato é obrigatório.",
        })
        .min(1, { message: "O contato deve ser preenchido." }),
      des_endereco: z
        .string({
          required_error: "O endereço é obrigatório.",
        })
        .min(1, { message: "O endereço deve ser preenchido." }),
      nr_endereco: z
        .string({
          required_error: "O número do endereço é obrigatório.",
        })
        .min(1, { message: "O número do endereço deve ser preenchido." }),
      des_bairro: z
        .string({
          required_error: "O bairro é obrigatório.",
        })
        .min(1, { message: "O bairro deve ser preenchido." }),
      des_cidade: z
        .string({
          required_error: "A cidade é obrigatória.",
        })
        .min(1, { message: "A cidade deve ser preenchida." }),
      nr_cep: z
        .string({
          required_error: "O cep é obrigatório.",
        })
        // .regex(/^\d{5}-\d{3}$/i, { message: "O cep deve ser válido." })//
        .min(1, { message: "O cep deve ser preenchido." }),
      nr_telefone: z
        .string({
          required_error: "O telefone é obrigatório.",
        })
        // .regex(/^\d{2}\s\d{4,5}-\d{4}$/i, {
        //  message: "O telefone deve ser válido.",
        // })
        .min(1, { message: "O telefone deve ser preenchido." }),
      cod_cnpj: z
        .string({
          required_error: "O cnpj é obrigatório.",
        })
        // .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/i, {
        //  message: "O cnpj deve ser válido.",
        // })
        .min(1, { message: "O cnpj deve ser preenchido." }),
      cod_insc_estadual: z
        .string({
          required_error: "A inscrição estadual é obrigatória.",
        })
        .min(1, { message: "A inscrição estadual deve ser preenchida." }),
      des_email: z
        .string({
          required_error: "O email é obrigatório.",
        })
        .min(1, { message: "O email deve ser preenchido." })
        .email("O email deve ser válido."),
      cod_distribuidora: z.number({
        required_error: "Distribuidora é obrigatória",
      }),
      cod_entregador: z.number({
        required_error: "Distribuidora é obrigatória",
      }),
    });

    const {
      nome_banca,
      des_razao_social,
      des_contato,
      des_endereco,
      nr_endereco,
      des_bairro,
      des_cidade,
      nr_cep,
      nr_telefone,
      cod_cnpj,
      cod_insc_estadual,
      des_email,
      cod_distribuidora,
      cod_entregador,
    } = bancaBody.parse(req.body);

    const bancaRepository = new BancaRepository();
    const distribuidoraRepository = new DistribuidoraRepository();
    const entregadorRepository = new EntregadorRepository();
    const createBanca = new CreateBancaService(
      bancaRepository,
      distribuidoraRepository,
      entregadorRepository,
    );

    const banca = await createBanca.execute({
      nome_banca,
      des_razao_social,
      des_contato,
      des_endereco,
      nr_endereco,
      des_bairro,
      des_cidade,
      nr_cep: nr_cep.replace(/\.|-/gm, "").replace("/", ""),
      nr_telefone: nr_telefone
        .replace(/\.|-/gm, "")
        .replace("/", "")
        .replace(" ", ""),
      cod_cnpj: cod_cnpj.replace(/\.|-/gm, "").replace("/", ""),
      cod_insc_estadual: cod_insc_estadual
        .replace(/\.|-/gm, "")
        .replace("/", ""),
      des_email,
      cod_distribuidora,
      cod_entregador,
    });

    return res.status(201).json(banca);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { cod_banca } = req.params;

    const bancaBody = z.object({
      nome_banca: z.string().optional(),
      des_razao_social: z.string().optional(),
      des_contato: z.string().optional(),
      des_endereco: z.string().optional(),
      nr_endereco: z.string().optional(),
      des_bairro: z.string().optional(),
      des_cidade: z.string().optional(),
      nr_cep: z
        .string()
        // .regex(/^\d{5}-\d{3}$/i, { message: "O cep deve ser válido." })
        .optional(),
      nr_telefone: z
        .string()
        // .regex(/^\d{2}\s\d{4,5}-\d{4}$/i, {
        //  message: "O telefone deve ser válido.",
        // })
        .optional(),
      cod_cnpj: z
        .string()
        // .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/i, {
        //  message: "O cnpj deve ser válido.",
        // })
        .optional(),
      cod_insc_estadual: z.string().optional(),
      des_email: z.string().email("O email deve ser válido.").optional(),
      cod_distribuidora: z.number().optional(),
      cod_entregador: z.number().optional(),
    });

    const {
      nome_banca,
      des_razao_social,
      des_contato,
      des_endereco,
      nr_endereco,
      des_bairro,
      des_cidade,
      nr_cep,
      nr_telefone,
      cod_cnpj,
      cod_insc_estadual,
      des_email,
      cod_distribuidora,
      cod_entregador,
    } = bancaBody.parse(req.body);

    const bancaRepository = new BancaRepository();
    const distribuidoraRepository = new DistribuidoraRepository();
    const entregadorRepository = new EntregadorRepository();
    const updatebanca = new UpdateBancaService(
      bancaRepository,
      distribuidoraRepository,
      entregadorRepository,
    );

    const banca = await updatebanca.execute({
      cod_banca: parseInt(cod_banca),
      nome_banca,
      des_razao_social,
      des_contato,
      des_endereco,
      nr_endereco,
      des_bairro,
      des_cidade,
      nr_cep: nr_cep.replace(/\.|-/gm, "").replace("/", ""),
      nr_telefone: nr_telefone
        .replace(/\.|-/gm, "")
        .replace("/", "")
        .replace(" ", ""),
      cod_cnpj: cod_cnpj.replace(/\.|-/gm, "").replace("/", ""),
      cod_insc_estadual: cod_insc_estadual
        .replace(/\.|-/gm, "")
        .replace("/", ""),
      des_email,
      cod_distribuidora,
      cod_entregador,
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
