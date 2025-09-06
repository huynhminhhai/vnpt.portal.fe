import { Button, Col, Drawer, Form, Input, Row, Select, Space, message } from 'antd';
import React, { useState } from 'react';

import { AddButton } from '@/components/button';
import { CreateSystemWeb } from '@/service/api';
import { isActiveOptions } from '@/utils/options';

const { Option } = Select;
const { TextArea } = Input;

type Props = {
  onSuccess?: () => void;
  groupData: any[]
};

const SystemAddForm: React.FC<Props> = ({ onSuccess, groupData }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const dataSubmit = { ...values };

      await CreateSystemWeb(dataSubmit);

      message.success('Thêm dịch vụ thành công!');

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
        title="Thêm mới dịch vụ"
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
            {/* Nhóm 1: Thông tin cơ bản */}
            <Col span={12}>
              <Form.Item
                label="Tên dịch vụ"
                name="systemName"
                rules={[{ message: 'Vui lòng nhập tên dịch vụ', required: true }]}
              >
                <Input.TextArea rows={2} placeholder="Nhập tên dịch vụ" size="middle" style={{ resize: 'none' }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Mã dịch vụ"
                name="systemCode"
                rules={[{ message: 'Vui lòng nhập mã dịch vụ', required: true }]}
              >
                <Input placeholder="Nhập mã dịch vụ (ví dụ: lichhen)" size="middle" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Loại dịch vụ"
                name="groupSystemId"
                rules={[{ message: 'Vui lòng chọn loại dịch vụ', required: true }]}
              >
                <Select placeholder="Chọn loại dịch vụ" size="middle" loading={loading} allowClear>
                  {groupData.map((group) => (
                    <Option key={group.id} value={group.id}>
                      {group.displayName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Đường dẫn dịch vụ"
                name="systemUrl"
                rules={[{ message: 'Vui lòng nhập đường dẫn dịch vụ', required: true }]}
              >
                <Input placeholder="Nhập đường dẫn dịch vụ" size="middle" />
              </Form.Item>
            </Col>

            {/* Nhóm 2: Hiển thị & mô tả */}
            <Col span={24}>
              <Form.Item
                label="Mô tả"
                name="systemDescription"
                rules={[{ message: 'Vui lòng nhập mô tả', required: false }]}
              >
                <TextArea rows={2} placeholder="Nhập mô tả dịch vụ" maxLength={255} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Đường dẫn logo"
                name="iconUrl"
                rules={[{ message: 'Vui lòng nhập đường dẫn logo', required: false }]}
              >
                <Input placeholder="Nhập đường dẫn logo" size="middle" />
              </Form.Item>
            </Col>

            {/* Nhóm 3: Cấu hình nâng cao */}

            <Col span={12}>
              <Form.Item
                label="Secret Key"
                name="secretKey"
                rules={[{ required: false }]}
              >
                <Input placeholder="Nhập secret key" size="middle" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Callback URL"
                name="callbackUrl"
                rules={[{ required: false }]}
              >
                <Input placeholder="Nhập callback URL" size="middle" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Thứ tự hiển thị"
                name="sortOrder"
                rules={[{ required: false }]}
              >
                <Input type="number" placeholder="Nhập thứ tự" size="middle" />
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

export default SystemAddForm;
