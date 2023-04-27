import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "@config/auth";

import AppError from "@shared/errors/AppError";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
  cod_perfil: number;
  cod_distribuidora: number;
}

const ensureAuthenticated = (cod_perfil_permitido?: number) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError("Usuário não autenticado", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
      if (!authConfig.jwt.secret) {
        throw new AppError("No secret", 500);
      }

      const decoded = verify(token, authConfig.jwt.secret);

      const { cod_perfil, cod_distribuidora, sub } = decoded as TokenPayload;

      if (cod_perfil_permitido) {
        if (cod_perfil_permitido !== cod_perfil) {
          throw new AppError("Permissão inválida", 403);
        }
      }

      req.usuario = {
        cod_usuario: parseInt(sub),
        cod_perfil,
        cod_distribuidora,
      };

      return next();
    } catch (err) {
      if (err instanceof AppError) {
        throw err;
      }
      throw new AppError("Token de autenticação inválido", 401);
    }
  };
};

export default ensureAuthenticated;
