import { newRequest } from '../request';

export const GetStatistics = async () => {
  const res = await newRequest<any>({
    method: 'post',
    url: '/api/services/app/Dashboard/Statistics'
  });

  return res;
};

export const GetGroupSystemCharts = async () => {
  const res = await newRequest<any>({
    method: 'get',
    url: '/api/services/app/Dashboard/GetGroupSystemCharts'
  });

  return res;
};

export const GetSystemTraffic = async () => {
  const res = await newRequest<any>({
    method: 'post',
    url: '/api/services/app/Dashboard/SystemTraffic'
  });

  return res;
};

interface GetAllLoginLogType {
  Sorting?: string;
  SkipCount: number;
  MaxResultCount: number;
}

export const GetAllLoginLog = async (params: GetAllLoginLogType) => {
  const res = await newRequest<any>({
    method: 'get',
    params,
    url: '/api/services/app/User/getAllLoginLog'
  });

  return res;
};

interface GetSystemTrafficChartDataType {
  StartDate?: string;
  EndDate?: string;
  GroupBy: number;
  SystemIds?: number[];
}

export const GetSystemTrafficChartData = async (params: GetSystemTrafficChartDataType) => {
  const res = await newRequest<any>({
    method: 'get',
    params,
    url: '/api/services/app/Dashboard/GetSystemTrafficChartData'
  });

  return res;
};
