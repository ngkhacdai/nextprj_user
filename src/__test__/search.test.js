import "@/__mock__/match_media.mock";
import ProductList from "@/components/search/ProductList";
import { beforeEach, describe, expect, it } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import { useSearchParams } from "next/navigation";

const listProduct = Array.from({ length: 50 }, (_, index) => ({
  _id: index,
  product_ratingAverage: "5",
  product_name: `SP${index}`,
  product_thumb: ["product.png"],
  product_price: 1000 + index,
  product_sold: 6,
}));

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));
describe("Search", () => {
  let mockSortProduct;
  beforeEach(() => {
    mockSortProduct = jest.fn();
    useSearchParams.mockReturnValue({
      get: jest.fn().mockImplementation((key) => {
        if (key === "keyword") return "testValue";
        return null;
      }),
    });

    render(<ProductList productData={listProduct} />);
  });

  it("sort product case 1", async () => {
    // expect(screen.findByText("SP1")).toBeInTheDocument();
    const buttonSort = await screen.findByTestId("btnsort");
    fireEvent.click(buttonSort);
    expect(screen.getByText("Sắp xếp sản phẩm")).toBeInTheDocument();
    fireEvent.click(await screen.findByText("Tên"));
    fireEvent.click(await screen.findByText("Lưu"));
  });

  it("sort product case 2", async () => {
    const buttonSort = await screen.findByTestId("btnsort");
    fireEvent.click(buttonSort);
    expect(screen.getByText("Sắp xếp sản phẩm")).toBeInTheDocument();
    fireEvent.click(await screen.findByText("Giá"));
    fireEvent.click(await screen.findByText("Lưu"));
  });

  it("sort product case 3", async () => {
    const buttonSort = await screen.findByTestId("btnsort");
    fireEvent.click(buttonSort);
    expect(screen.getByText("Sắp xếp sản phẩm")).toBeInTheDocument();
    fireEvent.click(await screen.findByText("Số lượng bán"));
    fireEvent.click(await screen.findByText("Lưu"));
  });

  it("sort product case 4", async () => {
    const buttonSort = await screen.findByTestId("btnsort");
    fireEvent.click(buttonSort);
    expect(screen.getByText("Sắp xếp sản phẩm")).toBeInTheDocument();
    fireEvent.click(await screen.findByText("Tất cả"));
    fireEvent.click(await screen.findByText("Lưu"));
  });
  it("close modal", async () => {
    const buttonSort = await screen.findByTestId("btnsort");
    fireEvent.click(buttonSort);
    expect(screen.getByText("Sắp xếp sản phẩm")).toBeInTheDocument();
    const btncancel = await screen.findByText("Hủy");
    fireEvent.click(btncancel);
  });
});
