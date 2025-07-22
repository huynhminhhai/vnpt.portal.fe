import { Button, Col, Drawer, Form, Input, InputNumber, Row, Select, Space, message } from 'antd';
import React, { useState } from 'react';

import { GetGoiSuDung, UpdateGoiSudung } from '@/service/api';

const { Option } = Select;

type Props = {
  id: number;
  onSuccess?: () => void;
};

const GoiSuDungUpdateForm: React.FC<Props> = ({ id, onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detailData, setDetailData] = useState<any>();
  const [isEdit, setIsEdit] = useState(false);

  const showDrawer = async () => {
    setOpen(true);
    setIsEdit(false);
    setLoadingDetail(true);

    try {
      const res = await GetGoiSuDung(id); // gọi API chi tiết
      const data = res.data?.result;

      form.setFieldsValue(data);
      setDetailData(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      message.error(error as string);
    } finally {
      setLoadingDetail(false);
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const dataSubmit = { ...detailData, ...values };

      await UpdateGoiSudung(dataSubmit);

      message.success('Cập nhật gói đăng ký thành công!');

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
      <DetailButton onClick={showDrawer} />
      <Drawer
        open={open}
        title={!isEdit ? 'Chi tiết gói đăng ký' : 'Cập nhật gói đăng ký'}
        width={480}
        extra={
          <Space>
            <Button
              size="large"
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
                label="Tên gói"
                name="tenGoi"
                rules={[{ message: 'Vui lòng nhập tên gói', required: true }]}
              >
                <Input
                  disabled={!isEdit}
                  placeholder="Ví dụ: 1Nam"
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Tên hiển thị"
                name="tenHienThi"
                rules={[{ message: 'Vui lòng nhập tên hiển thị', required: true }]}
              >
                <Input
                  disabled={!isEdit}
                  placeholder="Ví dụ: 1 Năm"
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Chu kỳ"
                name="chuKy"
                rules={[{ message: 'Vui lòng nhập chu kỳ', required: true }]}
              >
                <Input
                  disabled={!isEdit}
                  placeholder="Ví dụ: 12"
                  size="large"
                  type="number"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Số tháng"
                name="soThang"
                rules={[{ message: 'Vui lòng nhập số tháng', required: true }]}
              >
                <InputNumber
                  controls={false}
                  disabled={!isEdit}
                  min={1}
                  placeholder="Ví dụ: 12"
                  size="large"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Giá tiền"
                name="giaTien"
                rules={[{ message: 'Vui lòng nhập giá tiền', required: true }]}
              >
                <InputNumber
                  controls={false}
                  disabled={!isEdit}
                  min={1}
                  placeholder="Ví dụ: 199000"
                  size="large"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Trạng thái hoạt động"
                name="trangThaiHoatDong"
                rules={[{ message: 'Vui lòng chọn trại thái', required: true }]}
              >
                <Select
                  disabled={!isEdit}
                  placeholder="Vui lòng chọn trạng thái"
                  size="large"
                >
                  <Option value={true}>Hoạt động</Option>
                  <Option value={false}>Không hoạt động</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              {isEdit ? (
                <>
                  <Button
                    className="mt-4 w-full"
                    htmlType="submit"
                    loading={loading || loadingDetail}
                    size="large"
                    type="primary"
                  >
                    Lưu lại
                  </Button>
                  <Button
                    className="mt-4 w-full"
                    size="large"
                    type="default"
                    onClick={e => {
                      e.preventDefault();
                      setIsEdit(false);
                    }}
                  >
                    Chế độ xem
                  </Button>
                </>
              ) : (
                <Button
                  className="mt-4 w-full"
                  size="large"
                  type="default"
                  onClick={e => {
                    e.preventDefault();
                    setIsEdit(true);
                  }}
                >
                  Chỉnh sửa
                </Button>
              )}
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default GoiSuDungUpdateForm;
