import ImageProductDetail from "@/components/productdetail/ImageProductDetail";
import { describe } from "@jest/globals";
import { render } from "@testing-library/react";

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
      _id: "657decc325b94a98c4b4a910",
      user: {
        _id: "657dd41c25b94a98c4b49614",
        user_name: "",
        information: {
          _id: "657dd45525b94a98c4b49617",
          phoneNumber: 362822236,
          address: ["657de05c25b94a98c4b49c3b", "6581350f06029345d1793064"],
          avatar: "uploads/1703989041352-image.jpg",
          fullName: "Phạm Tiến Dũng",
          gender: "Nam",
          createdAt: "2023-12-16T16:46:13.689Z",
          updatedAt: "2023-12-31T02:17:21.428Z",
          __v: 0,
        },
      },
      product: "657dde2a25b94a98c4b49995",
      rating: 5,
      comment: "San pham nay rat tot mau sac chuan",
      createdAt: "2023-12-16T18:30:27.951Z",
      updatedAt: "2023-12-16T18:30:27.951Z",
      __v: 0,
    },
    {
      _id: "657df35025b94a98c4b4b483",
      user: {
        _id: "657dd41c25b94a98c4b49614",
        user_name: "",
        information: {
          _id: "657dd45525b94a98c4b49617",
          phoneNumber: 362822236,
          address: ["657de05c25b94a98c4b49c3b", "6581350f06029345d1793064"],
          avatar: "uploads/1703989041352-image.jpg",
          fullName: "Phạm Tiến Dũng",
          gender: "Nam",
          createdAt: "2023-12-16T16:46:13.689Z",
          updatedAt: "2023-12-31T02:17:21.428Z",
          __v: 0,
        },
      },
      product: "657dde2a25b94a98c4b49995",
      rating: 1,
      comment: "san pham rat te",
      createdAt: "2023-12-16T18:58:24.500Z",
      updatedAt: "2023-12-16T18:58:24.500Z",
      __v: 0,
    },
    {
      _id: "657df36825b94a98c4b4b524",
      user: {
        _id: "657dd41c25b94a98c4b49614",
        user_name: "",
        information: {
          _id: "657dd45525b94a98c4b49617",
          phoneNumber: 362822236,
          address: ["657de05c25b94a98c4b49c3b", "6581350f06029345d1793064"],
          avatar: "uploads/1703989041352-image.jpg",
          fullName: "Phạm Tiến Dũng",
          gender: "Nam",
          createdAt: "2023-12-16T16:46:13.689Z",
          updatedAt: "2023-12-31T02:17:21.428Z",
          __v: 0,
        },
      },
      product: "657dde2a25b94a98c4b49995",
      rating: 3,
      comment: "san pham binh thuong",
      createdAt: "2023-12-16T18:58:48.115Z",
      updatedAt: "2023-12-16T18:58:48.115Z",
      __v: 0,
    },
    {
      _id: "657df4b525b94a98c4b4bf35",
      user: {
        _id: "657deec325b94a98c4b4ac44",
        user_name: "",
        information: {
          _id: "657deef425b94a98c4b4ac47",
          phoneNumber: 358555616,
          address: [
            "657df68025b94a98c4b4c197",
            "657df83d25b94a98c4b4c32b",
            "657df86e25b94a98c4b4c33e",
            "657dfbd025b94a98c4b4c65a",
          ],
          avatar: "uploads/1702751988366-image.jpg",
          fullName: "Nguyễn Xuân Duẫn ",
          gender: "Nam",
          createdAt: "2023-12-16T18:39:48.416Z",
          updatedAt: "2023-12-16T19:34:40.462Z",
          __v: 0,
        },
      },
      product: "657dde2a25b94a98c4b49995",
      rating: 3,
      comment: "san pham bt",
      createdAt: "2023-12-16T19:04:21.102Z",
      updatedAt: "2023-12-16T19:04:21.102Z",
      __v: 0,
    },
  ],
};

describe("Product detail", () => {
  it("should render product detail", () => {
    render(<ImageProductDetail ProductDetail={productDetail} />);
  });
});
