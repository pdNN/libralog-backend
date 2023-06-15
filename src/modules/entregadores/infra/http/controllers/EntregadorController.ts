import { Request, Response } from "express";
import { z } from "zod";

import EntregadorRepository from "@modules/entregadores/infra/prisma/EntregadorRepository";
import CreateEntregadorService from "@modules/entregadores/services/CreateEntregadorService";
import UpdateEntregadorService from "@modules/entregadores/services/UpdateEntregadorService";
import GetAllEntregadorService from "@modules/entregadores/services/GetAllEntregadorService";
import GetOneEntregadorService from "@modules/entregadores/services/GetOneEntregadorService";
import DeleteEntregadorService from "@modules/entregadores/services/DeleteEntregadorService";

class EntregadorController {
  public async create(req: Request, res: Response): Promise<Response> {
    const entregadorBody = z.object({
      nome_entregador: z
        .string({
          required_error: "O nome é obrigatório.",
        })
        .min(1, { message: "O nome deve ser preenchido." }),
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
        // .regex(/^\d{5}-\d{3}$/i, { message: "O cep deve ser válido." })
        .min(1, { message: "O cep deve ser preenchido." }),
      nr_telefone: z
        .string({
          required_error: "O telefone é obrigatório.",
        })
        // .regex(/^\d{2}\s\d{4,5}-\d{4}$/i, {
        //  message: "O telefone deve ser válido.",
        // })
        .min(1, { message: "O telefone deve ser preenchido." }),
      cod_cpf: z
        .string({
          required_error: "O CPF é obrigatório.",
        })
        // .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/i, {
        //  message: "O CPF deve ser válido.",
        // })
        .min(1, { message: "O CPF deve ser preenchido." }),
      cod_cnh: z
        .string({
          required_error: "A CNH é obrigatória.",
        })
        .min(1, { message: "A CNH deve ser preenchida." }),
      des_email: z
        .string({
          required_error: "O email é obrigatório.",
        })
        .min(1, { message: "O email deve ser preenchido." })
        .email("O email deve ser válido."),
    });

    const {
      nome_entregador,
      des_endereco,
      nr_endereco,
      des_bairro,
      des_cidade,
      nr_cep,
      nr_telefone,
      cod_cpf,
      cod_cnh,
      des_email,
    } = entregadorBody.parse(req.body);

    const entregadorRepository = new EntregadorRepository();
    const createEntregador = new CreateEntregadorService(entregadorRepository);

    const entregador = await createEntregador.execute({
      nome_entregador,
      des_endereco,
      nr_endereco,
      des_bairro,
      des_cidade,
      nr_cep: nr_cep.replace(/\.|-/gm, ""),
      nr_telefone: nr_telefone
        .replace(/\.|-/gm, "")
        .replace("/", "")
        .replace(" ", ""),
      cod_cpf: cod_cpf.replace(/\.|-/gm, ""),
      cod_cnh: cod_cnh.replace(/\.|-/gm, ""),
      des_email,
    });

    return res.status(201).json(entregador);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { cod_entregador } = req.params;

    const entregadorBody = z.object({
      nome_entregador: z.string().optional(),
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
        //   message: "O telefone deve ser válido.",
        // })
        .optional(),
      cod_cpf: z
        .string()
        // .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/i, {
        //  message: "O cpf deve ser válido.",
        // })
        .optional(),
      cod_cnh: z.string().optional(),
      des_email: z.string().email("O email deve ser válido.").optional(),
    });

    const {
      nome_entregador,
      des_endereco,
      nr_endereco,
      des_bairro,
      des_cidade,
      nr_cep,
      nr_telefone,
      cod_cpf,
      cod_cnh,
      des_email,
    } = entregadorBody.parse(req.body);

    const entregadorRepository = new EntregadorRepository();
    const updateentregador = new UpdateEntregadorService(entregadorRepository);

    const entregador = await updateentregador.execute({
      cod_entregador: parseInt(cod_entregador),
      nome_entregador,
      des_endereco,
      nr_endereco,
      des_bairro,
      des_cidade,
      nr_cep: nr_cep.replace(/\.|-/gm, ""),
      nr_telefone: nr_telefone
        .replace(/\.|-/gm, "")
        .replace("/", "")
        .replace(" ", ""),
      cod_cpf: cod_cpf.replace(/\.|-/gm, ""),
      cod_cnh: cod_cnh.replace(/\.|-/gm, ""),
      des_email,
    });

    return res.status(200).json(entregador);
  }

  public async getall(req: Request, res: Response): Promise<Response> {
    const entregadorRepository = new EntregadorRepository();
    const getAllentregador = new GetAllEntregadorService(entregadorRepository);

    const entregadores = await getAllentregador.execute();

    return res.status(200).json(entregadores);
  }

  public async getone(req: Request, res: Response): Promise<Response> {
    const { cod_entregador } = req.params;

    const entregadorRepository = new EntregadorRepository();
    const getOneentregadores = new GetOneEntregadorService(
      entregadorRepository,
    );

    const entregador = await getOneentregadores.execute(
      parseInt(cod_entregador),
    );

    return res.status(200).json(entregador);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { cod_entregador } = req.params;

    const entregadorRepository = new EntregadorRepository();
    const deleteentregador = new DeleteEntregadorService(entregadorRepository);

    const entregador = await deleteentregador.execute(parseInt(cod_entregador));

    return res.status(200).json(entregador);
  }
}

export default EntregadorController;
