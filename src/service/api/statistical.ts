// import { UserListParams } from '@/types/statistical';

import { newRequest, request } from '../request';

export const GetAllUserWithTenant = async (params: Api.SystemManage.paramsPhanTrang) => {
  const res = await newRequest<Api.SystemManage.GetAllUserWithTenantResponse>({
    method: 'get',
    params,
    url: '/api/services/app/ThongKe/GetAllUserWithTenant'
  });

  return res;
};

export const GetGoiDangKy = (params: Api.SystemManage.paramsPhanTrang) => {
  const res = newRequest<Api.SystemManage.responePhanTrang>({
    method: 'get',
    params,
    url: '/api/services/app/ThongKe/GetGoiDangKy'
  });

  return res;
};

export const GetXuHuong = (nam: number) => {
  return request<Api.SystemManage.responePhanTrang>({
    method: 'get',
    params: {
      nam
    },
    url: '/api/services/app/ThongKe/GetXuHuong'
  });
};
