import { Request, Response } from "express";
import { z } from "zod";

import PerfisRepository from "../../prisma/PerfisRepository";
import CreatePerfilService from "../../../services/CreatePerfilService";
import UpdatePerfilService from "@modules/perfis/services/UpdatePerfilService";
import DeletePerfilService from "@modules/perfis/services/DeletePerfilService";
import GetAllPerfilService from "@modules/perfis/services/GetAllPerfisService";
import GetOnePerfilService from "@modules/perfis/services/GetOnePerfilService";

class PerfisController {
  public async create(req: Request, res: Response): Promise<Response> {
    const perfilBody = z.object({
      nome_perfil: z
        .string({
          required_error: "O nome é obrigatório.",
        })
        .toLowerCase()
        .min(1, { message: "O nome deve ser preenchido" }),
      permissoes: z.string().array().optional(),
    });

    const { nome_perfil, permissoes } = perfilBody.parse(req.body);

    const perfilRepository = new PerfisRepository();
    const createPerfil = new CreatePerfilService(perfilRepository);

    const perfil = await createPerfil.execute({
      nome_perfil,
      permissoes,
    });

    return res.status(201).json(perfil);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { cod_perfil } = req.params;
    const perfilBody = z.object({
      nome_perfil: z.string().toLowerCase().optional(),
      permissoes: z.string().array().optional(),
    });

    const { nome_perfil, permissoes } = perfilBody.parse(req.body);

    const perfilRepository = new PerfisRepository();
    const updatePerfil = new UpdatePerfilService(perfilRepository);

    const perfil = await updatePerfil.execute({
      cod_perfil: parseInt(cod_perfil),
      nome_perfil,
      permissoes,
    });

    return res.status(200).json(perfil);
  }

  public async getall(req: Request, res: Response): Promise<Response> {
    const perfilRepository = new PerfisRepository();
    const getAllPerfis = new GetAllPerfilService(perfilRepository);

    const perfis = await getAllPerfis.execute();

    return res.status(200).json(perfis);
  }

  public async getone(req: Request, res: Response): Promise<Response> {
    const { cod_perfil } = req.params;

    const perfilRepository = new PerfisRepository();
    const getOnePerfil = new GetOnePerfilService(perfilRepository);

    const perfil = await getOnePerfil.execute(parseInt(cod_perfil));

    return res.status(200).json(perfil);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { cod_perfil } = req.params;

    const perfisRepository = new PerfisRepository();
    const deletePerfil = new DeletePerfilService(perfisRepository);

    const perfil = await deletePerfil.execute(parseInt(cod_perfil));

    return res.status(200).json(perfil);
  }
}

export default PerfisController;
