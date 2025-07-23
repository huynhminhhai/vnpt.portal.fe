// import { UserListParams } from '@/types/statistical';

import { newRequest, request } from '../request';

export const GetAllLoginLog = async (params: Api.SystemManage.paramsPhanTrang) => {
  const res = await newRequest<Api.SystemManage.GetAllUserWithTenantResponse>({
    method: 'get',
    params,
    url: '/api/services/app/System/getAllLoginLog'
  });

  return res;
};
export const GetAllAuditLog = async (params: Api.SystemManage.paramsPhanTrang) => {
  const res = await newRequest<Api.SystemManage.GetAllUserWithTenantResponse>({
    method: 'get',
    params,
    url: '/api/services/app/System/getAllAuditLog'
  });

  return res;
};
