import { useLoading } from '@sa/hooks';

import { globalConfig } from '@/config';
import { getIsLogin, selectUserInfo, setUserId } from '@/features/auth/authStore';
import { usePreviousRoute, useRouter } from '@/features/router';
import { fetchLogin, GetAllSystemWeb, PortalRedirect } from '@/service/api';
import { localStg } from '@/utils/storage';

import { useCacheTabs } from '../tab/tabHooks';

import { resetAuth as resetAuthAction, setToken } from './authStore';
import { clearAuthStorage } from './shared';

export function useAuth() {
  const userInfo = useAppSelector(selectUserInfo);

  const isLogin = useAppSelector(getIsLogin);

  function hasAuth(codes: string | string[]) {
    if (!isLogin) {
      return false;
    }

    if (typeof codes === 'string') {
      return userInfo.buttons.includes(codes);
    }

    return codes.some(code => userInfo.buttons.includes(code));
  }

  return {
    hasAuth
  };
}

export function useInitAuth() {
  const { endLoading, loading, startLoading } = useLoading();

  const [searchParams] = useSearchParams();

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { replace } = useRouter();

  const redirectUrl = searchParams.get('redirect');

  const serviceUrl = localStorage.getItem('serviceUrl');

  const normalizeUrl = (url: string) => {
    return url
      .replace(/^https?:\/\//, '')
      .split('/')[0]
      .trim();
  };

  const newTabRef = useRef<Window | null>(null);

  const openNewTab = (url: string): Window | null => {
    if (!newTabRef.current || newTabRef.current.closed) {
      newTabRef.current = window.open(url, "_blank");
    }
    return newTabRef.current;
  };

  const postMessageToTab = (tab: Window | null, message: any, targetOrigin: string) => {
    if (!tab) return console.warn("Tab not ready");

    setTimeout(() => {
      tab.postMessage(message, targetOrigin);
      console.log("Sent message to new tab");
    }, 1000); // đợi tab kịp load
  };

  async function toLogin({ password, userName }: { password: string; userName: string }, redirect = true) {
    if (loading) return;

    startLoading();

    try {
      const loginToken = await fetchLogin(userName, password);

      if (loginToken) {
        localStg.set('token', loginToken.result.accessToken);
        (localStg as any).set('userId', loginToken.result.userId);
        localStg.set('refreshToken', loginToken.result.refreshToken);

        dispatch(setToken(loginToken.result.accessToken));
        dispatch(setUserId(loginToken.result.userId));

        if (serviceUrl) {
          const res = await GetAllSystemWeb({
            MaxResultCount: 9999,
            SkipCount: 0
          })

          const resData = res?.data?.result as any;

          if (resData && resData.items) {
            const serviceHost = normalizeUrl(serviceUrl);

            const systemWebId = resData.items.find((item: any) =>
              normalizeUrl(item.systemUrl) === serviceHost
            )?.id;

            if (systemWebId) {
              const res = await PortalRedirect(systemWebId);
              const portalToken = res?.data?.result?.portalToken;

              const tab = openNewTab(serviceUrl);
              postMessageToTab(tab, portalToken, serviceUrl);

              localStorage.removeItem('serviceUrl');

              replace(globalConfig.homePath);

              return;
            }
          }
        }

        if (redirect) {
          if (redirectUrl) {
            replace(redirectUrl);
          } else {
            replace(globalConfig.homePath);
          }
        }

        // const { data: info, error: userInfoError } = await fetchGetUserInfo();

        // if (!userInfoError) {
        //   // 2. store user info
        //   localStg.set('userInfo', info);

        //   dispatch(setToken(loginToken.result.accessToken));
        //   dispatch(setUserInfo(info));

        //   if (redirect) {
        //     if (redirectUrl) {
        //       replace(redirectUrl);
        //     } else {
        //       replace(globalConfig.homePath);
        //     }
        //   }

        // }

        window.$notification?.success({
          description: t('page.login.common.welcomeBack'),
          message: t('page.login.common.loginSuccess')
        });
      }
    } catch (error) {
      console.log(error)
    } finally {
      endLoading();
    }

  }

  return {
    loading,
    toLogin
  };
}

export function useResetAuth() {
  const dispatch = useAppDispatch();

  const previousRoute = usePreviousRoute();

  const cacheTabs = useCacheTabs();

  const { navigate, push, resetRoutes } = useRouter();

  function resetAuth() {
    clearAuthStorage();

    dispatch(resetAuthAction());

    resetRoutes();

    cacheTabs();

    if (!previousRoute?.handle?.constant) {
      if (previousRoute?.fullPath) {
        push('/login', { redirect: previousRoute.fullPath }, null, true);
      } else {
        navigate('/login', { replace: true });
      }
    }
  }

  return resetAuth;
}
