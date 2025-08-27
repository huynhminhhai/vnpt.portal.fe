import { newRequest } from '../request';

export interface SystemWebType {
  systemCode: string;
  systemName: string;
  systemType?: string | number;
  systemDescription?: string;
  systemUrl: string;
  iconUrl?: string;

  authMethod?: string;
  secretKey?: string;
  callbackUrl?: string;
  sortOrder?: number;
  systemStatus?: string;

  createdBy?: string;
  createdDate?: string;
  modifiedBy?: string;
  modifiedDate?: string;
  groupSystemFk?: string | null;
  groupSystemId?: string | null;
}

export const GetAllSystemWeb = async (params: Api.SystemManage.paramsPhanTrang) => {
  const res = await newRequest<Api.SystemManage.GetAllUserWithTenantResponse>({
    method: 'get',
    params,
    url: '/api/services/app/SystemWeb/GetAll'
  });

  return res;
};

export const GetSystemWebById = (id: number) => {
  const res = newRequest<any>({
    method: 'get',
    url: `/api/services/app/SystemWeb/GetById?id=${id}`
  });

  return res;
};

export const GetSystemWebsByUser = (params: Api.SystemManage.paramsPhanTrang) => {
  const res = newRequest<Api.SystemManage.GetAllUserWithTenantResponse>({
    method: 'get',
    params,
    url: `/api/services/app/SystemWeb/GetSystemWebsByUser`
  });

  return res;
};

export const CreateSystemWeb = (data: SystemWebType) => {
  const res = newRequest<any>({
    data,
    method: 'post',
    url: '/api/services/app/SystemWeb/CreateSystemWeb'
  });

  return res;
};

export const UpdateSystemWeb = (data: SystemWebType) => {
  const res = newRequest<any>({
    data,
    method: 'put',
    url: '/api/services/app/SystemWeb/UpdateSystemWeb'
  });

  return res;
};

export const UpdateActiveSystemWeb = (systemWebId: number, isActive: boolean) => {
  const res = newRequest<any>({
    method: 'put',
    url: `/api/services/app/SystemWeb/UpdateActiveSystemWeb?systemWebId=${systemWebId}&isActive=${isActive}`
  });

  return res;
};

export const DeleteSystemWeb = (id: number) => {
  const res = newRequest<any>({
    method: 'delete',
    url: `/api/services/app/SystemWeb/DeleteSystemWeb?id=${id}`
  });

  return res;
};
