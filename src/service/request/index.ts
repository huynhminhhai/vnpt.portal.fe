import { BACKEND_ERROR_CODE, createFlatRequest, createRequest } from '@sa/axios';

import { globalConfig } from '@/config';
import { localStg } from '@/utils/storage';

import { backEndFail, handleError } from './error';
import { getAuthorization } from './shared';
import type { RequestInstanceState } from './type';

export const request = createFlatRequest<App.Service.Response, RequestInstanceState>(
  {
    baseURL: globalConfig.serviceBaseURL,
    headers: {
      apifoxToken: 'XL299LiMEDZ0H5h3A29PxwQXdMJqWyY2'
    }
  },
  {
    isBackendSuccess(response) {
      // when the backend response code is "0000"(default), it means the request is success
      // to change this logic by yourself, you can modify the `VITE_SERVICE_SUCCESS_CODE` in `.env` file
      return String(response.data.code) === import.meta.env.VITE_SERVICE_SUCCESS_CODE;
    },
    async onBackendFail(response, instance) {
      await backEndFail(response, instance, request);
    },
    onError(error) {
      handleError(error, request);
    },
    async onRequest(config) {
      const Authorization = getAuthorization();
      Object.assign(config.headers, { Authorization });

      return config;
    },
    transformBackendResponse(response) {
      return response.data.data;
    }
  }
);

export const demoRequest = createRequest<App.Service.DemoResponse>(
  {
    baseURL: globalConfig.serviceOtherBaseURL.demo
  },
  {
    isBackendSuccess(response) {
      // when the backend response code is "200", it means the request is success
      // you can change this logic by yourself
      return response.data.status === '200';
    },
    async onBackendFail(_response) {
      // when the backend response code is not "200", it means the request is fail
      // for example: the token is expired, refresh token and retry request
    },
    onError(error) {
      // when the request is fail, you can show error message

      let message = error.message;

      // show backend error message
      if (error.code === BACKEND_ERROR_CODE) {
        message = error.response?.data?.message || message;
      }

      window.$message?.error(message);
    },
    async onRequest(config) {
      const { headers } = config;

      // set token
      const token = localStg.get('token');
      const Authorization = token ? `Bearer ${token}` : null;
      Object.assign(headers, { Authorization });

      return config;
    },
    transformBackendResponse(response) {
      return response.data.result;
    }
  }
);

// Request mới cho API format với response.data
export const newRequest = createFlatRequest<Api.SystemManage.ApiResponse, RequestInstanceState>(
  {
    baseURL: globalConfig.serviceBaseURL,
    headers: {
      apifoxToken: 'XL299LiMEDZ0H5h3A29PxwQXdMJqWyY2'
    }
  },
  {
    isBackendSuccess(response) {
      // Kiểm tra success field từ response.data
      const responseData = response.data as any;
      return responseData.success === true || 
             (responseData.result && Object.keys(responseData.result).length > 0);
    },
    async onBackendFail(response, instance) {
      // Xử lý lỗi riêng cho API format mới
      const responseData = response.data as any;
      console.error('API Error:', responseData.error?.message);
      window.$message?.error(responseData.error?.message || 'Request failed');
    },
    onError(error) {
      // Xử lý lỗi network
      console.error('Network Error:', error);
      window.$message?.error(error.message || 'Network error');
    },
    async onRequest(config) {
      const Authorization = getAuthorization();
      Object.assign(config.headers, { Authorization });

      return config;
    },
    transformBackendResponse(response) {
      // Trả về response.data trực tiếp (bao gồm result, success, error, etc.)
      const responseData = response.data as any;
      return responseData;
    }
  }
);
