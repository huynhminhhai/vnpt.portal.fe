import { Button, Col, Drawer, Form, Input, Row, Select, Space, message } from 'antd';
import React, { useState } from 'react';

import { AddButton } from '@/components/button';
import UploadImage from '@/components/form/UploadImage';

const { Option } = Select;
const { TextArea } = Input;

type Props = {
  onSuccess?: () => void;
};

const ServiceAddForm: React.FC<Props> = ({ onSuccess }) => {
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

      // await CreateGoiSudung(dataSubmit);
      console.log(dataSubmit)

      message.success('Thêm dịch vụ thành công!');

      // form.resetFields();

      // onSuccess?.();

      // onClose();
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
        width={580}
        extra={
          <Space>
            <Button
              size="middle"
              onClick={onClose}
            >
              Đóng
            </Button>
          </Space>
        }
        styles={{
          body: {
            paddingBottom: 80
          }
        }}
        onClose={onClose}
      >
        <Form
          hideRequiredMark
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Tên dịch vụ"
                name="tenDichVu"
                rules={[{ message: 'Vui lòng nhập tên dịch vụ', required: true }]}
              >
                <Input
                  placeholder="Nhập tên dịch vụ"
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Loại dịch vụ"
                name="loaiDichVu"
                rules={[{ message: 'Vui lòng nhập đường dẫn dịch vụ', required: true }]}
              >
                <Select
                  placeholder="Vui lòng chọn trạng thái"
                  size="large"
                >
                  <Option value='1'>Y tế</Option>
                  <Option value='2'>Giáo dục</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Đường dẫn dịch vụ"
                name="duongDan"
                rules={[{ message: 'Vui lòng nhập đường dẫn dịch vụ', required: true }]}
              >
                <Input
                  placeholder="Nhập đường dẫn dịch vụ"
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Mô tả"
                name="moTa"
                rules={[{ message: 'Vui lòng nhập mô tả', required: true }]}
              >
                <TextArea rows={4} placeholder="Nhập mô tả dịch vụ" maxLength={6} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Đường dẫn logo"
                name="duongDanLogo"
                rules={[{ message: 'Vui lòng nhập đường dẫn logo', required: false }]}
              >
                <Input
                  placeholder="Nhập đường dẫn logo"
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>
          <div className='absolute bottom-0 left-0 p-3 shadow-md w-full border-t-[1px] bg-white'>
            <Button
              className="w-full"
              htmlType="submit"
              loading={loading}
              size="large"
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

export default ServiceAddForm;
