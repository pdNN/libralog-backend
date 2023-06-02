import { Request, Response } from "express";
import { z } from "zod";

import EditoraRepository from "@modules/editoras/infra/prisma/EditoraRepository";
import CreateEditoraService from "@modules/editoras/services/CreateEditoraService";
import UpdateEditoraService from "@modules/editoras/services/UpdateEditoraService";
import GetAllEditoraService from "@modules/editoras/services/GetAllEditoraService";
import GetOneEditoraService from "@modules/editoras/services/GetOneEditoraService";
import DeleteEditoraService from "@modules/editoras/services/DeleteEditoraService";

class EditoraController {
  public async create(req: Request, res: Response): Promise<Response> {
    const editoraBody = z.object({
      nome_editora: z
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
    });

    const {
      nome_editora,
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
    } = editoraBody.parse(req.body);

    const editoraRepository = new EditoraRepository();
    const createEditora = new CreateEditoraService(editoraRepository);

    const editora = await createEditora.execute({
      nome_editora,
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
    });

    return res.status(201).json(editora);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { cod_editora } = req.params;

    const editoraBody = z.object({
      nome_editora: z.string().optional(),
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
    });

    const {
      nome_editora,
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
    } = editoraBody.parse(req.body);

    const editoraRepository = new EditoraRepository();
    const updateEditora = new UpdateEditoraService(editoraRepository);

    const editora = await updateEditora.execute({
      cod_editora: parseInt(cod_editora),
      nome_editora,
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
    });

    return res.status(200).json(editora);
  }

  public async getall(req: Request, res: Response): Promise<Response> {
    const editoraRepository = new EditoraRepository();
    const getAlleditora = new GetAllEditoraService(editoraRepository);

    const editoras = await getAlleditora.execute();

    return res.status(200).json(editoras);
  }

  public async getone(req: Request, res: Response): Promise<Response> {
    const { cod_editora } = req.params;

    const editoraRepository = new EditoraRepository();
    const getOneeditoras = new GetOneEditoraService(editoraRepository);

    const editora = await getOneeditoras.execute(parseInt(cod_editora));

    return res.status(200).json(editora);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { cod_editora } = req.params;

    const editoraRepository = new EditoraRepository();
    const deleteeditora = new DeleteEditoraService(editoraRepository);

    const editora = await deleteeditora.execute(parseInt(cod_editora));

    return res.status(200).json(editora);
  }
}

export default EditoraController;
