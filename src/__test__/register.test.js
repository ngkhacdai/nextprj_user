import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import Otp from "@/components/register/Otp";
import { useRouter } from "next/router";
import { expect, it } from "@jest/globals";
import Page from "@/app/(auth)/register/page";
import { verifyOtp, register } from "@/api/Access";
import React from "react";
import RegisterForm from "@/components/register/RegisterForm";
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

jest.mock("../api/Access", () => ({
  verifyOtp: jest.fn(),
  register: jest.fn(),
}));

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));
describe("Register", () => {
  const setIsRegisterMock = jest.fn();
  beforeEach(() => {
    jest.useFakeTimers();
    jest.resetAllMocks();
  });
  it("renders Otp component after successful registration", async () => {
    register.mockResolvedValueOnce({});
    render(<Page />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText("password");
    const comPasswordInput = screen.getByLabelText("Comfirm Password");
    const button = screen.getByTestId("btnSubmit");

    fireEvent.change(emailInput, { target: { value: "ngkhacdai@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    fireEvent.change(comPasswordInput, { target: { value: "123456" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(register).toHaveBeenCalledWith({
        email: "ngkhacdai@gmail.com",
        password: "123456",
      });
    });

    await waitFor(() => {
      expect(
        screen.getByText("Bạn có 60 giây để nhập mã OTP")
      ).toBeInTheDocument(); // Assuming "Enter OTP" is a text in Otp component
    });
  });

  it("test verify OTP", async () => {
    const mockRouter = {
      push: jest.fn(), // the component uses `router.push` only
    };
    useRouter.mockReturnValue(mockRouter);
    verifyOtp.mockResolvedValueOnce({});
    render(
      <Otp
        isRegister={{ email: "ngkhacdai@gmail.com", password: "123456" }}
        setIsRegister={jest.fn()}
      />
    );
    const input = await screen.findByTestId("inputOTP");
    const button = await screen.findByTestId("btnSubmit");

    fireEvent.change(input, { target: { value: "123456" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(verifyOtp).toHaveBeenCalledWith({
        otp: "123456",
        email: "ngkhacdai@gmail.com",
        password: "123456",
      });
    });
    await waitFor(() => {
      expect(screen.getByText("Đăng ký thành công")).toBeInTheDocument();
    });
  });
  it("should start countdown from 60 and reset to 60 after reaching 0", async () => {
    const setIsRegisterMock = jest.fn();
    render(
      <Otp
        isRegister={{ email: "test@example.com", password: "password" }}
        setIsRegister={setIsRegisterMock}
      />
    );

    // Fast-forward timers by 60 seconds
    act(() => {
      jest.advanceTimersByTime(60000);
    });

    expect(setIsRegisterMock).toHaveBeenCalledTimes(1);

    expect(screen.getByText(/0/i)).toBeInTheDocument();
  });

  it("test submit form success", async () => {
    register.mockResolvedValueOnce({});
    render(<RegisterForm setIsRegister={setIsRegisterMock} />);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText("password");
    const comPasswordInput = screen.getByLabelText("Comfirm Password");
    const button = screen.getByTestId("btnSubmit");
    fireEvent.change(emailInput, { target: { value: "ngkhacdai@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    fireEvent.change(comPasswordInput, { target: { value: "123456" } });
    fireEvent.click(button);
    await waitFor(() => {
      expect(register).toHaveBeenCalledWith({
        email: "ngkhacdai@gmail.com",
        password: "123456",
      });
    });
    expect(setIsRegisterMock).toBeCalled();
    expect(setIsRegisterMock).toBeCalledTimes(1);
  });
  it("test submit form success", async () => {
    register.mockRejectedValueOnce({});
    render(<RegisterForm setIsRegister={setIsRegisterMock} />);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText("password");
    const comPasswordInput = screen.getByLabelText("Comfirm Password");
    const button = screen.getByTestId("btnSubmit");
    fireEvent.change(emailInput, { target: { value: "ngkhacdai@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    fireEvent.change(comPasswordInput, { target: { value: "123456" } });
    fireEvent.click(button);
    await waitFor(() => {
      expect(register).toHaveBeenCalledWith({
        email: "ngkhacdai@gmail.com",
        password: "123456",
      });
    });
    expect(screen.getByText("Email đã tồn tại!")).toBeInTheDocument();
  });
  it("test submit register form error email wrong validation", async () => {
    render(<RegisterForm setIsRegister={setIsRegisterMock} />);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText("password");
    const comPasswordInput = screen.getByLabelText("Comfirm Password");
    const button = screen.getByTestId("btnSubmit");
    fireEvent.change(emailInput, { target: { value: "ngkhacdai@abc.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    fireEvent.change(comPasswordInput, { target: { value: "123456" } });
    fireEvent.click(button);
    await waitFor(() => {
      expect(
        screen.getByText(
          "Email phải có định dạng như sau (nguyenvana@gmail.com)"
        )
      ).toBeInTheDocument();
    });
  });
  it("test submit register form error password not like comfirm password", async () => {
    render(<RegisterForm setIsRegister={setIsRegisterMock} />);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText("password");
    const comPasswordInput = screen.getByLabelText("Comfirm Password");
    const button = screen.getByTestId("btnSubmit");
    fireEvent.change(emailInput, { target: { value: "ngkhacdai@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    fireEvent.change(comPasswordInput, { target: { value: "123456789" } });
    fireEvent.click(button);
    await waitFor(() => {
      expect(
        screen.getByText("Mật khẩu phải giống nhập lại mật khẩu")
      ).toBeInTheDocument();
    });
  });
  it("test submit register form error input require null", async () => {
    render(<RegisterForm setIsRegister={setIsRegisterMock} />);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText("password");
    const comPasswordInput = screen.getByLabelText("Comfirm Password");
    const button = screen.getByTestId("btnSubmit");
    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    fireEvent.change(comPasswordInput, { target: { value: "123456789" } });
    fireEvent.click(button);
    await waitFor(() => {
      expect(
        screen.getByText("Không được để trống các trường")
      ).toBeInTheDocument();
    });
  });
});
