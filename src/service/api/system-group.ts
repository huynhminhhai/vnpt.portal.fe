import { newRequest } from '../request';

export interface GroupSystemType {
  id?: number;
  displayName: string;
  description: string;
  status: number;
  creationTime: string;
  creatorUserId: number;
  lastModificationTime: string;
  lastModifierUserId: number;
}

export const GetAllSystemGroup = async (params: Api.SystemManage.paramsPhanTrang) => {
  const res = await newRequest<Api.SystemManage.GetAllUserWithTenantResponse>({
    method: 'get',
    params,
    url: '/api/services/app/GroupSystem/GetAllGroupSystem'
  });

  return res;
};

export const GetSystemGroupById = (id: number) => {
  const res = newRequest<any>({
    method: 'get',
    url: `/api/services/app/GroupSystem/GetGroupSystemById?id=${id}`
  });

  return res;
};

export const CreateSystemGroup = (data: GroupSystemType) => {
  const res = newRequest<any>({
    data,
    method: 'post',
    url: '/api/services/app/GroupSystem/CreateGroupSystem'
  });

  return res;
};

export const UpdateSystemGroup = (data: GroupSystemType) => {
  const res = newRequest<any>({
    data,
    method: 'put',
    url: '/api/services/app/GroupSystem/UpdateGroupSystem'
  });

  return res;
};

export const DeleteGroupSystem = (id: number) => {
  const res = newRequest<any>({
    method: 'delete',
    url: `/api/services/app/GroupSystem/DeleteGroupSystem?id=${id}`
  });

  return res;
};
