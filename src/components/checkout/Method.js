"use client";
import {
  Button,
  Col,
  ConfigProvider,
  Modal,
  Radio,
  Row,
  Spin,
  notification,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { onSelectIndex } from "@/lib/features/addressSlice";
import { PayProduct } from "@/api/CheckOut";
import { onSelectProduct } from "@/lib/features/cartSlice";

const Method = ({ address }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [value, setValue] = useState("Thanh toán khi nhận hàng");
  const productSelected = useSelector((state) => state.cart.selectProduct);
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectIndex = useSelector((state) => state.address.selectIndex);
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const openNotificationWithIcon = (content) => {
    api["error"]({
      message: "Thông báo lỗi",
      description: content,
    });
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    if (address.length === 0) {
      openNotificationWithIcon("Hãy cập nhật địa chỉ trước");
      setIsModalOpen(false);
      return;
    }
    if (productSelected.length === 0) {
      setIsModalOpen(false);
      return openNotificationWithIcon("Không có sản phẩm nào");
    }
    const shopOrderData = productSelected.map((item) => ({
      shopId: item.shopId,
      shop_discounts: [],
      item_products: [
        {
          price: item.price,
          quantity: item.quantity,
          productId: item.productId,
          color: item.color,
          size: item.size,
        },
      ],
    }));
    const orderData = {
      shop_order_ids: shopOrderData,
      user_address: {
        Home: address[selectIndex]?.nameAddress,
        Address: address[selectIndex]?.customAddress,

        Username: address[selectIndex]?.userinfor?.userName,

        Phonenumber: address[selectIndex]?.userinfor?.phoneNumber,
      },
      user_payment: value,
    };
    setLoading(true);
    dispatch(onSelectIndex(0));
    dispatch(onSelectProduct([]));
    await PayProduct(orderData);
    router.push("/user/order", { shallow: false });
    // window.location.href = "/user/order";
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useState(() => {
    let tong = 0;
    productSelected.map((item) => {
      tong = item.price * item.quantity + tong;
    });
    setTotal(tong);
  }, [productSelected]);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const payhandle = () => {
    showModal();
  };
  if (loading) {
    return <Spin fullscreen />;
  }
  return (
    <div className="bg-white mt-2 p-2">
      {contextHolder}
      <Row gutter={[10, 10]} className="flex text-center py-2">
        <Col>
          <p className="text-xl  mr-3">Phương thức thanh toán</p>
        </Col>
        <Col>
          <Radio.Group onChange={onChange} value={value}>
            <Radio.Button value="Thanh toán khi nhận hàng">
              Thanh toán khi nhận hàng
            </Radio.Button>
            <Radio.Button value="Paypal">Paypal</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      <Row gutter={[10, 10]} justify="end">
        <Col
          xs={{ flex: "100%" }}
          sm={{ flex: "60%" }}
          md={{ flex: "50%" }}
          lg={{ flex: "40%" }}
          xl={{ flex: "30%" }}
          className="flex justify-between"
        >
          <p>Tổng tiền hàng:</p>
          <span className="">
            {total.toLocaleString("en-US", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </Col>
      </Row>
      <Row gutter={[10, 10]} justify="end">
        <Col
          xs={{ flex: "100%" }}
          sm={{ flex: "60%" }}
          md={{ flex: "50%" }}
          lg={{ flex: "40%" }}
          xl={{ flex: "30%" }}
          className="flex justify-between"
        >
          <p className="">Phí vận chuyển:</p>
          <span className="">₫30,000</span>
        </Col>
      </Row>
      <Row gutter={[10, 10]} justify="end">
        <Col
          xs={{ flex: "100%" }}
          sm={{ flex: "60%" }}
          md={{ flex: "50%" }}
          lg={{ flex: "40%" }}
          xl={{ flex: "30%" }}
          className="flex justify-between"
        >
          <p>Tổng tiền hàng:</p>
          <span className=" text-xl text-red-600">
            {(total + 30000).toLocaleString("en-US", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </Col>
      </Row>
      <Row
        justify="space-between"
        gutter={[10, 10]}
        className="flex justify-between p-5 items-center"
      >
        <Col xs={24} sm={24} md={24} lg={17}>
          <p>
            Nhấn {"Đặt hàng"} đồng nghĩa với việc bạn đồng ý tuân theo điều
            khoản của shop
          </p>
        </Col>
        <Col xs={24} sm={24} md={24} lg={7}>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: "#00b96b",
                  algorithm: true,
                },
              },
            }}
          >
            <Button
              onClick={payhandle}
              className="md:w-auto min-w-full h-12"
              type="primary"
            >
              Đặt hàng
            </Button>
          </ConfigProvider>
        </Col>
        <Modal
          title="Thanh toán"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Có"
          cancelText="Hủy"
        >
          <p>Bạn có muốn thanh toán không?</p>
        </Modal>
      </Row>
    </div>
  );
};

export default Method;
