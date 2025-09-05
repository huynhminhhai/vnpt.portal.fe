import { GetTenantById, UpdateTenant } from '@/service/api';
import { isActiveOptions } from '@/utils/options';
import { Button, Col, Drawer, Form, Input, Row, Select, Tag, message } from 'antd';
import React, { useState } from 'react';

const { Option } = Select;

type Props = {
  id: number;
  onSuccess?: () => void;
};

const TenantUpdateForm: React.FC<Props> = ({ id, onSuccess }) => {
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
      const res = await GetTenantById(id);
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
      const dataSubmit = { ...detailData, ...values, displayName: values?.displayName || values?.name };

      await UpdateTenant(dataSubmit);

      message.success('Cập nhật đơn vị thành công!');

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
      <DetailButton onClick={showDrawer} />
      <Drawer
        open={open}
        title={!isEdit ? 'Chi tiết đơn vị' : 'Cập nhật đơn vị'}
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
            <Col span={12}>
              <Form.Item
                label="Tên đơn vị"
                name="name"
                rules={[{ message: 'Vui lòng nhập tên đơn vị', required: true }]}
              >
                {
                  !isEdit
                    ?
                    <div className='font-medium'>{detailData?.name}</div>
                    :
                    <Input placeholder="Nhập tên đơn vị" size="middle" disabled={!isEdit} />
                }
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Mã đơn vị"
                name="tenancyName"
                rules={[{ message: 'Vui lòng nhập mã đơn vị', required: true }]}
              >
                {
                  !isEdit
                    ?
                    <div className='font-medium'>{detailData?.tenancyName}</div>
                    :
                    <Input placeholder="Nhập mã đơn vị (ví dụ: lichhen)" size="middle" disabled={!isEdit} />
                }
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Tiêu đề header"
                name="title"
                rules={[{ message: 'Vui lòng nhập tiêu đề header', required: true }]}
              >
                {
                  !isEdit
                    ?
                    <div className='font-medium'>{detailData?.title}</div>
                    :
                    <Input placeholder="Nhập tiêu đề header" size="middle" />
                }
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Tiêu đề banner"
                name="displayName"
                rules={[{ message: 'Vui lòng nhập tiêu đề banner', required: false }]}
                help="✻ Nếu không nhập, hệ thống sẽ tự động dùng tên đơn vị."
              >
                {
                  !isEdit
                    ?
                    <div className='font-medium'>{detailData?.displayName}</div>
                    :
                    <Input placeholder="Nhập tiêu đề banner" size="middle" />
                }
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Nội dung banner"
                name="description"
                rules={[{ message: 'Vui lòng nhập nội dung banner', required: true }]}
              >
                {
                  !isEdit
                    ?
                    <div className='font-medium'>{detailData?.description}</div>
                    :
                    <Input.TextArea rows={3} maxLength={255} placeholder="Nhập nội dung banner" size="middle" />
                }
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Trạng thái"
                name="isActive"
                rules={[{ message: 'Vui lòng chọn trạng thái', required: true }]}
              >
                {
                  !isEdit
                    ?
                    <div>{detailData?.isActive === true ? <Tag color="green">Hoạt động</Tag> : <Tag color="orange">Ngừng hoạt động</Tag>}</div>
                    :
                    <Select
                      disabled={!isEdit}
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

export default TenantUpdateForm;
