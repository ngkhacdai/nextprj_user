"use client";
import FooterRegister from "@/components/register/FooterRegister";
import RegisterForm from "@/components/register/RegisterForm";
import { Col, Row } from "antd";
import { useState } from "react";
import image from "@/assets/image_login.png";
import logo from "@/assets/trustybuy.png";
import Otp from "./Otp";

const Register = () => {
  const [isRegister, setIsRegister] = useState();
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Row className="w-3/4 h-3/4 shadow-2xl rounded-3xl overflow-hidden">
        <Col xs={0} sm={0} md={14} className="h-full p-0">
          <img
            alt=""
            src={image.src}
            className=" h-full object-cover rounded-s-3xl"
          />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={10}
          className="bg-white flex flex-col  justify-center h-full text-center rounded-e-3xl"
        >
          <div className="flex w-full justify-center">
            <img
              alt="TrustyBuy Logo"
              src={logo.src}
              className="h-28 w-28 my-4"
            />
          </div>
          {isRegister ? (
            <Otp
              isRegister={isRegister}
              setIsRegister={(values) => setIsRegister(values)}
            />
          ) : (
            <div>
              <RegisterForm setIsRegister={(values) => setIsRegister(values)} />
              <FooterRegister />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Register;
