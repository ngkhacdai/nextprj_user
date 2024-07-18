import "@/__mock__/match_media.mock";
import Address from "@/components/checkout/Address";
import Method from "@/components/checkout/Method";
import TableProduct from "@/components/checkout/TableProduct";
import { describe, expect, it } from "@jest/globals";
import { configureStore } from "@reduxjs/toolkit";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { Provider } from "react-redux";
import { PayProduct } from "@/api/CheckOut";
const address = [
  {
    _id: "663d72eda406d088f8a1c6c2",
    nameAddress: "Home",
    customAddress:
      "41A ngách 138 Phường Mễ Trì Quận Nam Từ Liêm Thành phố Hà Nội",
    userinfor: {
      userName: "Nguyễn Khắc Đại",
      phoneNumber: 983946066,
    },
    createdAt: "2024-05-10T01:05:49.524Z",
    updatedAt: "2024-05-10T01:05:49.524Z",
    __v: 0,
  },
  {
    _id: "663de0c6a406d088f8a1ee70",
    nameAddress: "Not Home",
    customAddress: "gádgasdg Phường Hàng Buồm Quận Hoàn Kiếm Thành phố Hà Nội",
    userinfor: {
      userName: "Nguyễn Khắc Đại",
      phoneNumber: 983946066,
    },
    createdAt: "2024-05-10T08:54:30.369Z",
    updatedAt: "2024-05-10T08:54:30.369Z",
    __v: 0,
  },
  {
    _id: "663de136a406d088f8a1ee83",
    nameAddress: "MD",
    customAddress: "agd Xã Lũng Cú Huyện Đồng Văn Tỉnh Hà Giang",
    userinfor: {
      userName: "Nguyễn Khắc Đại",
      phoneNumber: 983946066,
    },
    createdAt: "2024-05-10T08:56:22.819Z",
    updatedAt: "2024-05-10T08:56:22.819Z",
    __v: 0,
  },
];

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

jest.mock("../api/Checkout", () => ({
  PayProduct: jest.fn(),
}));

const mockReducer = (state = {}, action) => state;
const mockState = {
  address: {
    selectIndex: 0,
  },
};

const mockProduct = {
  cart: {
    selectProduct: [
      {
        productId: "1",
        name_shop: "Shop A",
        product_thumb: "thumb1.jpg",
        name: "Product 1",
        color: "Red",
        size: "M",
        price: 1000,
        quantity: 1,
      },
      {
        productId: "2",
        name_shop: "Shop A",
        product_thumb: "thumb2.jpg",
        name: "Product 2",
        color: "Blue",
        size: "L",
        price: 2000,
        quantity: 2,
      },
      {
        productId: "3",
        name_shop: "Shop B",
        product_thumb: "thumb3.jpg",
        name: "Product 3",
        color: "Green",
        size: "S",
        price: 3000,
        quantity: 1,
      },
    ],
  },
};
const mockCheckout = {
  cart: {
    selectProduct: [
      {
        productId: "1",
        name_shop: "Shop A",
        product_thumb: "thumb1.jpg",
        name: "Product 1",
        color: "Red",
        size: "M",
        price: 1000,
        quantity: 1,
      },
      {
        productId: "2",
        name_shop: "Shop A",
        product_thumb: "thumb2.jpg",
        name: "Product 2",
        color: "Blue",
        size: "L",
        price: 2000,
        quantity: 2,
      },
      {
        productId: "3",
        name_shop: "Shop B",
        product_thumb: "thumb3.jpg",
        name: "Product 3",
        color: "Green",
        size: "S",
        price: 3000,
        quantity: 1,
      },
    ],
  },
  address: {
    selectIndex: 0,
  },
};

