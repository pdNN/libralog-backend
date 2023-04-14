import { Request, Response } from "express";
import { z } from "zod";
import UsuariosRepository from "../../repositories/prisma/UsuariosRepository";
import CreateUsuarioService from "../../services/Usuarios/CreateUsuarioService";

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
      des_senha: z
        .string({
          required_error: "Senha é obrigatória",
        })
        .min(1, { message: "Senha deve ser preenchida." }),
      cod_distribuidora: z.number({
        required_error: "Distribuidora é obrigatória",
      }),
    });

    const { nome_usuario, email_usuario, des_senha, cod_distribuidora } =
      usuarioBody.parse(req.body);

    const usuarioRepository = new UsuariosRepository();
    const createUsuario = new CreateUsuarioService(usuarioRepository);

    const usuario = await createUsuario.execute({
      nome_usuario,
      email_usuario,
      des_senha,
      cod_distribuidora,
    });

    return res.status(201).json(usuario);
  }
}

export default UsuariosController;
