import { Request, Response } from "express";
import { z } from "zod";

import UsuariosRepository from "../../prisma/UsuariosRepository";
import CreateUsuarioService from "../../../services/CreateUsuarioService";
import DistribuidoraRepository from "@modules/distribuidoras/infra/prisma/DistribuidoraRepository";
import UpdateUsuarioService from "@modules/usuarios/services/UpdateUsuarioService";
import DeleteUsuarioService from "@modules/usuarios/services/DeleteUsuarioService";
import GetAllUsuarioService from "@modules/usuarios/services/GetAllUsuarioService";
import GetOneUsuarioService from "@modules/usuarios/services/GetOneUsuarioService";

class UsuariosController {
  public async create(req: Request, res: Response): Promise<Response> {
    const usuarioBody = z.object({
      nome_usuario: z
        .string({
          required_error: "O nome é obrigatório.",
        })
        .min(1, { message: "O nome deve ser preenchido" }),
      email_usuario: z
        .string({
          required_error: "O e-mail é obrigatório.",
        })
        .min(1, { message: "O e-mail deve ser preenchido." })
        .email("E-mail inválido."),
      cod_perfil: z
        .number({
          required_error: "O perfil é obrigatório.",
        })
        .min(0, { message: "O perfil deve ser preenchido." }),
      des_senha: z
        .string({
          required_error: "Senha é obrigatória",
        })
        .min(1, { message: "Senha deve ser preenchida." }),
      cod_distribuidora: z.number({
        required_error: "Distribuidora é obrigatória",
      }),
    });

    const {
      nome_usuario,
      email_usuario,
      des_senha,
      cod_perfil,
      cod_distribuidora,
    } = usuarioBody.parse(req.body);

    const usuarioRepository = new UsuariosRepository();
    const distribuidoraRepository = new DistribuidoraRepository();
    const createUsuario = new CreateUsuarioService(
      usuarioRepository,
      distribuidoraRepository,
    );

    const usuario = await createUsuario.execute({
      nome_usuario,
      email_usuario,
      des_senha,
      cod_perfil,
      cod_distribuidora,
    });

    return res.status(201).json(usuario);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { cod_usuario } = req.params;
    const usuarioBody = z.object({
      nome_usuario: z.string().optional(),
      email_usuario: z.string().email("E-mail inválido.").optional(),
      cod_perfil: z.number().optional(),
      des_senha: z.string().optional(),
      cod_distribuidora: z.number().optional(),
    });

    const {
      nome_usuario,
      email_usuario,
      // des_senha,
      cod_perfil,
      cod_distribuidora,
    } = usuarioBody.parse(req.body);

    const usuarioRepository = new UsuariosRepository();
    const distribuidoraRepository = new DistribuidoraRepository();
    const updateUsuario = new UpdateUsuarioService(
      usuarioRepository,
      distribuidoraRepository,
    );

    const usuario = await updateUsuario.execute({
      cod_usuario: parseInt(cod_usuario),
      nome_usuario,
      email_usuario,
      cod_perfil,
      cod_distribuidora,
    });

    return res.status(200).json(usuario);
  }

  public async getall(req: Request, res: Response): Promise<Response> {
    const usuarioRepository = new UsuariosRepository();
    const getAllUsuarios = new GetAllUsuarioService(usuarioRepository);

    const usuarios = await getAllUsuarios.execute();

    return res.status(200).json(usuarios);
  }

  public async getone(req: Request, res: Response): Promise<Response> {
    const { cod_usuario } = req.params;

    const usuarioRepository = new UsuariosRepository();
    const getOneUsuario = new GetOneUsuarioService(usuarioRepository);

    const usuario = await getOneUsuario.execute(parseInt(cod_usuario));

    return res.status(200).json(usuario);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { cod_usuario } = req.params;

    const usuariosRepository = new UsuariosRepository();
    const deleteUsuario = new DeleteUsuarioService(usuariosRepository);

    const usuario = await deleteUsuario.execute(parseInt(cod_usuario));

    return res.status(200).json(usuario);
  }
}

export default UsuariosController;
