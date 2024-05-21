"use client";
import FooterLogin from "@/components/login/FooterLogin";
import LoginForm from "@/components/login/LoginForm";

const Login = () => {
  return (
    <div className="w-full m-auto text-center mt-52">
      <LoginForm />
      <FooterLogin />
    </div>
  );
};

export default Login;
