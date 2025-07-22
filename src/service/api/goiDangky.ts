import { newRequest } from '../request';

type GoiSudungAddType = {
  chuKy: string;
  giaTien: string;
  id?: number;
  soThang: number;
  tenGoi: string;
  tenHienThi: string;
  thoiGianTao?: string;
  thuTuSapXep?: string;
  trangThaiHoatDong: boolean;
};

export const GetGoiSuDung = (id: number) => {
  const res = newRequest<any>({
    method: 'get',
    url: `/api/services/app/GoiSuDung/GetGoiSuDungById?id=${id}`
  });

  return res;
};

export const CreateGoiSudung = (data: GoiSudungAddType) => {
  const res = newRequest<any>({
    data,
    method: 'post',
    url: '/api/services/app/GoiSuDung/CreateGoiSuDung'
  });

  return res;
};

export const UpdateGoiSudung = (data: GoiSudungAddType) => {
  const res = newRequest<any>({
    data,
    method: 'put',
    url: '/api/services/app/GoiSuDung/UpdateGoiSuDung'
  });

  return res;
};

export const DeleteGoiSudung = (id: number) => {
  const res = newRequest<any>({
    method: 'delete',
    url: `/api/services/app/GoiSuDung/DeleteGoiSuDung?id=${id}`
  });

  return res;
};