describe("Address", () => {
  const store = configureStore({
    reducer: {
      address: mockReducer,
    },
    preloadedState: mockState,
  });

  it("renders checkout and interacts with modal", async () => {
    render(
      <Provider store={store}>
        <Address address={address} />
      </Provider>
    );

    const btnOpenModal = await screen.findByText("Thay đổi");
    await act(async () => {
      fireEvent.click(btnOpenModal);
    });

    expect(screen.getByText("Địa chỉ của tôi")).toBeInTheDocument();

    const radioButtons = screen.getAllByRole("radio");

    await act(async () => {
      fireEvent.click(radioButtons[1]);
    });

    expect(radioButtons[1]).toBeChecked();

    const btnCancel = await screen.findByText("Cancel");
    await act(async () => {
      fireEvent.click(btnCancel);
    });
  });
});

describe("Table Product", () => {
  it("renders table product", () => {
    const store = configureStore({
      reducer: {
        cart: mockReducer,
      },
      preloadedState: mockProduct,
    });
    render(
      <Provider store={store}>
        <TableProduct />
      </Provider>
    );

    expect(screen.getByText("Shop Name")).toBeInTheDocument();
    expect(screen.getByText("Sản phẩm")).toBeInTheDocument();
    expect(screen.getByText("Đơn giá")).toBeInTheDocument();
  });
  it("renders table with correct rowSpan attributes", () => {
    const store = configureStore({
      reducer: {
        cart: mockReducer,
      },
      preloadedState: mockProduct,
    });

    render(
      <Provider store={store}>
        <TableProduct />
      </Provider>
    );
  });
});

describe("Method", () => {
  PayProduct.mockResolvedValueOnce({});
  const mockRouter = {
    push: jest.fn(),
  };
  useRouter.mockReturnValue(mockRouter);
  it("render method success", async () => {
    const store = configureStore({
      reducer: {
        cart: mockReducer,
        address: mockReducer,
      },
      preloadedState: mockCheckout,
    });
    await act(() => {
      render(
        <Provider store={store}>
          <Method address={address} />
        </Provider>
      );
    });
    const btnPay = await screen.findByTestId("btnPay");
    await act(() => {
      fireEvent.click(btnPay);
    });
    const btnOk = await screen.findByText("Có");
    await act(() => {
      fireEvent.click(btnOk);
    });
    expect(mockRouter.push).toHaveBeenCalledWith("/user/order", {
      shallow: false,
    });
  });
  it("render method success", async () => {
    const store = configureStore({
      reducer: {
        cart: mockReducer,
        address: mockReducer,
      },
      preloadedState: mockCheckout,
    });
    await act(() => {
      render(
        <Provider store={store}>
          <Method address={address} />
        </Provider>
      );
    });
    const btnPay = await screen.findByTestId("btnPay");
    await act(() => {
      fireEvent.click(btnPay);
    });
    const btnCancel = await screen.findByText("Hủy");
    await act(() => {
      fireEvent.click(btnCancel);
    });
    const rdoPaypal = await screen.findByText("Paypal");
    await act(() => {
      fireEvent.click(rdoPaypal);
    });
  });
  it("render method no product selected", async () => {
    const store = configureStore({
      reducer: {
        cart: mockReducer,
        address: mockReducer,
      },
      preloadedState: {
        cart: {
          selectProduct: [],
        },
        address: {
          selectIndex: 0,
        },
      },
    });
    await act(() => {
      render(
        <Provider store={store}>
          <Method address={address} />
        </Provider>
      );
    });
    const btnPay = await screen.findByTestId("btnPay");
    await act(() => {
      fireEvent.click(btnPay);
    });
    const btnOk = await screen.findByText("Có");
    await act(() => {
      fireEvent.click(btnOk);
    });
  });
  it("render method do not have address", async () => {
    const store = configureStore({
      reducer: {
        cart: mockReducer,
        address: mockReducer,
      },
      preloadedState: {
        cart: {
          selectProduct: [],
        },
        address: {
          selectIndex: 0,
        },
      },
    });
    await act(() => {
      render(
        <Provider store={store}>
          <Method address={[]} />
        </Provider>
      );
    });
    const btnPay = await screen.findByTestId("btnPay");
    await act(() => {
      fireEvent.click(btnPay);
    });
    const btnOk = await screen.findByText("Có");
    await act(() => {
      fireEvent.click(btnOk);
    });
  });
});
