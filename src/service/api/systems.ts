import { newRequest } from '../request';

export const GetAllSystem = async (params: Api.SystemManage.paramsPhanTrang) => {
  const res = await newRequest<Api.SystemManage.GetAllUserWithTenantResponse>({
    method: 'get',
    params,
    url: '/api/services/app/SystemWeb/GetAll'
  });

  return res;
};
