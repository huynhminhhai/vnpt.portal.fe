import { Button, Col, Drawer, Form, Input, Row, Select, message } from 'antd';
import React, { useState } from 'react';

import { AddButton } from '@/components/button';
import { CreateTenant } from '@/service/api';
import { isActiveOptions } from '@/utils/options';

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
      const dataSubmit = {
        ...values,
        adminEmailAddress: values?.tenancyName + '@gmail.com',
        displayName: values?.displayName || values?.name
      };

      await CreateTenant(dataSubmit);

      message.success('Thêm đơn vị thành công!');

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
            title: 'Cổng chuyển đổi số cấp xã tỉnh Tây Ninh',
            description: 'Nơi bạn có thể quản lý và sử dụng các giải pháp chuyển đổi số được thiết kế chuyên biệt cho địa phương của mình.'
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

            <Col span={24}>
              <Form.Item
                label="Tiêu đề header"
                name="title"
                rules={[{ message: 'Vui lòng nhập tiêu đề header', required: true }]}
              >
                <Input placeholder="Nhập tiêu đề header" size="middle" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Tiêu đề banner"
                name="displayName"
                rules={[{ message: 'Vui lòng nhập tiêu đề banner', required: false }]}
                help="✻ Nếu không nhập, hệ thống sẽ tự động dùng tên đơn vị."
              >
                <Input placeholder="Nhập tiêu đề banner" size="middle" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Nội dung banner"
                name="description"
                rules={[{ message: 'Vui lòng nhập nội dung banner', required: true }]}
              >
                <Input.TextArea rows={3} maxLength={255} placeholder="Nhập nội dung banner" size="middle" />
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

export default TenantAddForm;
