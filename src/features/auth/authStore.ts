import type { PayloadAction } from '@reduxjs/toolkit';
import { createSelector, createSlice } from '@reduxjs/toolkit';

import { getToken, getUserId, getUserInfo } from './shared';

const initialState = {
  token: getToken(),
  userInfo: getUserInfo(),
  userId: getUserId(),
};

export const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    resetAuth: () => initialState,
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
    setUserId: (state, { payload }: PayloadAction<number>) => {
      state.userId = payload;
    },
    setUserInfo: (state, { payload }: PayloadAction<Api.Auth.UserInfo>) => {
      state.userInfo = payload;
    }
  },
  selectors: {
    selectToken: auth => auth.token,
    selectUserId: auth => auth.userId,
    selectUserInfo: auth => auth.userInfo
  }
});

export const { resetAuth, setToken, setUserInfo, setUserId } = authSlice.actions;

export const { selectToken, selectUserId, selectUserInfo } = authSlice.selectors;

/** Is login */
export const getIsLogin = createSelector([selectToken], token => Boolean(token));

/** Is static super role */
export const isStaticSuper = createSelector([selectUserInfo], userInfo => {
  const { VITE_AUTH_ROUTE_MODE, VITE_STATIC_SUPER_ROLE } = import.meta.env;

  return VITE_AUTH_ROUTE_MODE === 'static' && userInfo.roles.includes(VITE_STATIC_SUPER_ROLE);
});
