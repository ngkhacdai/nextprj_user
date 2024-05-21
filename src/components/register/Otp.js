"use client";
import { API } from "@/helper/url";
import { Input, notification } from "antd";
import Title from "antd/es/skeleton/Title";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Otp = ({ isRegister, setIsRegister }) => {
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();

  const [count, setCount] = useState(60);
  const openNotificationWithIcon = (content) => {
    api["error"]({
      message: "Notification Error",
      description: content,
    });
  };
  useEffect(() => {
    setTimeout(() => {
      setCount(count - 1);
    }, 1000);
  });
  const onChange = async (text) => {
    const form = {
      otp: text,
      email: isRegister.email,
      password: isRegister.password,
    };
    await axios
      .post(`${API}/v1/api/access/verifyOtp`, form)
      .then((res) => {
        localStorage.setItem("userID", res.data.newUser._id);
        router.push("/updateprofile");
      })
      .catch(() => {
        openNotificationWithIcon("Mã OTP sai");
      });
  };
  const sharedProps = {
    onChange,
  };
  if (count === 0) {
    setCount(60);
    setIsRegister();
  }
  return (
    <div>
      {contextHolder}
      <Title level={5}>With formatter (Upcase)</Title>
      <Input.OTP formatter={(str) => str.toUpperCase()} {...sharedProps} />
      <p className="mt-3">Bạn có {count} giây để nhập mã OTP</p>
    </div>
  );
};

export default Otp;
