"use screen";
import { Col, Row } from "antd";
import FooterLogin from "./FooterLogin";
import LoginForm from "./LoginForm";
import logo from "@/assets/trustybuy.png";
import image from "@/assets/image_login.png";

const Login = () => {
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
          <LoginForm />
          <FooterLogin />
        </Col>
      </Row>
    </div>
  );
};

export default Login;
