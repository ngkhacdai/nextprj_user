import "../__mock__/match_media.mock";
import LoginPage from "@/app/(auth)/login/page";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { login } from "../api/Access";

jest.mock("../api/Access", () => ({
  login: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("Login", () => {
  it("renders the login page", () => {
    const { container } = render(<LoginPage />);
    expect(container).toBeInTheDocument();
  });

  it("should login success", async () => {
    login.mockResolvedValueOnce({});
    render(<LoginPage />);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const button = screen.getByTestId("button_login");

    fireEvent.change(emailInput, { target: { value: "ngkhacdai@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: "ngkhacdai@gmail.com",
        password: "123456",
        role: "User",
      });
      expect(screen.getByText("Đăng nhập thành công")).toBeInTheDocument();
    });
  });
  it("should show error message when login fail", async () => {
    login.mockResolvedValueOnce({});
    render(<LoginPage />);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const button = screen.getByTestId("button_login");

    fireEvent.change(emailInput, { target: { value: "q@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: "q@gmail.com",
        password: "123456",
        role: "User",
      });
      expect(
        screen.getByText("Sai tài khoản hoặc mật khẩu")
      ).toBeInTheDocument();
    });
  });
});
