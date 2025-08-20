import { newRequest } from "../request";

export interface TenantType {
  tenancyName: string;
  name: string;
  adminEmailAddress: string;
  connectionString?: string;
  isActive: boolean;
}

export const GetAllTenant = async (params: Api.SystemManage.paramsPhanTrang) => {
  const res = await newRequest<Api.SystemManage.GetAllUserWithTenantResponse>({
    method: 'get',
    params,
    url: '/api/services/app/Tenant/GetAll'
  });

  return res;
};

export const GetTenantById = (id: number) => {
  const res = newRequest<any>({
    method: 'get',
    url: `/api/services/app/Tenant/Get?id=${id}`
  });

  return res;
};

export const CreateTenant = (data: TenantType) => {
  const res = newRequest<any>({
    data,
    method: 'post',
    url: '/api/services/app/Tenant/Create'
  });

  return res;
};

export const UpdateTenant = (data: TenantType) => {
  const res = newRequest<any>({
    data,
    method: 'put',
    url: '/api/services/app/Tenant/Update'
  });

  return res;
};
