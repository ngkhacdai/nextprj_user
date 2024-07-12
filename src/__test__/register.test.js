import { render } from "@testing-library/react";
import Page from "@/app/(auth)/register/page";
import { register } from "@/api/Access";

jest.mock("../api/Access", () => ({
  register: jest.fn(),
}));

describe("Register", () => {
  it("register a new account", () => {
    register.mockResolvedValueOnce({});
    render(<Page />);
  });
});
