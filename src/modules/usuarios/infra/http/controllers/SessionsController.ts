import { Request, Response } from "express";
import { z } from "zod";
import UsuariosRepository from "../../prisma/UsuariosRepository";
import AuthenticateUsuarioService from "../../../services/AuthenticateUsuarioService";

class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const usuarioBody = z.object({
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
    });

    const { email_usuario, des_senha } = usuarioBody.parse(req.body);

    const usuarioRepository = new UsuariosRepository();
    const authenticateUsuario = new AuthenticateUsuarioService(
      usuarioRepository,
    );

    const { usuario, token } = await authenticateUsuario.execute({
      email_usuario,
      des_senha,
    });

    return res.status(201).json({ usuario, token });
  }
}

export default SessionsController;
