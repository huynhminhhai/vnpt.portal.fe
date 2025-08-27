import { GetSystemGroupById, UpdateSystemGroup } from '@/service/api';
import { formatDate } from '@/utils/date';
import { isActiveOptions } from '@/utils/options';
import { Button, Col, Drawer, Form, Input, Row, Select, Tag, message } from 'antd';
import React, { useState } from 'react';

const { Option } = Select;
const { TextArea } = Input;

type Props = {
  id: number;
  onSuccess?: () => void;
};

const SystemGroupUpdateForm: React.FC<Props> = ({ id, onSuccess }) => {
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
      const res = await GetSystemGroupById(id);
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

      await UpdateSystemGroup(dataSubmit);

      message.success('Cập nhật nhóm dịch vụ thành công!');

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
        title={!isEdit ? 'Chi tiết nhóm dịch vụ' : 'Cập nhật nhóm dịch vụ'}
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
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Tên nhóm"
                name="displayName"
                rules={[{ message: 'Vui lòng nhập tên nhóm', required: true }]}
              >
                {
                  !isEdit
                    ?
                    <div className='font-medium'>{detailData?.displayName}</div>
                    :
                    <Input
                      disabled={!isEdit}
                      placeholder="Nhập tên nhóm"
                      size="middle"
                    />
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
                    <div>{detailData?.isActive ? <Tag color="green">Hoạt động</Tag> : <Tag color="orange">Ngừng hoạt động</Tag>}</div>
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
            <Col span={24}>
              <Form.Item
                label="Mô tả"
                name="description"
                rules={[{ message: 'Vui lòng nhập mô tả', required: false }]}
              >
                {
                  !isEdit
                    ?
                    <div className='font-medium'>{detailData?.description || '-'}</div>
                    :
                    <TextArea rows={2} placeholder="Nhập mô tả nhóm" maxLength={255} size='middle' disabled={!isEdit} />
                }
              </Form.Item>
            </Col>
            {
              !isEdit && (
                <>
                  <Col span={12}>
                    <Form.Item
                      label="Ngày tạo"
                      name="creationTime"
                    >
                      <div className='font-medium'>{detailData?.creationTime && formatDate(detailData.creationTime)}</div>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Ngày chỉnh sửa"
                      name="lastModificationTime"
                    >
                      <div className='font-medium'>{detailData?.lastModificationTime ? formatDate(detailData.lastModificationTime) : '-'}</div>
                    </Form.Item>
                  </Col>
                </>
              )
            }
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
                      className="mt-4 w-full"
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

export default SystemGroupUpdateForm;
