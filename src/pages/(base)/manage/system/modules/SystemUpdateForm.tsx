import { GetSystemWebById, UpdateSystemWeb } from '@/service/api';
import { Button, Col, Drawer, Form, Input, Row, Select, Space, Tag, message } from 'antd';
import React, { useState } from 'react';

const { Option } = Select;
const { TextArea } = Input;

type Props = {
  id: number;
  onSuccess?: () => void;
  groupData: any[];
};

const SystemUpdateForm: React.FC<Props> = ({ id, onSuccess, groupData }) => {
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
      const res = await GetSystemWebById(id);
      const data = res.data?.result;

      form.setFieldsValue(data);
      setDetailData(data);
    } catch (error) {
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

      await UpdateSystemWeb(dataSubmit);

      message.success('Cập nhật dịch vụ thành công!');

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
        title={!isEdit ? 'Chi tiết dịch vụ' : 'Cập nhật dịch vụ'}
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
        >
          <Row gutter={16} className='pb-4'>
            {/* Nhóm 1: Thông tin cơ bản */}
            <Col span={12}>
              <Form.Item
                label="Tên dịch vụ"
                name="systemName"
                rules={[{ message: 'Vui lòng nhập tên dịch vụ', required: true }]}
              >
                {
                  !isEdit
                    ?
                    <div className='font-medium'>{detailData?.systemName}</div>
                    :
                    <Input placeholder="Nhập tên dịch vụ" size="middle" disabled={!isEdit} />
                }
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Mã dịch vụ"
                name="systemCode"
                rules={[{ message: 'Vui lòng nhập mã dịch vụ', required: true }]}
              >
                {
                  !isEdit
                    ?
                    <div className='font-medium'>{detailData?.systemCode}</div>
                    :
                    <Input placeholder="Nhập mã dịch vụ (ví dụ: lichhen)" size="middle" disabled={!isEdit} />
                }
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Loại dịch vụ"
                name="groupSystemId"
                rules={[{ message: 'Vui lòng chọn loại dịch vụ', required: true }]}
              >
                {
                  !isEdit
                    ?
                    <div className='font-medium'>{groupData.find(g => g.id === detailData?.groupSystemId)?.displayName || "-"}</div>
                    :
                  <Select placeholder="Chọn loại dịch vụ" size="middle" loading={loading} allowClear>
                    {groupData.map((group) => (
                      <Option key={group.id} value={group.id}>
                        {group.displayName}
                      </Option>
                    ))}
                  </Select>
                }
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Đường dẫn dịch vụ"
                name="systemUrl"
                rules={[{ message: 'Vui lòng nhập đường dẫn dịch vụ', required: true }]}
              >
                {
                  !isEdit
                    ?
                    <div className='font-medium'>{detailData?.systemUrl || '-'}</div>
                    :
                    <Input placeholder="Nhập đường dẫn dịch vụ" size="middle" disabled={!isEdit} />
                }
              </Form.Item>
            </Col>

            {/* Nhóm 2: Hiển thị & mô tả */}
            <Col span={24}>
              <Form.Item
                label="Mô tả"
                name="systemDescription"
                rules={[{ message: 'Vui lòng nhập mô tả', required: false }]}
              >
                {
                  !isEdit
                    ?
                    <div className='font-medium'>{detailData?.description || '-'}</div>
                    :
                    <TextArea rows={2} placeholder="Nhập mô dịch vụ" maxLength={255} size='middle' disabled={!isEdit} />
                }
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Đường dẫn logo"
                name="iconUrl"
                rules={[{ message: 'Vui lòng nhập đường dẫn logo', required: false }]}
              >
                {
                  !isEdit
                    ?
                    <div className='font-medium'>{detailData?.iconUrl || '-'}</div>
                    :
                    <Input placeholder="Nhập đường dẫn logo" size="middle" disabled={!isEdit} />
                }
              </Form.Item>
            </Col>

            {/* Nhóm 3: Cấu hình nâng cao */}

            {/* <Col span={12}>
              <Form.Item
                label="Secret Key"
                name="secretKey"
                rules={[{ required: false }]}
              >
                {
                  !isEdit
                    ?
                    <div className='font-medium'>{detailData?.secretKey || '-'}</div>
                    :
                    <Input placeholder="Nhập secret key" size="middle" disabled={!isEdit} />
                }
              </Form.Item>
            </Col> */}

            {/* <Col span={12}>
              <Form.Item
                label="Callback URL"
                name="callbackUrl"
                rules={[{ required: false }]}
              >
                {
                  !isEdit
                    ?
                    <div className='font-medium'>{detailData?.callbackUrl || '-'}</div>
                    :
                    <Input placeholder="Nhập callback URL" size="middle" disabled={!isEdit} />
                }
              </Form.Item>
            </Col> */}

            <Col span={12}>
              <Form.Item
                label="Thứ tự hiển thị"
                name="sortOrder"
                rules={[{ required: false }]}
              >
                {
                  !isEdit
                    ?
                    <div className='font-medium'>{detailData?.sortOrder || '-'}</div>
                    :
                    <Input type="number" placeholder="Nhập thứ tự" size="middle" disabled={!isEdit} />
                }
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Trạng thái"
                name="systemStatus"
                rules={[{ message: 'Vui lòng chọn trạng thái', required: true }]}
              >
                {
                  !isEdit
                    ?
                    <div>{detailData?.systemStatus === 1 ? <Tag color="green">Hoạt động</Tag> : <Tag color="orange">Ngừng hoạt động</Tag>}</div>
                    :
                    <Select
                      disabled={!isEdit}
                      placeholder="Vui lòng chọn trạng thái"
                      size="middle"
                    >
                      <Option value={1}>Hoạt động</Option>
                      <Option value={2}>Ngừng hoạt động</Option>
                    </Select>
                }
              </Form.Item>
            </Col>
          </Row>
          <div className='absolute bottom-0 left-0 p-3 shadow-md w-full border-t-[1px] bg-white'>
            <Row gutter={16}>
              <Col span={24}>
                {isEdit ? (
                  <>
                    <Button
                      className="w-full"
                      htmlType="submit"
                      loading={loading || loadingDetail}
                      size="middle"
                      type="primary"
                    >
                      Lưu lại
                    </Button>
                    <Button
                      className="mt-2 w-full"
                      size="middle"
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
                    className="w-full"
                    size="middle"
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
          </div>
        </Form>
      </Drawer>
    </>
  );
};

export default SystemUpdateForm;
