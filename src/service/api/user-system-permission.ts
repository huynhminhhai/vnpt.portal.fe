import { newRequest } from "../request";

interface PermissionRequestType {
  userId: number;
  systemWebIds: number[];
  permissionLevel: string;
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
