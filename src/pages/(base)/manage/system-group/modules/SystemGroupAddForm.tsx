import { Button, Col, Drawer, Form, Input, Row, Select, Space, message } from 'antd';
import React, { useState } from 'react';

import { AddButton } from '@/components/button';
import { CreateSystemGroup } from '@/service/api';

const { Option } = Select;
const { TextArea } = Input;

type Props = {
  onSuccess?: () => void;
};

const SystemGroupAddForm: React.FC<Props> = ({ onSuccess }) => {
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

      await CreateSystemGroup(dataSubmit);

      message.success('Thêm nhóm dịch vụ thành công!');

      form.resetFields();

      onSuccess?.();

      onClose();
    } catch (error) {
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
        title="Thêm mới nhóm dịch vụ"
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
            status: 1
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Tên nhóm"
                name="displayName"
                rules={[{ message: 'Vui lòng nhập tên nhóm', required: true }]}
              >
                <Input
                  placeholder="Nhập tên nhóm"
                  size="middle"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Trạng thái"
                name="status"
                rules={[{ message: 'Vui lòng chọn trạng thái', required: true }]}
              >
                <Select
                  placeholder="Vui lòng chọn trạng thái"
                  size="middle"
                >
                  <Option value={1}>Hoạt động</Option>
                  <Option value={2}>Ngừng hoạt động</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Mô tả"
                name="description"
                rules={[{ message: 'Vui lòng nhập mô tả', required: false }]}
              >
                <TextArea rows={2} placeholder="Nhập mô tả nhóm" maxLength={255} size='middle' />
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

export default SystemGroupAddForm;
