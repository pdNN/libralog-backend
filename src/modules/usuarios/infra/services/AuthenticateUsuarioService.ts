import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "@config/auth";

import AppError from "@shared/errors/AppError";

import { IUsuarioDTO } from "../../dtos/IUsuarioDTO";
import IUsuariosRepository from "../../repositories/IUsuariosRepository";

interface IRequest {
  email_usuario: string;
  des_senha: string;
}

interface IResponse {
  usuario: IUsuarioDTO;
  token: string;
}

class AuthenticateUsuarioService {
  constructor(private usuariosRepository: IUsuariosRepository) {}

  public async execute(data: IRequest): Promise<IResponse> {
    const { email_usuario, des_senha } = data;

    const usuario = await this.usuariosRepository.findByEmail(email_usuario);

    if (!usuario) {
      throw new AppError("Combinação de email/senha incorreta.", 401);
    }

    if (!usuario.des_senha) {
      throw new AppError("No password.", 500);
    }

    const passwordMatched = await compare(des_senha, usuario.des_senha);

    if (!passwordMatched) {
      throw new AppError("Combinação email/senha incorreta.", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    if (!secret) {
      throw new AppError("No secret", 500);
    }

    delete usuario.des_senha;

    if (!usuario.perfil) {
      throw new AppError("Usuário sem perfil", 400);
    }

    const token = sign(
      {
        permissoes: usuario.perfil.permissoes,
        cod_perfil: usuario.perfil.cod_perfil,
        nome_perfil: usuario.perfil.nome_perfil,
        cod_distribuidora: usuario.cod_distribuidora,
      },
      secret,
      {
        subject: usuario.cod_usuario.toString(),
        expiresIn,
      },
    );

    return { usuario, token };
  }
}

export default AuthenticateUsuarioService;
