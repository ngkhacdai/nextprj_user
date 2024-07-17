import ImageProductDetail from "@/components/productdetail/ImageProductDetail";
import ProductInfo from "@/components/productdetail/ProductInfo";
import { beforeEach, describe, expect, it } from "@jest/globals";
import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { useRouter } from "next/navigation";
import { addProductToCart } from "@/api/Cart";
import { act } from "@testing-library/react";
import Review from "@/components/productdetail/Review";
// import ShopInfor from "@/components/productdetail/ShopInfor";
import Descaption from "@/components/productdetail/Descaption";
import ListProductShop from "@/components/productdetail/ListProductShop";
import ListReview from "@/components/productdetail/ListReview";

const productDetail = {
  product_name: "Jeans Basics dáng Regular Straight",
  product_price: 490000,
  product_thumb: [
    "1702750133239-1702747689999-Screenshot 2023-12-03 210819.png",
    "1702750133245-1702747690006-Screenshot 2023-12-03 210914.png",
    "1702750133252-1702747690022-Screenshot 2023-12-03 210927.png",
    "1702750133254-1702747690026-Screenshot 2023-12-03 210959.png",
  ],
  product_description:
    "Đặc điểm nổi bật\nChất liệu: Denim\nThành phần: 98% Cotton + 2% Spandex\nCông nghệ Laser Marking tạo các vệt hiệu ứng chuẩn xác trên sản phẩm\nBề mặt quần không thô ráp\nCo giãn tốt giúp quần ôm vừa vặn, thoải mái\nDáng Regular Straight suông rộng, thoải mái, không thùng thình\nNgười mẫu: 179 cm - 75 kg, mặc quần size 32\nTự hào sản xuất tại Việt Nam\nLưu ý:Sản phẩm vẫn sẽ bạc màu sau một thời gian dài sử dụng theo tính chất tự nhiên",
  product_sold: 3,
  product_quantity: 115,
  category: "657dd94f25b94a98c4b49839",
  product_attributes: [
    {
      color: "Xanh sáng",
      quantity: 45,
      options: [
        {
          size: "Xl",
          options_quantity: 17,
          _id: "657dde2a25b94a98c4b49997",
        },
        {
          size: "M",
          options_quantity: 9,
          _id: "657dde2a25b94a98c4b49998",
        },
        {
          size: "S",
          options_quantity: 19,
          _id: "657dde2a25b94a98c4b49999",
        },
      ],
      _id: "657dde2a25b94a98c4b49996",
    },
    {
      color: "Xanh đậm",
      quantity: 44,
      options: [
        {
          size: "Xl",
          options_quantity: 17,
          _id: "657dde2a25b94a98c4b4999b",
        },
        {
          size: "M",
          options_quantity: 10,
          _id: "657dde2a25b94a98c4b4999c",
        },
        {
          size: "S",
          options_quantity: 17,
          _id: "657dde2a25b94a98c4b4999d",
        },
      ],
      _id: "657dde2a25b94a98c4b4999a",
    },
    {
      color: "Đen",
      quantity: 26,
      options: [
        {
          size: "Xl",
          options_quantity: 0,
          _id: "657dde2a25b94a98c4b4999f",
        },
        {
          size: "M",
          options_quantity: 7,
          _id: "657dde2a25b94a98c4b499a0",
        },
        {
          size: "S",
          options_quantity: 19,
          _id: "657dde2a25b94a98c4b499a1",
        },
      ],
      _id: "657dde2a25b94a98c4b4999e",
    },
  ],
  product_ratingAverage: 3,
  shop_id: "657dcd5a25b94a98c4b4945e",
  shop_name: "Atrastino",
  shop_avatar:
    "uploads/1702818409168-rn_image_picker_lib_temp_d63212ab-baa6-437a-b395-22d30bc6d1ef.png",
  reviews: [
    {
      user: { information: { avatar: "avatar1.png", fullName: "User One" } },
      rating: 5,
      updatedAt: "2023-07-16T12:34:56.789Z",
      comment: "Great product!",
    },
    {
      user: { information: { avatar: "avatar2.png", fullName: "User Two" } },
      rating: 4,
      updatedAt: "2023-07-15T11:33:55.678Z",
      comment: "Very good!",
    },
    {
      user: { information: { avatar: "avatar3.png", fullName: "User Three" } },
      rating: 3,
      updatedAt: "2023-07-14T10:32:54.567Z",
      comment: "",
    },
    {
      user: { information: { avatar: "avatar4.png", fullName: "User Four" } },
      rating: 2,
      updatedAt: "2023-07-13T09:31:53.456Z",
      comment: "Not bad.",
    },
    {
      user: { information: { avatar: "avatar5.png", fullName: "User Five" } },
      rating: 1,
      updatedAt: "2023-07-12T08:30:52.345Z",
      comment: "Terrible!",
    },
  ],
};
const productDetailNoReview = {
  product_name: "Jeans Basics dáng Regular Straight",
  product_price: 490000,
  product_thumb: [
    "1702750133239-1702747689999-Screenshot 2023-12-03 210819.png",
    "1702750133245-1702747690006-Screenshot 2023-12-03 210914.png",
    "1702750133252-1702747690022-Screenshot 2023-12-03 210927.png",
    "1702750133254-1702747690026-Screenshot 2023-12-03 210959.png",
  ],
  product_description:
    "Đặc điểm nổi bật\nChất liệu: Denim\nThành phần: 98% Cotton + 2% Spandex\nCông nghệ Laser Marking tạo các vệt hiệu ứng chuẩn xác trên sản phẩm\nBề mặt quần không thô ráp\nCo giãn tốt giúp quần ôm vừa vặn, thoải mái\nDáng Regular Straight suông rộng, thoải mái, không thùng thình\nNgười mẫu: 179 cm - 75 kg, mặc quần size 32\nTự hào sản xuất tại Việt Nam\nLưu ý:Sản phẩm vẫn sẽ bạc màu sau một thời gian dài sử dụng theo tính chất tự nhiên",
  product_sold: 3,
  product_quantity: 115,
  category: "657dd94f25b94a98c4b49839",
  product_attributes: [
    {
      color: "Xanh sáng",
      quantity: 45,
      options: [
        {
          size: "Xl",
          options_quantity: 17,
          _id: "657dde2a25b94a98c4b49997",
        },
        {
          size: "M",
          options_quantity: 9,
          _id: "657dde2a25b94a98c4b49998",
        },
        {
          size: "S",
          options_quantity: 19,
          _id: "657dde2a25b94a98c4b49999",
        },
      ],
      _id: "657dde2a25b94a98c4b49996",
    },
    {
      color: "Xanh đậm",
      quantity: 44,
      options: [
        {
          size: "Xl",
          options_quantity: 17,
          _id: "657dde2a25b94a98c4b4999b",
        },
        {
          size: "M",
          options_quantity: 10,
          _id: "657dde2a25b94a98c4b4999c",
        },
        {
          size: "S",
          options_quantity: 17,
          _id: "657dde2a25b94a98c4b4999d",
        },
      ],
      _id: "657dde2a25b94a98c4b4999a",
    },
    {
      color: "Đen",
      quantity: 26,
      options: [
        {
          size: "Xl",
          options_quantity: 0,
          _id: "657dde2a25b94a98c4b4999f",
        },
        {
          size: "M",
          options_quantity: 7,
          _id: "657dde2a25b94a98c4b499a0",
        },
        {
          size: "S",
          options_quantity: 19,
          _id: "657dde2a25b94a98c4b499a1",
        },
      ],
      _id: "657dde2a25b94a98c4b4999e",
    },
  ],
  product_ratingAverage: 3,
  shop_id: "657dcd5a25b94a98c4b4945e",
  shop_name: "Atrastino",
  shop_avatar:
    "uploads/1702818409168-rn_image_picker_lib_temp_d63212ab-baa6-437a-b395-22d30bc6d1ef.png",
  reviews: "Chưa có đánh giá nào",
};

