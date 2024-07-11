import "../__mock__/match_media.mock";
import LoginPage from "@/app/(auth)/login/page";
import { fireEvent, render, screen } from "@testing-library/react";

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

  it("render email", () => {
    render(<LoginPage />);
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
  });

  it("onclick button", () => {
    render(<LoginPage />);
    const button = screen.getByTestId(/button_login/i);
    expect(button).toBeInTheDocument();
  });
  //   it("onclick button", () => {
  //     const handleClick = jest.fn();
  //     render(<LoginPage />);
  //     const button = screen.getByTestId(/button_login/i);
  //     fireEvent.click(button);
  //     expect(handleClick).toHaveBeenCalledTimes(1);
  //   });
});
