import { newRequest } from "../request";

export interface UserType {
  id?: number;
  userName: string;
  name: string;
  surname: string;
  emailAddress: string;
  isActive: boolean;
  fullName?: string;
  lastLoginTime?: string;
  creationTime?: string;
  roleNames: string[];
  password: string;
}

export const GetAllUser = async (params: Api.SystemManage.paramsPhanTrang) => {
  const res = await newRequest<Api.SystemManage.GetAllUserWithTenantResponse>({
    method: 'get',
    params,
    url: '/api/services/app/User/GetAll'
  });

  return res;
};

export const GetUserById = (id: number) => {
  const res = newRequest<any>({
    method: 'get',
    url: `/api/services/app/User/GetUserById?userId=${id}`
  });

  return res;
};

export const CreateUser = (data: UserType) => {
  const res = newRequest<any>({
    data,
    method: 'post',
    url: '/api/services/app/User/Create'
  });

  return res;
};

export const UpdateUser = (data: UserType) => {
  const res = newRequest<any>({
    data,
    method: 'put',
    url: '/api/services/app/User/UpdateUser'
  });

  return res;
};

export const DeleteUser = (id: number) => {
  const res = newRequest<any>({
    method: 'delete',
    url: `/api/services/app/User/Delete?id=${id}`
  });

  return res;
};
