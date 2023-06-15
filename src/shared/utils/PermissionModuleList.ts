import AppError from "@shared/errors/AppError";

export interface IPermissionModule {
  module: string;
  permissions: string[];
}

const permissionsModule: IPermissionModule[] = [
  {
    module: "usuarios",
    permissions: ["editar", "visualizar", "deletar"],
  },
  {
    module: "revistas",
    permissions: ["editar", "visualizar", "deletar"],
  },
  {
    module: "perfis",
    permissions: ["editar", "visualizar", "deletar"],
  },
  {
    module: "entregadores",
    permissions: ["editar", "visualizar", "deletar"],
  },
  {
    module: "editoras",
    permissions: ["editar", "visualizar", "deletar"],
  },
  {
    module: "distribuidoras",
    permissions: ["editar", "visualizar", "deletar"],
  },
  {
    module: "bancas",
    permissions: ["editar", "visualizar", "deletar"],
  },
];

export const validate_registred_permission = (route_permissions?: string[]) => {
  if (route_permissions) {
    route_permissions.forEach((permissao) => {
      const [perm_module, permission] = permissao.split("_");

      const found_module = permissionsModule.filter(
        (p) => p.module === perm_module,
      );

      if (found_module.length === 0) {
        throw new AppError(
          `Módulo ${perm_module} não registrado em: src/shared/utils/PermissionModuleList.ts`,
          500,
        );
      }

      if (found_module.length > 1) {
        throw new AppError(
          `Mais de um módulo com o nome: ${perm_module} registrado em: src/shared/utils/PermissionModuleList.ts`,
          500,
        );
      }

      const found_permission = found_module[0].permissions.filter(
        (p) => p === permission,
      );

      if (found_permission.length === 0) {
        throw new AppError(
          `Permissão ${permission} não registrada no módulo ${perm_module} em: src/shared/utils/PermissionModuleList.ts`,
          500,
        );
      }

      if (found_permission.length > 1) {
        throw new AppError(
          `Mais de uma permissão com o nome: ${permission} registrada no módulo: ${perm_module} em: src/shared/utils/PermissionModuleList.ts`,
          500,
        );
      }
    });
  }

  return true;
};

export default permissionsModule;
