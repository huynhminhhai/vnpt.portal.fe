import { Button, Col, Drawer, Form, Input, Row, Select, message } from 'antd';
import React, { useState } from 'react';

import { AddButton } from '@/components/button';
import { CreateUser } from '@/service/api';
import { isActiveOptions } from '@/utils/options';
import { Icon } from '@iconify/react';

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
  const [password, setPassword] = useState<string>('');


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
        roleNames: null,
        emailAddress: values?.emailAddress || values?.userName + '@gmail.com',
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

  const requirements = [
    {
      text: "Ít nhất 8 ký tự",
      met: password.length >= 8,
    },
    {
      text: "Chứa ít nhất một chữ hoa",
      met: /[A-Z]/.test(password),
    },
    {
      text: "Chứa ít nhất một chữ thường",
      met: /[a-z]/.test(password),
    },
    {
      text: "Chứa ít nhất một số",
      met: /\d/.test(password),
    },
    {
      text: "Chứa ít nhất một ký tự đặc biệt",
      met: /[@$!%*?&#]/.test(password),
    },
  ];

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
                label="Email"
                name="emailAddress"
                rules={[{ required: false }]}
              >
                <Input placeholder="Nhập email" size="middle" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Số điện thoại"
                name="phoneNumber"
                rules={[{ required: false }]}
              >
                <Input placeholder="Nhập số điện thoại" size="middle" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Đơn vị"
                name="tenantId"
                rules={[{ message: 'Vui lòng chọn đơn vị', required: true }]}
              >
                <Select placeholder="Chọn đơn vị" size="middle" loading={loading} allowClear
                  onChange={(_, option) =>
                    setTenantData((option as any)?.key)
                  }
                >
                  {groupData.map((group) => (
                    <Option key={group.tenancyName} value={group.id}>
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
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu" },
                  {
                    pattern:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                    message:
                      "Mật khẩu sai định dạng",
                  },
                ]}
              >
                <Input placeholder="Nhập mật khẩu" size="middle" onChange={(e) => setPassword(e.target.value)} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Trạng thái"
                name="isActive"
                rules={[{ message: 'Vui lòng chọn trạng thái', required: false }]}
              >
                <Select placeholder="Chọn trạng thái" size="middle">
                  {isActiveOptions
                    .filter((item: any) => !item.type)
                    .map((item: any) => (
                      <Option key={item.key.toString()} value={item.key}>
                        {item.label}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <div>
                <b>Yêu cầu mật khẩu:</b>
                <ul>
                  {requirements.map((req, index) => (
                    <li
                      key={index}
                      className='flex items-center'
                    >
                      {req.met ? (
                        <Icon
                          icon="solar:unread-line-duotone"
                          style={{ color: "green", marginRight: "8px" }}
                        />
                      ) : (
                        <Icon icon="iconamoon:close-light" style={{ color: "red", marginRight: "8px" }} />
                      )}
                      <div style={{ color: req.met ? "green" : "inherit" }}>
                        {req.text}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
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
      </Drawer >
    </>
  );
};

export default UserAddForm;
