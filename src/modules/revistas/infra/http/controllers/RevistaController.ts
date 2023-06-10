import { Request, Response } from "express";
import { z } from "zod";

import RevistasRepository from "../../prisma/RevistasRepository";
import CreateRevistaService from "../../../services/CreateRevistaService";
import EditoraRepository from "@modules/editoras/infra/prisma/EditoraRepository";
import UpdateRevistaService from "@modules/revistas/services/UpdateRevistaService";
import DeleteRevistaService from "@modules/revistas/services/DeleteRevistaService";
import GetAllRevistaService from "@modules/revistas/services/GetAllRevistaService";
import GetOneRevistaService from "@modules/revistas/services/GetOneRevistaService";

class RevistasController {
  public async create(req: Request, res: Response): Promise<Response> {
    const revistaBody = z.object({
      nome_revista: z
        .string({
          required_error: "O nome é obrigatório.",
        })
        .min(1, { message: "O nome deve ser preenchido" }),
      cod_edicao_revista: z
        .string({
          required_error: "O código da edição da revista é obrigatório.",
        })
        .min(1, {
          message: "O código da edição da revista deve ser preenchido.",
        }),
      cod_editora: z.number({
        required_error: "Editora é obrigatória",
      }),
    });

    const { nome_revista, cod_edicao_revista, cod_editora } = revistaBody.parse(
      req.body,
    );

    const revistaRepository = new RevistasRepository();
    const editoraRepository = new EditoraRepository();
    const createRevista = new CreateRevistaService(
      revistaRepository,
      editoraRepository,
    );

    const revista = await createRevista.execute({
      nome_revista,
      cod_edicao_revista,
      cod_editora,
    });

    return res.status(201).json(revista);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { cod_revista } = req.params;
    const revistaBody = z.object({
      nome_revista: z.string().optional(),
      cod_edicao_revista: z.string().optional(),
      cod_editora: z.number().optional(),
    });

    const { nome_revista, cod_edicao_revista, cod_editora } = revistaBody.parse(
      req.body,
    );

    const revistaRepository = new RevistasRepository();
    const editoraRepository = new EditoraRepository();
    const updateRevista = new UpdateRevistaService(
      revistaRepository,
      editoraRepository,
    );

    const revista = await updateRevista.execute({
      cod_revista: parseInt(cod_revista),
      nome_revista,
      cod_edicao_revista,
      cod_editora,
    });

    return res.status(200).json(revista);
  }

  public async getall(req: Request, res: Response): Promise<Response> {
    const revistaRepository = new RevistasRepository();
    const getAllRevistas = new GetAllRevistaService(revistaRepository);

    const revistas = await getAllRevistas.execute();

    return res.status(200).json(revistas);
  }

  public async getone(req: Request, res: Response): Promise<Response> {
    const { cod_revista } = req.params;

    const revistaRepository = new RevistasRepository();
    const getOneRevista = new GetOneRevistaService(revistaRepository);

    const revista = await getOneRevista.execute(parseInt(cod_revista));

    return res.status(200).json(revista);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { cod_revista } = req.params;

    const revistasRepository = new RevistasRepository();
    const deleteRevista = new DeleteRevistaService(revistasRepository);

    const revista = await deleteRevista.execute(parseInt(cod_revista));

    return res.status(200).json(revista);
  }
}

export default RevistasController;
