import { Button, Col, Drawer, Form, Input, Row, Select, message } from 'antd';
import React, { useState } from 'react';

import { AddButton } from '@/components/button';
import { CreateTenant } from '@/service/api';

const { Option } = Select;

type Props = {
  onSuccess?: () => void;
};

const TenantAddForm: React.FC<Props> = ({ onSuccess }) => {
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
      const dataSubmit = { ...values, adminEmailAddress: values?.tenancyName + '@gmail.com' };

      await CreateTenant(dataSubmit);

      message.success('Thêm đơn vị thành công!');

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
        title="Thêm mới đơn vị"
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
                label="Tên đơn vị"
                name="name"
                rules={[{ message: 'Vui lòng nhập tên đơn vị', required: true }]}
              >
                <Input placeholder="Nhập tên đơn vị" size="middle" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Mã đơn vị"
                name="tenancyName"
                rules={[{ message: 'Vui lòng nhập mã đơn vị', required: true }]}
              >
                <Input placeholder="Nhập mã đơn vị" size="middle" />
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

export default TenantAddForm;
