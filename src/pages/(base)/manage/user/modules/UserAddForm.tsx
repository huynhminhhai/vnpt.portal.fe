import { Button, Col, Drawer, Form, Input, Row, Select, message } from 'antd';
import React, { useState } from 'react';

import { AddButton } from '@/components/button';
import { CreateUser } from '@/service/api';

const { Option } = Select;

type Props = {
  onSuccess?: () => void;
  groupData: any[];
};

const UserAddForm: React.FC<Props> = ({ onSuccess, groupData }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [tenantData, setTenantData] = useState<any>('');

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const dataSubmit = {
        ...values,
        userName: tenantData + '.' + values?.userName,
        surname: '',
        emailAddress: values?.userName + '@gmail.com',
        roleNames: null,
      };

      await CreateUser(dataSubmit);

      message.success('Thêm người dùng thành công!');

      form.resetFields();

      onSuccess?.();

      onClose();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      message.error(error as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AddButton onClick={showDrawer} />
      <Drawer
        className='p-0'
        open={open}
        title="Thêm mới người dùng"
        width={480}
        styles={{
          body: {
            paddingBottom: 80
          }
        }}
        onClose={onClose}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            isActive: true,
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Tên người dùng"
                name="name"
                rules={[{ message: 'Vui lòng nhập tên người dùng', required: true }]}
              >
                <Input placeholder="Nhập tên người dùng" size="middle" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Đơn vị"
                name=""
                rules={[{ message: 'Vui lòng chọn đơn vị', required: true }]}
              >
                <Select placeholder="Chọn đơn vị" size="middle" loading={loading} allowClear onChange={(value) => setTenantData(value)}>
                  {groupData.map((group) => (
                    <Option key={group.tenancyName} value={group.tenancyName}>
                      {group.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Tên đăng nhập"
                name="userName"
                rules={[{ message: 'Vui lòng nhập tên đăng nhập', required: true }]}
              >
                <Input addonBefore={tenantData + '.'} placeholder="Nhập tên đăng nhập" size="middle" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ message: 'Vui lòng nhập mật khẩu', required: true }]}
              >
                <Input placeholder="Nhập mật khẩu" size="middle" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Trạng thái"
                name="isActive"
                rules={[{ message: 'Vui lòng chọn trạng thái', required: false }]}
              >
                <Select placeholder="Chọn trạng thái" size="middle">
                  <Option value={true}>Hoạt động</Option>
                  <Option value={false}>Ngừng hoạt động</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <div className='absolute bottom-0 left-0 p-3 shadow-md w-full border-t-[1px] bg-white'>
            <Button
              className="w-full"
              htmlType="submit"
              loading={loading}
              size="middle"
              type="primary"
            >
              Lưu lại
            </Button>
          </div>
        </Form>
      </Drawer>
    </>
  );
};

export default UserAddForm;
