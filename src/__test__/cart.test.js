import "@/__mock__/match_media.mock";
import TableProduct from "@/components/cart/TableProduct";
import { describe, expect, it } from "@jest/globals";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { useRouter } from "next/navigation";
import { configureStore } from "@reduxjs/toolkit";
import { deleteProductInCart, updateUserCartQuantity } from "@/api/Cart";
import FooterCart from "@/components/cart/FooterCart";
const cart = [
  {
    productId: "657e22b825b94a98c4b4d265",
    shopId: "657dcd5a25b94a98c4b4945e",
    quantity: 1,
    name: "Quần Kaki Excool dáng Straight",
    price: 499000,
    color: "Đen",
    size: "L",
    product_thumb: "1702765240880-1000000064.jpg",
    name_shop: "Atrastino",
    avatar_shop:
      "uploads/1702818409168-rn_image_picker_lib_temp_d63212ab-baa6-437a-b395-22d30bc6d1ef.png",
    itemId: "657e22b825b94a98c4b4d265-Đen-L",
  },
  {
    productId: "anotherProductId",
    shopId: "anotherShopId",
    quantity: 2,
    name: "Another Product",
    price: 799000,
    color: "Blue",
    size: "M",
    product_thumb: "anotherProduct.jpg",
    name_shop: "Another Shop",
    avatar_shop: "uploads/anotherAvatar.png",
    itemId: "anotherItemId",
  },
];

jest.mock("../api/Cart", () => ({
  deleteProductInCart: jest.fn(),
  updateUserCartQuantity: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
const mockReducer = (state = {}, action) => state;
const mockStateNoProductSelected = {
  cart: {
    selectProduct: [], // Ensure this matches your expected state structure
  },
};
const mockState = {
  cart: {
    selectProduct: [
      {
        productId: "657e22b825b94a98c4b4d265",
        shopId: "657dcd5a25b94a98c4b4945e",
        quantity: 1,
        name: "Quần Kaki Excool dáng Straight",
        price: 499000,
        color: "Đen",
        size: "L",
        product_thumb: "1702765240880-1000000064.jpg",
        name_shop: "Atrastino",
        avatar_shop:
          "uploads/1702818409168-rn_image_picker_lib_temp_d63212ab-baa6-437a-b395-22d30bc6d1ef.png",
        itemId: "657e22b825b94a98c4b4d265-Đen-L",
      },
    ], // Ensure this matches your expected state structure
  },
};
describe("Cart", () => {
  const mockRouter = {
    push: jest.fn(),
  };
  useRouter.mockReturnValue(mockRouter);
  const store = configureStore({
    reducer: {
      mockReducer,
    },
  });
  it("should render cart product", async () => {
    deleteProductInCart.mockResolvedValueOnce({});
    updateUserCartQuantity.mockResolvedValueOnce({});
    render(
      <Provider store={store}>
        <TableProduct cart={cart} />
      </Provider>
    );
    const incrementButton = await screen.findAllByText("+");

    await act(() => {
      fireEvent.click(incrementButton[0]);
    });
    const decrementButton = await screen.findAllByText("-");
    await act(() => {
      fireEvent.click(decrementButton[0]);
    });
    expect(screen.getAllByText("1")[0]).toBeInTheDocument();
    const deleteButton = await screen.findAllByText("Xóa");
    await act(() => {
      fireEvent.click(deleteButton[0]);
    });
    expect(
      screen.queryByText("Quần Kaki Excool dáng Straight")
    ).toBeInTheDocument();
    const checkboxes = await screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);
    await new Promise((resolve) => setTimeout(resolve, 1100));
  });
});

describe("footer cart", () => {
  it("render footer cart no product selected", async () => {
    const mockRouter = {
      push: jest.fn(),
    };
    useRouter.mockReturnValue(mockRouter);
    const store = configureStore({
      reducer: {
        cart: mockReducer,
      },
      preloadedState: mockStateNoProductSelected,
    });
    render(
      <Provider store={store}>
        <FooterCart />
      </Provider>
    );
    const payButton = await screen.findByText("Mua hàng");
    await act(() => {
      fireEvent.click(payButton);
    });
    expect(screen.getByText("Hãy chọn sản phẩm")).toBeInTheDocument();
  });
  it("render footer cart", async () => {
    const mockRouter = {
      push: jest.fn(),
    };
    useRouter.mockReturnValue(mockRouter);
    const store = configureStore({
      reducer: {
        cart: mockReducer,
      },
      preloadedState: mockState,
    });
    render(
      <Provider store={store}>
        <FooterCart />
      </Provider>
    );
    const payButton = await screen.findByText("Mua hàng");
    await act(() => {
      fireEvent.click(payButton);
    });
    expect(mockRouter.push).toHaveBeenCalledWith("/checkout");
  });
});
