import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "@config/auth";

import AppError from "@shared/errors/AppError";
import { validate_registred_permission } from "@shared/utils/PermissionModuleList";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
  permissoes: string[];
  cod_perfil: number;
  nome_perfil: string;
  cod_distribuidora: number;
}

const validate_permissions = (
  user_permissions: string[],
  route_permissions?: string[],
) => {
  let allowed = true;
  if (route_permissions && !user_permissions.includes("super")) {
    allowed = false;
    route_permissions.forEach((permissao) => {
      if (permissao in user_permissions) {
        allowed = true;
      }
    });
  }
  return allowed;
};

const ensureAuthenticated = (route_permissions?: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    validate_registred_permission(route_permissions);

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

      const { permissoes, cod_perfil, nome_perfil, cod_distribuidora, sub } =
        decoded as TokenPayload;

      const allowed = validate_permissions(permissoes, route_permissions);

      if (!allowed) {
        throw new AppError("Usuário não autorizado", 403);
      }

      req.usuario = {
        cod_usuario: parseInt(sub),
        permissoes,
        cod_perfil,
        nome_perfil,
        cod_distribuidora,
      };

      return next();
    } catch (err) {
      if (err instanceof AppError) {
        throw err;
      }
      console.log(err);
      throw new AppError("Token de autenticação inválido", 401);
    }
  };
};

export default ensureAuthenticated;
