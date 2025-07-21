import { newRequest, request } from '../request';

/**
 * Login
 *
 * @param userName User name
 * @param password Password
 */
export async function fetchLogin(userName: string, password: string) {

  const data ={
    userNameOrEmailAddress: userName,
    password: password,
    rememberClient: true,
    tenant: "string"
  }
  const res = await newRequest<Api.Auth.LoginTokenResponse>({
    data,
    method: 'post',
    url: '/api/TokenAuth/Authenticate'
  });
  return res.data;
}

/** Get user info */
export function fetchGetUserInfo() {
  return request<Api.Auth.UserInfo>({ url: '/auth/getUserInfo' });
}

/**
 * Refresh token
 *
 * @param refreshToken Refresh token
 */
export function fetchRefreshToken(refreshToken: string) {
  return request<Api.Auth.LoginToken>({
    data: {
      refreshToken
    },
    method: 'post',
    url: '/auth/refreshToken'
  });
}

/**
 * return custom backend error
 *
 * @param code error code
 * @param msg error message
 */
export function fetchCustomBackendError(code: string, msg: string) {
  return request({ params: { code, msg }, url: '/auth/error' });
}
