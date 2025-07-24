// import { UserListParams } from '@/types/statistical';

import { newRequest } from '../request';

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
  return newRequest<any>({
    method: 'get',
    params: {
      nam
    },
    url: '/api/services/app/ThongKe/GetXuHuong'
  });
};

export const GetThongTinTongQuat = () => {
  return newRequest<any>({
    method: 'get',
    url: '/api/services/app/ThongKe/GetThongTinTongQuat'
  });
};

export const GetNewDangKySuDung = (top: number) => {
  return newRequest<any>({
    method: 'get',
    params: {
      top
    },
    url: '/api/services/app/ThongKe/GetNewDangKySuDung'
  });
};

export const GetNewUserSuDung = (top: number) => {
  return newRequest<any>({
    method: 'get',
    params: {
      top
    },
    url: '/api/services/app/ThongKe/GetNewUserSuDung'
  });
};

export const GetAllLichSuThanhToan = (params: Api.SystemManage.paramsPhanTrang) => {
  return newRequest<any>({
    method: 'get',
    params,
    url: '/api/services/app/ThongKe/GetAllLichSuThanhToan'
  });
};
