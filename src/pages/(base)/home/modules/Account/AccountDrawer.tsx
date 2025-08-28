import { Drawer } from 'antd';
import React from 'react';
import UserInforForm from './UserInforForm';
import ChangePwForm from './ChangePwForm';

type Props = {
  onSuccess?: () => void;
  open?: boolean;
  setOpen?: any;
};

const AccountDrawer: React.FC<Props> = ({ onSuccess, open, setOpen }) => {

  return (
    <>
      <Drawer
        className='p-0'
        open={open}
        title="Thông tin tài khoản"
        width={480}
        styles={{
          body: {
            paddingBottom: 80
          }
        }}
        onClose={() => setOpen(false)}
      >
        <div className='flex flex-col gap-6'>
          <UserInforForm />
          <ChangePwForm />
        </div>
      </Drawer>
    </>
  );
};

export default AccountDrawer;
