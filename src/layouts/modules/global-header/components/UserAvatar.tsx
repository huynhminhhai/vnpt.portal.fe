import type { MenuProps } from 'antd';

import { isStaticSuper, selectToken, selectUserInfo } from '@/features/auth/authStore';
import { useRouter } from '@/features/router';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import AccountDrawer from '@/pages/(base)/home/modules/Account/AccountDrawer';
import vnpt from '@/assets/imgs/vnpt.webp';

const UserAvatar = memo(() => {
  const token = useAppSelector(selectToken);

  const { t } = useTranslation();

  const { user } = useAppSelector(selectUserInfo);
  const isSuper = useSelector(isStaticSuper);

  const { navigate } = useRouter();

  const [open, setOpen] = useState(false);

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
    } else if (key === '2') {
      setOpen(true);
    }
    else {
      navigate('/dashboard');
    }
  }

  function loginOrRegister() {
    navigate('/login');
  }

  const items: MenuProps['items'] = [
    {
      key: '2',
      label: (
        <div className="flex-center gap-8px">
          <Icon icon="solar:user-linear" fontSize={16} />
          Tài khoản
        </div>
      ),
    },
    { type: 'divider' as const },
    ...(isSuper
      ? [
        {
          key: '0',
          label: (
            <div className="flex-center gap-8px">
              <Icon icon="solar:widget-5-linear" fontSize={14} />
              Tổng quan
            </div>
          ),
        },
        { type: 'divider' as const },
      ]
      : []),
    {
      key: '1',
      label: (
        <div className="flex-center gap-8px">
          <Icon icon="mynaui:logout" fontSize={16} />
          {t('common.logout')}
        </div>
      ),
    },
  ];

  return token ? (
    <>
      <ADropdown
        menu={{ items, onClick }}
        placement="bottomRight"
        trigger={['click']}
      >
        <div>
          <ButtonIcon className="px-12px">
            <img src={vnpt} alt="vnpt" className="w-28px h-28px rounded-full border border-primary" />
            <span className="text-15px text-primary font-medium capitalize">{user?.name}</span>
          </ButtonIcon>
        </div>
      </ADropdown>

      <AccountDrawer open={open} setOpen={setOpen} />
    </>
  ) : (
    <AButton onClick={loginOrRegister}>{t('page.login.common.loginOrRegister')}</AButton>
  );
});

export default UserAvatar;
