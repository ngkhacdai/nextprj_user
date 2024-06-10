"use client";
import { changePassword } from "@/api/User";
import { Button, Form, Input, notification } from "antd";

const ChangePassword = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (content, type = "error") => {
    api[type]({
      message: "Thông báo",
      description: content,
    });
  };
  const onFinish = (values) => {
    if (values.oldPassword === values.newPassword) {
      return openNotificationWithIcon("Mật khẩu mới phải khác mật khẩu cũ");
    } else if (values.newPassword !== values.comfirmNewPassword) {
      return openNotificationWithIcon(
        "Mật khẩu mới phải giống nhập lại mật khẩu mới"
      );
    } else {
      const form = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };
      changePassword(form)
        .then(() => {
          openNotificationWithIcon("Đổi mật khẩu thành công", "success");
        })
        .catch(() => {
          openNotificationWithIcon("Mật khẩu cũ không chính xác");
        });
    }
  };
  return (
    <div>
      {contextHolder}
      <p className="text-xl font-bold mb-2">Đổi mật khẩu</p>
      <hr />
      <div className="mt-2 flex justify-center items-center text-center">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 8,
          }}
          className="w-full"
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          // autoComplete="off"
        >
          <Form.Item
            label="Mật khẩu cũ"
            name="oldPassword"
            rules={[
              {
                required: true,
                message: "Mật khẩu phải từ 6 ký tự trở lên",
                min: 6,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[
              {
                required: true,
                min: 6,
                message: "Mật khẩu phải từ 6 ký tự trở lên",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Nhập lại mật khẩu mới"
            name="comfirmNewPassword"
            rules={[
              {
                required: true,
                min: 6,
                message: "Mật khẩu phải từ 6 ký tự trở lên",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Đổi mật khẩu
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
