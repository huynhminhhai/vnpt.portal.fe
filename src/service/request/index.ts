import { BACKEND_ERROR_CODE, createFlatRequest, createRequest, newCreateFlatRequest } from '@sa/axios';

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
export const newRequest = newCreateFlatRequest<Api.SystemManage.ApiResponse, RequestInstanceState>(
  {
    baseURL: globalConfig.serviceBaseURL,
    headers: {
      apifoxToken: 'XL299LiMEDZ0H5h3A29PxwQXdMJqWyY2',
      'ngrok-skip-browser-warning': 'true',
    }
  },
  {
    isBackendSuccess(response) {
      // Validate response structure first
      const responseData = response.data as Api.SystemManage.ApiResponse;

      if (!responseData || typeof responseData.success !== 'boolean') {
        console.warn('Invalid response structure:', responseData);
        return false;
      }

      // Chỉ check success field - đơn giản và reliable nhất
      return responseData.success === true;
    },
    async onBackendFail(response, instance) {
      // Xử lý lỗi riêng cho API format mới với type safety
      const responseData = response.data as Api.SystemManage.ApiResponse;

      const errorMessage = responseData.error

      console.error('API Error:', {
        message: errorMessage,
        error: responseData.error,
        success: responseData.success,
        result: responseData.result
      });

      window.$message?.error(errorMessage);
    },
    onError(error) {
      console.error('Network Error:', {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        data: error.response?.data
      });

      let message = error.message || 'Network error';

      const data = error.response?.data;


      if (data?.error) {
        console.log(data?.error);
        // Bắt lỗi chi tiết từ API
        const { message: msg, details } = data.error as any;
        message = details ? `${msg} - ${details}` : msg || message;

        window.$message?.error(message);

        return;
      }

      if (error.code === 'NETWORK_ERROR') {
        message = 'Không thể kết nối đến server';
      } else if (error.response?.status === 500) {
        message = 'Lỗi server nội bộ';
      } else if (error.response?.status === 404) {
        message = 'API không tìm thấy';
      }

      window.$message?.error(message);
    },
    async onRequest(config) {
      const Authorization = getAuthorization();
      Object.assign(config.headers, { Authorization });

      return config;
    },
    transformBackendResponse(response) {
      // Trả về response.data trực tiếp với type safety
      const responseData = response.data as Api.SystemManage.ApiResponse;
      return responseData;
    }
  }
);
