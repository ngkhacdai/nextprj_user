"use client";
import { login } from "@/api/Access";
import { Button, Form, Input, notification } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
const LoginForm = () => {
  const [api, contextHolder] = notification.useNotification();
  const [loadings, setLoadings] = useState(false);
  const router = useRouter();
  const openNotificationWithIcon = (content, type = "error") => {
    api[type]({
      message: "Thông báo",
      description: content,
    });
  };
  const onFinish = async (values) => {
    setLoadings(true);
    const form = {
      email: values.email,
      password: values.password,
      role: "User",
    };
    await login(form)
      .then(() => {
        openNotificationWithIcon("Đăng nhập thành công", "success");
        router.push("/");
      })
      .catch(() => {
        openNotificationWithIcon("Sai tài khoản hoặc mật khẩu");
        setLoadings(false);
      });
  };
  const onFinishFailed = (errorInfo) => {};
  return (
    <div className="flex flex-col items-center border-inherit mb-2">
      <p className="mb-5 text-2xl font-bold">Đăng nhập</p>
      {contextHolder}
      <Form
        layout="vertical"
        name="basic"
        className="w-3/4"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              min: 6,
              message: "Password must be at least 6 characters",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Button
          data-testid="button_login"
          type="primary"
          loading={loadings}
          htmlType="submit"
        >
          Đăng nhập
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
