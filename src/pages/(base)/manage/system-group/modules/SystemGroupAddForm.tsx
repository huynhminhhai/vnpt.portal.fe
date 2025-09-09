import { Button, Col, Drawer, Form, Input, Row, Select, Space, message } from 'antd';
import React, { useState } from 'react';

import { AddButton } from '@/components/button';
import { CreateSystemGroup } from '@/service/api';
import { isActiveOptions, tailwindColors } from '@/utils/options';
import ServicesItem from '@/pages/(base)/home/modules/Services/ServicesItem';

const { Option } = Select;
const { TextArea } = Input;

type Props = {
  onSuccess?: () => void;
  sortOrder: number
};

const SystemGroupAddForm: React.FC<Props> = ({ onSuccess, sortOrder }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("blue");

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
            isActive: true,
            color: selectedColor,
            sortOrder: sortOrder + 1
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
                name="isActive"
                rules={[{ message: 'Vui lòng chọn trạng thái', required: true }]}
              >
                <Select
                  placeholder="Vui lòng chọn trạng thái"
                  size="middle"
                >
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
            <Col span={24} hidden>
              <Form.Item
                label="Mô tả"
                name="description"
                rules={[{ message: 'Vui lòng nhập mô tả', required: false }]}
              >
                <TextArea rows={2} placeholder="Nhập mô tả nhóm" maxLength={255} size='middle' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Màu chủ đề"
                name="color"
                rules={[{ message: "Vui lòng chọn màu", required: true }]}
              >
                <Select
                  placeholder="Chọn màu"
                  size="middle"
                  onChange={(value) => setSelectedColor(value)}
                >
                  {tailwindColors.map((color) => (
                    <Option key={color} value={color}>
                      <div className="flex items-center gap-2">
                        <span className={`w-4 h-4 rounded-full bg-${color}-500`} />
                        <span className="capitalize">{color}</span>
                      </div>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Thứ tự hiển thị"
                name="sortOrder"
                rules={[{ required: false }]}
              >
                <Input type="number" placeholder="Nhập thứ tự" size="middle" disabled />
              </Form.Item>
            </Col>
            <Col span={24} className='mt-4'>
              <ServicesItem
                index={1}
                color={selectedColor}
                dataItem={
                  {
                    "systemCode": "lich hen",
                    "systemName": "Bắt số, đặt lịch online",
                    "systemDescription": "Lấy số thứ tự, đặt lịch hẹn online với các Trung tâm hành chính công tỉnh Tây Ninh để thực hiện thủ tục hành chính",
                    "systemUrl": "https://zalo.me/s/3493358192537809297",
                    "iconUrl": "https://photo-logo-mapps.zadn.vn/2eb14e96e8d3018d58c2.jpg",
                  }
                }
              />
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
