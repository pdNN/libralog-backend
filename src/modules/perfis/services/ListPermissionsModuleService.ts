import PermissionModuleList, {
  IPermissionModule,
} from "@shared/utils/PermissionModuleList";

class ListPermissionsService {
  async execute(): Promise<IPermissionModule[]> {
    return PermissionModuleList;
  }
}

export default ListPermissionsService;
