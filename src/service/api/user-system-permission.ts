import { newRequest } from "../request";

interface PermissionRequestType {
  userId: number;
  systemWebIds: number[];
  permissionLevel: string;
}

interface UpdateFavoriteSystemType {
  idPermission: number,
  isFavorite: boolean
}

export const GetUserSystemPermissions = async (id: number) => {
  const res = await newRequest<any>({
    method: 'get',
    url: `/api/services/app/UserSystemPermission/GetUserSystemPermissions?userId=${id}`
  });

  return res;
};

export const AssignSystemPermissionsToUser = (data: PermissionRequestType) => {
  const res = newRequest<any>({
    data,
    method: 'post',
    url: '/api/services/app/UserSystemPermission/AssignSystemPermissionsToUser'
  });

  return res;
};

export const UpdateFavoriteSystem = (data: UpdateFavoriteSystemType) => {
  const res = newRequest<any>({
    data,
    method: 'put',
    url: '/api/services/app/UserSystemPermission/UpdateFavoriteSystem'
  });

  return res;
}
