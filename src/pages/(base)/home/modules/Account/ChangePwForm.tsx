import { ChangePassword } from '@/service/api';
import { Button, Col, Form, Input, Row, message } from 'antd';

const ChangePwForm = () => {

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const dataSubmit = {
        currentPassword: values?.currentPassword,
        newPassword: values?.newPassword
      };

      await ChangePassword(dataSubmit);

      message.success('Cập nhật mật khẩu thành công!');

      form.resetFields();
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
          <div className='text-lg font-semibold'>Đổi mật khẩu</div>
          <div className='textsm font-medium text-[#475569]'>Cập nhật thông tin tài khoản của bạn</div>
        </div>
        <div>
          <Row gutter={2}>
            <Col span={24}>
              <Form.Item
                label="Mật khẩu hiện tại"
                name="currentPassword"
                rules={[
                  { message: 'Vui lòng nhập mật khẩu hiện tại', required: true }, {
                    pattern:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                    message:
                      "Mật khẩu sai định dạng",
                  }
                ]}
              >
                <Input.Password placeholder="Nhập mật khẩu hiện tại" size="middle" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Mật khẩu mới"
                name="newPassword"
                rules={[
                  { message: 'Vui lòng nhập mật khẩu mới', required: true }, {
                    pattern:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                    message:
                      "Mật khẩu sai định dạng",
                  }
                ]}
              >
                <Input.Password placeholder="Nhập mật khẩu mới" size="middle" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                dependencies={["newPassword"]}
                rules={[
                  { required: true, message: "Vui lòng xác nhận mật khẩu" },
                  {
                    pattern:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                    message: "Mật khẩu sai định dạng",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Mật khẩu xác nhận không khớp với mật khẩu mới")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Nhập lại mật khẩu" size="middle" />
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
            <Col span={24}>
              <b>Yêu cầu mật khẩu:</b>
              <ul className='list-disc list-inside'>
                <li>
                  Ít nhất 8 ký tự
                </li>
                <li>
                  Chứa ít nhất một chữ hoa
                </li>
                <li>
                  Chứa ít nhất một chữ thường
                </li>
                <li>
                  Chứa ít nhất một số
                </li>
                <li>
                  Chứa ít nhất một ký tự đặc biệt
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </Form>
    </>
  )
}

export default ChangePwForm
