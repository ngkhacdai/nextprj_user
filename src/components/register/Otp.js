import { verifyOtp } from "@/api/Access";
import { Button, Form, Input, notification } from "antd";
import Title from "antd/es/skeleton/Title";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Otp = ({ isRegister, setIsRegister }) => {
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();

  const [count, setCount] = useState(60);
  const [otp, setOtp] = useState("");
  const openNotificationWithIcon = (content) => {
    api["error"]({
      message: "Thông báo lỗi",
      description: content,
    });
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    }, 1000);
    if (count <= 0) {
      setIsRegister(); // Call setIsRegister when count reaches 0
    }
    return () => {
      clearInterval(timer);
    };
  }, [count, setIsRegister]);

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const onFinish = async () => {
    const form = {
      otp,
      email: isRegister.email,
      password: isRegister.password,
    };

    await verifyOtp(form)
      .then(() => {
        openNotificationWithIcon("Đăng ký thành công");
        router.push("/updateprofile");
      })
      .catch(() => {
        openNotificationWithIcon("Mã OTP sai");
      });
  };

  return (
    <div>
      {contextHolder}
      <Title level={5}>With formatter (Upcase)</Title>
      <Form onFinish={onFinish}>
        <Form.Item>
          <Input
            data-testid="inputOTP"
            name="otp"
            value={otp}
            onChange={handleOtpChange}
          />
        </Form.Item>
        <Button data-testid="btnSubmit" type="primary" htmlType="submit">
          Xác nhận
        </Button>
      </Form>
      <p className="mt-3">Bạn có {count} giây để nhập mã OTP</p>
    </div>
  );
};

export default Otp;
