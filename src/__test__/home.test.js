import "@/__mock__/match_media.mock";
import Banner from "@/components/home/Banner";
import ListCategory from "@/components/home/ListCategory";
import ListProduct from "@/components/ListProduct";
import { describe, it } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));
jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };
describe("Home", () => {
  it("render banner component", () => {
    render(<Banner />);
  });
  it("render category component", () => {
    const mockRouter = {
      push: jest.fn(),
    };
    useRouter.mockReturnValue(mockRouter);
    const listCategory = [
      {
        _id: 1,
        category_thumb: "category.png",
        category_name: "Pant",
      },
      {
        _id: 2,
        category_thumb: "category.png",
        category_name: "Pant1",
      },
    ];
    render(<ListCategory category={listCategory} />);
    const itemPant = screen.getByText("Pant");
    fireEvent.click(itemPant);
    expect(mockRouter.push).toHaveBeenCalledWith("/category?id=1&name=Pant");
  });
  it("render product component", () => {
    const mockRouter = {
      push: jest.fn(),
    };
    useRouter.mockReturnValue(mockRouter);
    const listProduct = Array.from({ length: 50 }, (_, index) => ({
      _id: index,
      product_ratingAverage: "5",
      product_name: `SP${index}`,
      product_thumb: ["product.png"],
      product_price: 1000,
      product_sold: 6,
    }));
    render(<ListProduct product={listProduct} />);
    expect(screen.getByText("SP0")).toBeInTheDocument();
    expect(screen.getByText("SP23")).toBeInTheDocument();
    expect(screen.queryByText("SP24")).not.toBeInTheDocument();

    // Simulate pagination
    fireEvent.click(screen.getByTitle("2"));

    // Check if products for the second page are rendered
    expect(screen.getByText("SP25")).toBeInTheDocument();
    expect(screen.getByText("SP47")).toBeInTheDocument();
    expect(screen.queryByText("SP0")).not.toBeInTheDocument();
  });
});
