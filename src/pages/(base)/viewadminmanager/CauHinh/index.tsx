import { ReloadOutlined, SaveOutlined } from '@ant-design/icons';
import { App, Button, Card, Col, Divider, Form, Input, InputNumber, Row, Space, Spin, Switch } from 'antd';
import React, { useEffect, useState } from 'react';

import { getTblConfig, updateTblConfig } from '@/service/api/Tblconfig';

interface ConfigData {
  applyOnlinePayment?: boolean;
  autoCreateKyHoaHon: boolean;
  autoInvoice: boolean;
  businessService: string;
  gtgt: number;
  id: number;
  idDiemBan: string;
  idDoiTac: string;
  invoiceAdminPassword: string;
  invoiceAdminUsername: string;
  invoicePasswordService: string;
  invoiceUsernameService: string;
  keyApiVnptMoney: string;
  maDoiTac: string;
  portalService: string;
  publishKeyApiSanbox: string;
  publishService: string;
  qrCodeExpireTime: number;
  secretKeyMerchant: string;
  tenDoiTac: string;
  urlApi: string;
}

const TblConfig: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [initialValues, setInitialValues] = useState<ConfigData | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const { message } = App.useApp();
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    loadConfigData();
  }, []);

  const checkForChanges = () => {
    if (!initialValues) return;

    const currentValues = form.getFieldsValue();
    const hasFormChanges = Object.keys(initialValues).some(key => {
      const initialValue = initialValues[key as keyof ConfigData];
      const currentValue = currentValues[key as keyof ConfigData];
      return initialValue !== currentValue;
    });

    setHasChanges(hasFormChanges);
  };

  const loadConfigData = async () => {
    setLoading(true);

    try {
      const res = await getTblConfig();
      const resData = res.data as any;

      if (resData && resData.result) {
        const data = resData.result;
        setInitialValues(data);
        form.setFieldsValue(data);
      } else {
        // eslint-disable-next-line no-console
        console.warn('API response format không đúng, sử dụng fallback data');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      message.error('Không thể tải dữ liệu cấu hình');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (values: ConfigData) => {
    setSaving(true);
    try {
      const res = await updateTblConfig({ ...values, id: initialValues?.id || 0 });
      if (res.data.success) {
        message.success('Cập nhật cấu hình thành công!');
        setHasChanges(false);
        loadConfigData();
      } else {
        message.error(res.data.error.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      message.error('Có lỗi xảy ra khi cập nhật cấu hình');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    form.resetFields();
    loadConfigData();
  };

  return (
    <Card
      extra={
        <Space>
          <Button
            disabled={loading}
            icon={<ReloadOutlined />}
            onClick={handleReset}
          >
            Làm mới
          </Button>
          <Button
            disabled={!hasChanges}
            icon={<SaveOutlined />}
            loading={saving}
            type="primary"
            onClick={() => form.submit()}
          >
            Lưu cấu hình
          </Button>
        </Space>
      }
    >
      <Spin spinning={loading}>
        <Form
          form={form}
          initialValues={initialValues || {}}
          layout="vertical"
          onFinish={handleSave}
          onValuesChange={checkForChanges}
        >
          {/* API Configuration */}
          <Divider
            orientation="left"
            style={{ marginTop: 0 }}
          >
            Cấu hình API Thanh toán online
          </Divider>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                label="Key API VNPT Money"
                name="keyApiVnptMoney"
              >
                <Input.Password placeholder="Nhập Key API VNPT Money" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Publish Key API Sandbox"
                name="publishKeyApiSanbox"
              >
                <Input.Password placeholder="Nhập Publish Key API Sandbox" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                label="URL API"
                name="urlApi"
              >
                <Input placeholder="https://api.vnpt.com.vn" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Secret Key Merchant"
                name="secretKeyMerchant"
              >
                <Input.Password placeholder="Nhập Secret Key Merchant" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Thời gian hết hạn QR Code (Ngày)"
                name="qrCodeExpireTime"
              >
                <InputNumber
                  max={3600}
                  min={1}
                  placeholder="300"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="ID Điểm bán"
                name="idDiemBan"
              >
                <Input placeholder="DB001" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="ID Đối tác"
                name="idDoiTac"
              >
                <Input placeholder="DT001" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Mã Đối tác"
                name="maDoiTac"
              >
                <Input placeholder="MADT001" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Tên Đối tác"
                name="tenDoiTac"
              >
                <Input placeholder="Công ty TNHH ABC" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="GTGT (%)"
                name="gtgt"
              >
                <InputNumber
                  formatter={value => `${value}%`}
                  max={100}
                  min={0}
                  placeholder="10.0"
                  step={0.1}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            {/* <Col span={8}>
                            <Form.Item
                                label="Áp dụng thanh toán online"
                                name="applyOnlinePayment"
                                valuePropName="checked"
                            >
                                <Switch />
                            </Form.Item>
                        </Col> */}
          </Row>

          {/* Invoice Configuration */}
          <Divider
            orientation="left"
            style={{ marginTop: 0 }}
          >
            Cấu hình Hóa đơn
          </Divider>
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item
                label="Publish Service"
                name="publishService"
              >
                <Input placeholder="https://publish.service.vn" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Portal Service"
                name="portalService"
              >
                <Input placeholder="https://portal.service.vn" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Business Service"
                name="businessService"
              >
                <Input placeholder="https://business.service.vn" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item
                label="Username Admin Hóa đơn"
                name="invoiceAdminUsername"
              >
                <Input placeholder="admin_invoice" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Password Admin Hóa đơn"
                name="invoiceAdminPassword"
              >
                <Input.Password placeholder="Nhập password" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Username Service Hóa đơn"
                name="invoiceUsernameService"
              >
                <Input placeholder="service_user" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Password Service Hóa đơn"
                name="invoicePasswordService"
              >
                <Input.Password placeholder="Nhập password" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Tự động tạo hóa đơn"
                name="autoInvoice"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Tự động tạo ký hóa đơn"
                name="autoCreateKyHoaHon"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>
          <Row
            gutter={0}
            justify="end"
          >
            <Col />
          </Row>
        </Form>
      </Spin>
    </Card>
  );
};

export default TblConfig;