jest.mock("../api/Cart", () => ({
  addProductToCart: jest.fn(),
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

// Configure the store with the dummy reducer
const mockReducer = (state = {}, action) => state;

describe("Product information", () => {
  beforeEach(() => {
    const mockRouter = {
      push: jest.fn(),
    };
    useRouter.mockReturnValue(mockRouter);
    const store = configureStore({
      reducer: {
        // Add any reducers here if needed, but for now just using mockReducer
        mockReducer,
      },
    });
    render(
      <Provider store={store}>
        <ProductInfo ProductDetail={productDetail} />
      </Provider>
    );
  });

  it("add to cart success", async () => {
    await act(async () => {
      addProductToCart.mockResolvedValueOnce({});
      const selectAttribute = await screen.findByText("Đen");
      fireEvent.click(selectAttribute);
      const selectOption = await screen.findByText("M");
      fireEvent.click(selectOption);
      const btnPay = await screen.findByTestId("btnaddtocart");
      fireEvent.click(btnPay);
      // expect(screen.getByText(/Thông báo/i)).toBeInTheDocument();
    });
  });

  it("pay product success", async () => {
    await act(async () => {
      const mockRouter = {
        push: jest.fn(),
      };
      useRouter.mockReturnValue(mockRouter);
      addProductToCart.mockResolvedValueOnce({});
      const selectAttribute = await screen.findByText("Đen");
      fireEvent.click(selectAttribute);
      const selectOption = await screen.findByText("M");
      fireEvent.click(selectOption);
      const btnPay = await screen.findByText("Mua ngay");
      fireEvent.click(btnPay);
      expect(mockRouter.push).toHaveBeenCalledWith("/checkout");
    });
  });

  it("pay product fail quantity not enough", async () => {
    await act(async () => {
      const mockRouter = {
        push: jest.fn(),
      };
      useRouter.mockReturnValue(mockRouter);
      addProductToCart.mockResolvedValueOnce({});
      const selectAttribute = await screen.findByText("Đen");
      fireEvent.click(selectAttribute);
      const selectOption = await screen.findByText("Xl");
      fireEvent.click(selectOption);
      const btnPay = await screen.findByText("Mua ngay");
      fireEvent.click(btnPay);
    });
    expect(
      screen.getByText("Số lượng sản phẩm trong kho không đủ")
    ).toBeInTheDocument();
  });

  it("pay product fail not choose attribute or option", async () => {
    await act(async () => {
      addProductToCart.mockResolvedValueOnce({});
      const selectAttribute = await screen.findByText("Đen");
      fireEvent.click(selectAttribute);
      const btnPay = await screen.findByText("Mua ngay");
      fireEvent.click(btnPay);
    });
    expect(screen.getByText("Thông báo")).toBeInTheDocument();
  });

  it("add to cart fail not choose attribute or option", async () => {
    await act(async () => {
      addProductToCart.mockResolvedValueOnce({});
      const selectAttribute = await screen.findByText("Đen");
      fireEvent.click(selectAttribute);
      const btnPay = await screen.findByText("Thêm vào giỏ hàng");
      fireEvent.click(btnPay);
    });
    expect(screen.getByText("Thông báo")).toBeInTheDocument();
  });

  it("add to cart fail quantity not enough", async () => {
    await act(async () => {
      const selectAttribute = await screen.findByText("Đen");
      fireEvent.click(selectAttribute);
      const selectOption = await screen.findByText("Xl");
      fireEvent.click(selectOption);
      const btnAddToCart = await screen.findByTestId("btnaddtocart");
      fireEvent.click(btnAddToCart);
    });
    expect(
      screen.getByText("Số lượng sản phẩm trong kho không đủ")
    ).toBeInTheDocument();
  });

  it("increment and decrement product", async () => {
    await act(async () => {
      const selectAttribute = await screen.findByText("Đen");
      fireEvent.click(selectAttribute);
      const selectOption = await screen.findByText("M");
      fireEvent.click(selectOption);
      const btnincrement = await screen.findByTestId("btnincrement");
      fireEvent.click(btnincrement);
    });
    await act(async () => {
      const btndecrement = await screen.findByTestId("btndecrement");
      fireEvent.click(btndecrement);
    });
  });
});

describe("Product information with no review", () => {
  const mockRouter = {
    push: jest.fn(),
  };
  useRouter.mockReturnValue(mockRouter);
  const store = configureStore({
    reducer: {
      // Add any reducers here if needed, but for now just using mockReducer
      mockReducer,
    },
  });
  it("render product information", () => {
    render(
      <Provider store={store}>
        <ProductInfo ProductDetail={productDetailNoReview} />
      </Provider>
    );
  });
});
describe("Image Product details", () => {
  it("render the image product details", () => {
    render(<ImageProductDetail ProductDetail={productDetail} />);
  });
});
describe("Review component", () => {
  it("should render the product rating average", async () => {
    await act(() => {
      render(<Review productDetail={productDetail} />);
    });
    // expect(screen.getByText("3 trên 5")).toBeInTheDocument();
  });
  it("should render list review", async () => {
    await act(() => {
      render(<ListReview reviews={productDetail.reviews} />);
    });
    //find text by rating
    const getAllRate = await screen.findByText("Tất cả");
    const get5Star = await screen.findByText("5 Sao");
    const get4Star = await screen.findByText("4 Sao");
    const get3Star = await screen.findByText("3 Sao");
    const get2Star = await screen.findByText("2 Sao");
    const get1Star = await screen.findByText("1 Sao");
    const haveCommnent = await screen.findByText("Có bình luận");
    await act(() => {
      fireEvent.click(get5Star);
      fireEvent.click(getAllRate);
      fireEvent.click(get4Star);
      fireEvent.click(get3Star);
      fireEvent.click(get2Star);
      fireEvent.click(get1Star);
      fireEvent.click(haveCommnent);
    });
  });
  it("handles no reviews correctly", () => {
    render(<ListReview reviews="Chưa có đánh giá nào" />);

    // Check that no list items are rendered
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();

    // Check that no pagination controls are rendered
    expect(
      screen.queryByRole("button", { name: /next/i })
    ).not.toBeInTheDocument();
  });
  it("should render review with no review items", () => {
    render(<Review productDetail={productDetailNoReview} />);
  });
});

// describe("Shop infor component", () => {
//   it("should render the shop information", () => {
//     render(<ShopInfor ProductDetail={productDetail} />);
//   });
// });

describe("Descaption component", () => {
  it("should render the product description", () => {
    render(<Descaption ProductDetail={productDetail} />);
  });
});
describe("List product shop components", () => {
  const listProduct = Array.from({ length: 50 }, (_, index) => ({
    _id: index,
    product_ratingAverage: "5",
    product_name: `SP${index}`,
    product_thumb: ["product.png"],
    product_price: 1000 + index,
    product_sold: 6,
  }));

  it("should render the list product shop", () => {
    render(<ListProductShop product={listProduct} />);
  });
});
