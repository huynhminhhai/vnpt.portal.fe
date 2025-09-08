import { Button, Col, Drawer, Form, Input, Row, Select, message } from 'antd';
import React, { useState } from 'react';

import { AddButton } from '@/components/button';
import { CreateTenant } from '@/service/api';
import { isActiveOptions } from '@/utils/options';

const { Option } = Select;

type Props = {
  onSuccess?: () => void;
};

const CopyPermission: React.FC<Props> = ({ onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ButtonIcon className="px-2" icon="solar:copy-line-duotone" tooltipContent="Sao chép quyền" onClick={showDrawer} />
      <Drawer
        className='p-0'
        open={open}
        title="Sao chép quyền"
        width={480}
        styles={{
          body: {
            paddingBottom: 80
          }
        }}
        onClose={onClose}
      >

        <div className='absolute bottom-0 left-0 p-3 shadow-md w-full border-t-[1px] bg-white'>
          <Button
            className="w-full"
            loading={loading}
            size="middle"
            type="primary"
          >
            Lưu lại
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default CopyPermission;
