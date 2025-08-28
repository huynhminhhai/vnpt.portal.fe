import { selectUserInfo } from '@/features/auth/authStore';
import { GetUserById, UpdateUser } from '@/service/api';
import { Button, Col, Form, Input, Row, Skeleton, message } from 'antd';

const UserInforForm = () => {

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector(selectUserInfo);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detailData, setDetailData] = useState<any>();

  const fetchUserInfo = async () => {
    setLoadingDetail(false);
    try {
      const res = await GetUserById(user?.id);
      const data = res.data?.result;

      form.setFieldsValue(data);
      setDetailData(data);
    } catch (error) {
      console.log(error);
      message.error(error as string);
    } finally {
      setLoadingDetail(false);
    }
  }

  useEffect(() => {
    if (user) {
      fetchUserInfo();
    }
  }, [user]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const { fullName, password, creationTime, lastLoginTime, ...restDetail } = detailData;
      const dataSubmit = { ...restDetail, ...values }

      await UpdateUser(dataSubmit);

      message.success('Cập nhật thông tin tài khoản thành công!');
    } catch (error) {
      console.log(error);
      message.error(error as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          isActive: true,
        }}
      >
        <div className='flex flex-col gap-2px mb-3'>
          <div className='text-lg font-semibold'>Chi tiết tài khoản</div>
          <div className='textsm font-medium text-[#475569]'>Cập nhật thông tin tài khoản của bạn</div>
        </div>
        <div>
          {
            loadingDetail ?
              <Row gutter={2}>
                <Col span={24}>
                  <div className="mb-4">
                    <div className="mb-1 h-5 w-28 bg-gray-200 rounded" /> {/* label giả */}
                    <Skeleton.Input active block size="default" />
                  </div>
                </Col>

                <Col span={24}>
                  <div className="mb-4">
                    <div className="mb-1 h-5 w-16 bg-gray-200 rounded" />
                    <Skeleton.Input active block size="default" />
                  </div>
                </Col>

                <Col span={24}>
                  <div className="mb-4">
                    <div className="mb-1 h-5 w-32 bg-gray-200 rounded" />
                    <Skeleton.Input active block size="default" />
                  </div>
                </Col>

                <Col span={24}>
                  <div className="flex items-center justify-end">
                    <Skeleton.Button active className="w-full md:w-[150px]" />
                  </div>
                </Col>
              </Row> :

              <Row gutter={2}>
                <Col span={24}>
                  <Form.Item
                    label="Tên người dùng"
                    name="name"
                    rules={[{ message: 'Vui lòng nhập tên người dùng', required: true }]}
                  >
                    <Input placeholder="Nhập tên người dùng" size="middle" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Email"
                    name="emailAddress"
                    rules={[{ message: 'Vui lòng nhập email', required: true }]}
                  >
                    <Input placeholder="Nhập email" size="middle" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Tên đăng nhập"
                    name="userName"
                    rules={[{ message: 'Vui lòng nhập tên đăng nhập', required: true }]}
                  >
                    <Input placeholder="Nhập tên đăng nhập" size="middle" disabled />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <div className='flex items-center justify-end'>
                    <Button
                      className="w-full md:w-150px"
                      htmlType="submit"
                      loading={loading}
                      size="middle"
                      type="primary"
                    >
                      Lưu lại
                    </Button>
                  </div>
                </Col>
              </Row>
          }
        </div>
      </Form>
    </>
  )
}

export default UserInforForm
