import "@/__mock__/match_media.mock";
import { cancelByUser } from "@/api/Order";
import { addAddress, deleteAddress, updateProfile } from "@/api/User";
import AddressClient from "@/components/user/addressClient/AddressClient";
import ListOrder from "@/components/user/ListOrder";
import Information from "@/components/user/profile/Information";
import { beforeEach, describe, expect, it, test } from "@jest/globals";
import { configureStore } from "@reduxjs/toolkit";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePathname, useRouter } from "next/navigation";
import { Provider } from "react-redux";

jest.mock("../api/User", () => ({
  updateProfile: jest.fn(),
  deleteAddress: jest.fn(),
  addAddress: jest.fn(),
}));
jest.mock("../api/Order", () => ({
  cancelByUser: jest.fn(),
}));
const mockUsePathname = jest.fn();

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: jest.fn(),
  usePathname: () => mockUsePathname,
}));
window.HTMLElement.prototype.scrollIntoView = function () {};

// Modify the console.error mock to handle non-string errors gracefully
console.error = jest.fn((error) => {
  const errorMessage = typeof error === "string" ? error : error.message;
  if (errorMessage.includes("findDOMNode")) {
    return null;
  }
  console.log(error); // Use console.log to avoid recursion
});

const profile = {
  _id: "663994a9a406d088f89ed562",
  user_name: "",
  email: "ngkhacdai@gmail.com",
  status: "inactive",
  role: "User",
  information: {
    _id: "663994c3a406d088f89ed565",
    phoneNumber: 983946066,
    address: [
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
        customAddress:
          "gádgasdg Phường Hàng Buồm Quận Hoàn Kiếm Thành phố Hà Nội",
        userinfor: {
          userName: "Nguyễn Khắc Đại",
          phoneNumber: 983946066,
        },
        createdAt: "2024-05-10T08:54:30.369Z",
        updatedAt: "2024-05-10T08:54:30.369Z",
        __v: 0,
      },
    ],
    avatar: "uploads/1715568026621-táº£i xuá»ng.jpg",
    fullName: "Nguyễn Khắc Đại",
    gender: "Nam",
    createdAt: "2024-05-07T02:41:07.665Z",
    updatedAt: "2024-06-12T03:05:14.978Z",
    __v: 0,
  },
  disable: false,
  createdAt: "2024-05-07T02:40:41.653Z",
  updatedAt: "2024-06-19T08:28:40.744Z",
  __v: 0,
};

const statuses = ["pending", "confirmed", "shipped", "cancelled", "delivered"];

const mockOrder = Array.from({ length: 50 }, (_, index) => ({
  oderId: index,
  status: "pending",
  name_shop: "Atrastino",
  shopId: "657dcd5a25b94a98c4b4945e",
  avatar_shop:
    "uploads/1702818409168-rn_image_picker_lib_temp_d63212ab-baa6-437a-b395-22d30bc6d1ef.png",
  product_name: "Nước hoa CM24 ICONIC COOL EDP",
  product_thumb: [
    "1702770450767-cm2312341.jpg",
    "1702770450770-thumb168-cm24-50ml-1.jpg",
    "1702770450773-thumb168-cm24-50ml-3.jpg",
    "1702770450774-IconicCool_4.jpg",
    "1702770450774-IconicCool_6.jpg",
    "1702770450779-IconicCool.jpg",
  ],
  product_attributes: {
    price: 519000,
    quantity: 3,
    productId: "657e371225b94a98c4b4eff4",
    color: "Đen",
    size: "5l",
  },
  order_checkout: {
    totalPrice: 1557000,
    feeShip: 30000,
    totalDiscount: 0,
    totalCheckout: 1557000,
  },
  order_status: statuses[Math.floor(Math.random() * statuses.length)],
  order_payment: "Paypal",
  crateDate: "2024-05-10T08:30:07.522Z",
}));
const mockReducer = (state = {}, action) => state;

describe("Profile", () => {
  beforeAll(() => {
    global.URL.createObjectURL = jest.fn();
  });
  const store = configureStore({
    reducer: {
      mockReducer,
    },
  });
  const mockRouter = {
    push: jest.fn(),
  };
  useRouter.mockReturnValue(mockRouter);
  it("update profile success", async () => {
    updateProfile.mockResolvedValueOnce({});
    render(
      <Provider store={store}>
        <Information profile={{}} />
      </Provider>
    );

    const updateInFormation = await screen.findByTestId("updateInFormation");
    await act(async () => {
      fireEvent.click(updateInFormation);
    });

    const hiddenFileInput = document.querySelector('input[type="file"]');
    const file = new File(["hello"], "hello.png", { type: "image/png" });
    await act(async () => {
      fireEvent.change(hiddenFileInput, { target: { files: [file] } });
    });

    const fullnameInput = await screen.findByLabelText("Họ và tên");
    await act(async () => {
      fireEvent.change(fullnameInput, { target: { value: "Nguyễn Khắc Đại" } });
    });

    const phoneNumberInput = await screen.findByLabelText("Số điện thoại");
    await act(async () => {
      fireEvent.change(phoneNumberInput, { target: { value: "0123456789" } });
    });

    const gender = await screen.findByText("Nữ");
    await act(async () => {
      fireEvent.click(gender);
    });

    const btnUpdate = await screen.findByText("Cập nhật");
    await act(async () => {
      fireEvent.click(btnUpdate);
    });

    expect(screen.getByText("Thông báo")).toBeInTheDocument();
  });
  it("update profile fail", async () => {
    updateProfile.mockResolvedValueOnce({});
    render(
      <Provider store={store}>
        <Information profile={{}} />
      </Provider>
    );
    const updateInFormation = await screen.findByTestId("updateInFormation");
    await act(async () => {
      fireEvent.click(updateInFormation);
    });
    const btnUpdate = await screen.findByText("Cập nhật");
    await act(async () => {
      fireEvent.click(btnUpdate);
    });
    expect(screen.getByText("Thông báo")).toBeInTheDocument();
  });
  it("close modal", async () => {
    updateProfile.mockResolvedValueOnce({});
    render(
      <Provider store={store}>
        <Information profile={{}} />
      </Provider>
    );
    const updateInFormation = await screen.findByTestId("updateInFormation");
    await act(async () => {
      fireEvent.click(updateInFormation);
    });
    const btnCancel = await screen.findByText("Hủy");
    await act(async () => {
      fireEvent.click(btnCancel);
    });
  });

  test("render information", () => {
    render(
      <Provider store={store}>
        <Information profile={profile} />
      </Provider>
    );
  });
});

