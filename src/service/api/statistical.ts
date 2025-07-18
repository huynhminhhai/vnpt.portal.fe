import { UserListParams } from '@/types/statistical';
import { request, newRequest } from '../request';

export const GetAllUserWithTenant = async (params: Api.SystemManage.paramsPhanTrang) => {
  const res = await newRequest<Api.SystemManage.GetAllUserWithTenantResponse>({
    method: 'get',
    url: '/api/services/app/ThongKe/GetAllUserWithTenant',
    params
  });

  return res;
};

const GetGoiDangKy = () => {
    var res =  request<Api.SystemManage.responePhanTrang>({
      method: 'get',
      url: '/api/services/app/ThongKe/GetGoiDangKy'
    });

    return res;
  };
  
  const GetXuHuong= ( nam : number) => {
    return request<Api.SystemManage.responePhanTrang>({
      method: 'get',
      url: '/api/services/app/ThongKe/GetXuHuong',
      params: {
        nam
      }
    });
  };