import { GetTenantById, GetUserById, UpdateTenant, UpdateUser } from '@/service/api';
import { isActiveOptions } from '@/utils/options';
import { Button, Col, Drawer, Form, Input, Row, Select, Tag, message } from 'antd';
import React, { useState } from 'react';

const { Option } = Select;

type Props = {
  id: number;
  onSuccess?: () => void;
  groupData: any[];
};

const UserUpdateForm: React.FC<Props> = ({ id, onSuccess, groupData }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detailData, setDetailData] = useState<any>();
  const [isEdit, setIsEdit] = useState(false);
  const [tenantData, setTenantData] = useState<any>('');

  const showDrawer = async () => {
    setOpen(true);
    setIsEdit(false);
    setLoadingDetail(true);

    try {
      const res = await GetUserById(id);
      const data = res.data?.result;

      console.log(data);

      form.setFieldsValue(data);
      setDetailData(data);
      setTenantData(data?.userName?.split(".")[0]);
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

      // await UpdateUser(dataSubmit);
      console.log(dataSubmit);

      message.success('Cập nhật người dùng thành công!');

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
                label="Tên người dùng"
                name="name"
                rules={[{ message: 'Vui lòng nhập tên người dùng', required: true }]}
              >
                {
                  !isEdit
                    ?
                    <div className='font-medium'>{detailData?.name}</div>
                    :
                    <Input placeholder="Nhập tên người dùng" size="middle" />
                }
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Đơn vị"
                name=""
                rules={[{ message: 'Vui lòng chọn đơn vị', required: true }]}
              >
                <Select placeholder="Chọn đơn vị" size="middle" loading={loading} allowClear value={tenantData} onChange={(value) => setTenantData(value)}>
                  {
                    !isEdit
                      ?
                      <div className='font-medium'>{groupData?.find((item: any) => item.tenancyName === tenantData)?.name}</div>
                      :
                      groupData.map((group) => (
                        <Option key={group.tenancyName} value={group.tenancyName}>
                          {group.name}
                        </Option>
                      ))
                  }
                </Select>
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

export default UserUpdateForm;
