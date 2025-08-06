// import { UserListParams } from '@/types/statistical';

import { newRequest, request } from '../request';
interface ConfigData {
  id: number;
  keyApiVnptMoney: string;
  publishService: string;
  portalService: string;
  businessService: string;
  invoiceAdminUsername: string;
  invoiceAdminPassword: string;
  invoiceUsernameService: string;
  invoicePasswordService: string;
  autoInvoice: boolean;
  autoCreateKyHoaHon: boolean;
  publishKeyApiSanbox: string;
  qrCodeExpireTime: number;
  secretKeyMerchant: string;
  idDiemBan: string;
  idDoiTac: string;
  maDoiTac: string;
  tenDoiTac: string;
  urlApi: string;
  gtgt: number;
  applyOnlinePayment?: boolean;
}
export const getTblConfig = async () => {
  const res = await newRequest<any>({
    method: 'get',
    url: '/api/services/app/TblConfig/GetConfig'
  });

  return res;
};
export const updateTblConfig = async (params: ConfigData) => {
  const res = await newRequest<any>({
    method: 'put',
    data: params,
    url: '/api/services/app/TblConfig/UpdateConfig'
  });

  return res;
};
