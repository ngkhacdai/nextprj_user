import PageTest from "@/pages_test/page";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Page Test", () => {
  it("click event", () => {
    const handleClick = jest.fn(() => 2);
    render(<PageTest handleClick={handleClick} />);
    const button = screen.getByText(/Click me/i);
    fireEvent.click(button);
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(2);
    const returnValue = handleClick.mock.results[0].value;
    expect(returnValue).toBe(2);
  });
  it("click count", () => {
    let count = 0;
    const handleClick = () => {
      count += 1;
    };
    render(<PageTest handleClick={handleClick} />);
    const button = screen.getByText(/Click me/i);
    fireEvent.click(button);
    fireEvent.click(button);
    expect(count).toBe(2);
  });
});
