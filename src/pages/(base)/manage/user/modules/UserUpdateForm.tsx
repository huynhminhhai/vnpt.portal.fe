import { GetTenantById, GetUserById, UpdateTenant, UpdateUser } from '@/service/api';
import { formatDate } from '@/utils/date';
import { isActiveOptions } from '@/utils/options';
import { Icon } from '@iconify/react';
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
  const [password, setPassword] = useState<string>('');
  const [oldPassword, setOldPassword] = useState<string>('');

  const showDrawer = async () => {
    setOpen(true);
    setIsEdit(false);
    setLoadingDetail(true);

    try {
      const res = await GetUserById(id);
      const data = res.data?.result;

      const customData = {
        ...data,
        password: '',
        userName: data?.userName?.split(".")[1]
      }

      form.setFieldsValue(customData);

      setDetailData(customData);
      setTenantData(data?.userName?.split(".")[0]);
      setOldPassword(data?.password);
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

      const customData = {
        ...dataSubmit,
        password: values.password || oldPassword,
        userName: tenantData + '.' + values?.userName
      }

      await UpdateUser(customData);

      message.success('Cập nhật người dùng thành công!');

      setPassword('');

      onSuccess?.();

      onClose();
    } catch (error) {
      console.log(error);
      message.error(error as string);
    } finally {
      setLoading(false);
    }
  };

  const requirements = [
    {
      text: "Ít nhất 8 ký tự",
      met: password.length >= 8,
    },
    {
      text: "Chứa ít nhất một chữ hoa",
      met: /[A-Z]/.test(password),
    },
    {
      text: "Chứa ít nhất một chữ thường",
      met: /[a-z]/.test(password),
    },
    {
      text: "Chứa ít nhất một số",
      met: /\d/.test(password),
    },
    {
      text: "Chứa ít nhất một ký tự đặc biệt",
      met: /[@$!%*?&#]/.test(password),
    },
  ];

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
                label="Email"
                name="emailAddress"
                rules={[{ required: false }]}
              >
                {
                  !isEdit
                    ?
                    <div className='font-medium'>{detailData?.emailAddress}</div>
                    :
                    <Input placeholder="Nhập email" size="middle" />
                }
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Số điện thoại"
                name="phoneNumber"
                rules={[{ required: false }]}
              >
                {
                  !isEdit
                    ?
                    <div className='font-medium'>{detailData?.phoneNumber || '-'}</div>
                    :
                    <Input placeholder="Nhập số điện thoại" size="middle" />
                }
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Đơn vị"
                name="tenantId"
                rules={[{ message: 'Vui lòng chọn đơn vị', required: true }]}
              >
                {
                  !isEdit
                    ?
                    <div className='font-medium'>{groupData.find((item: any) => item.id === detailData?.tenantId)?.name}</div>
                    :
                    <Select placeholder="Chọn đơn vị" size="middle" loading={loading} allowClear
                      onChange={(_, option) =>
                        setTenantData((option as any)?.key)
                      }
                    >
                      {groupData.map((group) => (
                        <Option key={group.tenancyName} value={group.id}>
                          {group.name}
                        </Option>
                      ))}
                    </Select>
                }
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Tên đăng nhập"
                name="userName"
                rules={[{ message: 'Vui lòng nhập tên đăng nhập', required: true }]}
              >
                {
                  !isEdit
                    ?
                    <div className='font-medium'>{tenantData + '.' + detailData?.userName}</div>
                    :
                    <Input addonBefore={tenantData + '.'} placeholder="Nhập tên đăng nhập" size="middle" />
                }
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: false, message: "Vui lòng nhập mật khẩu" },
                  {
                    pattern:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                    message:
                      "Mật khẩu sai định dạng",
                  },
                ]}
              >
                {
                  !isEdit
                    ?
                    <div className='font-medium'>********</div>
                    :
                    <Input placeholder="Nhập mật khẩu" size="middle" onChange={(e) => setPassword(e.target.value)} />
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
                  {/* <Col span={12}>
                    <Form.Item
                      label="Ngày chỉnh sửa"
                      name="lastModificationTime"
                    >
                      <div className='font-medium'>{detailData?.lastModificationTime ? formatDate(detailData.lastModificationTime) : '-'}</div>
                    </Form.Item>
                  </Col> */}
                </>
              )
            }

            {
              password &&
              <Col span={24}>
                <div>
                  <b>Yêu cầu mật khẩu:</b>
                  <ul>
                    {requirements.map((req, index) => (
                      <li
                        key={index}
                        className='flex items-center'
                      >
                        {req.met ? (
                          <Icon
                            icon="solar:unread-line-duotone"
                            style={{ color: "green", marginRight: "8px" }}
                          />
                        ) : (
                          <Icon icon="iconamoon:close-light" style={{ color: "red", marginRight: "8px" }} />
                        )}
                        <div style={{ color: req.met ? "green" : "inherit" }}>
                          {req.text}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
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
