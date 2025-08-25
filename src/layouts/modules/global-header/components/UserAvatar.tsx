import type { MenuProps } from 'antd';

import { selectToken, selectUserInfo } from '@/features/auth/authStore';
import { useRouter } from '@/features/router';
import { Icon } from '@iconify/react';

const UserAvatar = memo(() => {
  const token = useAppSelector(selectToken);

  const { t } = useTranslation();

  const userInfo = useAppSelector(selectUserInfo);

  const { navigate } = useRouter();

  function logout() {
    window?.$modal?.confirm({
      cancelText: t('common.cancel'),
      content: t('common.logoutConfirm'),
      okText: t('common.confirm'),
      onOk: () => {
        navigate('/login-out');
      },
      title: t('common.tip')
    });
  }

  function onClick({ key }: { key: string }) {
    if (key === '1') {
      logout();
    } else {
      navigate('/dashboard');
    }
  }

  function loginOrRegister() {
    navigate('/login');
  }

  const items: MenuProps['items'] = [
    {
      key: '0',
      label: (
        <div className="flex-center gap-8px">
          <Icon
            icon="solar:widget-5-linear"
            fontSize={18}
          />
          Tổng quan
        </div>
      )
    },
    {
      type: 'divider'
    },
    {
      key: '1',
      label: (
        <div className="flex-center gap-8px">
          <Icon
            icon="solar:logout-outline"
            fontSize={22}
          />
          {t('common.logout')}
        </div>
      )
    }
  ];

  return token ? (
    <ADropdown
      menu={{ items, onClick }}
      placement="bottomRight"
      trigger={['click']}
    >
      <div>
        <ButtonIcon className="px-12px">
          {/* <SvgIcon
            className="text-icon-large"
            icon="ph:user-circle"
          /> */}
          <img src="/src/assets/imgs/vnpt.webp" alt="vnpt" className="w-28px h-28px rounded-full border border-primary" />
          <span className="text-14px capitalize">Admin Xã Cần Đước</span>
        </ButtonIcon>
      </div>
    </ADropdown>
  ) : (
    <AButton onClick={loginOrRegister}>{t('page.login.common.loginOrRegister')}</AButton>
  );
});

export default UserAvatar;