describe("Address", () => {
  beforeEach(() => {
    render(<AddressClient address={profile.information.address} />);
    deleteAddress.mockResolvedValueOnce({});
    addAddress.mockResolvedValueOnce({});
  });

  it("close modal delete", async () => {
    const btnDeleteAddress = await screen.findAllByTestId("btnDeleteAddress");
    await act(async () => {
      fireEvent.click(btnDeleteAddress[0]);
    });
    expect(screen.getByText("Xóa địa chỉ")).toBeInTheDocument();
    const btnCloseModalDelete = await screen.findByText("Đóng");
    await act(async () => {
      fireEvent.click(btnCloseModalDelete);
    });
  });

  it("delete address", async () => {
    const btnDeleteAddress = await screen.findAllByTestId("btnDeleteAddress");
    await act(async () => {
      fireEvent.click(btnDeleteAddress[0]);
    });
    expect(screen.getByText("Xóa địa chỉ")).toBeInTheDocument();
    const btnDelete = await screen.findByText("OK");
    await act(async () => {
      fireEvent.click(btnDelete);
    });
    expect(screen.getByText("Xóa địa chỉ thành công")).toBeInTheDocument();
  });

  it("close modal add address", async () => {
    const btnAddAddress = await screen.findByText("Thêm địa chỉ mới");
    await act(async () => {
      fireEvent.click(btnAddAddress);
    });
    expect(screen.getByText("Địa chỉ mới")).toBeInTheDocument();
    const btnCloseModalAdd = await screen.findByText("Cancel");
    await act(async () => {
      fireEvent.click(btnCloseModalAdd);
    });
  });
  it("open modal and add address fail", async () => {
    const btnAddAddress = await screen.findByText("Thêm địa chỉ mới");
    await act(async () => {
      fireEvent.click(btnAddAddress);
    });
    expect(screen.getByText("Địa chỉ mới")).toBeInTheDocument();
    const btnSaveAddress = await screen.findByText("OK");
    await act(async () => {
      fireEvent.click(btnSaveAddress);
    });
  });
  it("open modal and add address success", async () => {
    const btnAddAddress = await screen.findByText("Thêm địa chỉ mới");
    await act(async () => {
      fireEvent.click(btnAddAddress);
    });
    expect(screen.getByText("Địa chỉ mới")).toBeInTheDocument();
    const inputAddressName = await screen.findByLabelText("Tên địa chỉ");
    await act(async () => {
      fireEvent.change(inputAddressName, { target: { value: "Home1" } });
    });
    const inputCustomAddress = await screen.findByLabelText("Địa chỉ cụ thể");
    await act(async () => {
      fireEvent.change(inputCustomAddress, { target: { value: "asdfasdf" } });
    });
    const selectCity = await screen.findByLabelText("Tỉnh/Thành phố");
    await userEvent.click(selectCity);
    const cityOptions = screen.getAllByTestId("cityOption");
    await act(async () => {
      fireEvent.click(cityOptions[0]);
    });
    const selectDistrict = await screen.findByLabelText("Quận/Huyện");
    await userEvent.click(selectDistrict);
    const districtOptions = screen.getAllByTestId("districtOption");
    await act(async () => {
      fireEvent.click(districtOptions[0]);
    });
    const selectWard = await screen.findByLabelText("Phường/Xã");
    await userEvent.click(selectWard);
    const wardOptions = screen.getAllByTestId("wardOption");
    await act(async () => {
      fireEvent.click(wardOptions[0]);
    });
    const btnSaveAddress = await screen.findByText("OK");
    await act(async () => {
      fireEvent.click(btnSaveAddress);
    });
  });
});

describe("Order", () => {
  beforeEach(() => {
    render(<ListOrder orderData={mockOrder} />);
    cancelByUser.mockResolvedValueOnce({});
  });
  it("change page order", () => {
    const pagination = screen.getByTestId("panigation_order");
    expect(pagination).toBeInTheDocument();
    const secondPageLink = pagination.getElementsByTagName("a")[1];

    // Click the second page link
    fireEvent.click(secondPageLink);
  });
  it("cancel order", async () => {
    const btnCancelOrder = screen.getAllByText("Hủy đơn hàng");
    expect(btnCancelOrder[0]).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(btnCancelOrder[0]);
    });
    expect(screen.getByText("Đã hủy đơn hàng thành công")).toBeInTheDocument();
  });
  it("delivered order", async () => {
    const btnCancelOrder = screen.getAllByText("Nhận hàng");
    expect(btnCancelOrder[0]).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(btnCancelOrder[0]);
    });
  });
});
