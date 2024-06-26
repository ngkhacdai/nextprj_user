"use client";
import { cancelByUser, changeStatusByUser } from "@/api/Order";
import { API } from "@/helper/url";
import {
  Button,
  Col,
  Dropdown,
  Menu,
  Pagination,
  Row,
  notification,
} from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { CiCircleQuestion, CiShop } from "react-icons/ci";
import { IoMdChatbubbles } from "react-icons/io";
import { MdOutlineLocalShipping } from "react-icons/md";

const ListOrder = ({ orderData }) => {
  const getPathName = usePathname();
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();
  const [orderItem, setOrderItem] = useState(
    orderData
      .sort((a, b) => {
        return new Date(b.crateDate) - new Date(a.crateDate);
      })
      .slice(0, 10)
  );
  const ref = useRef();
  useEffect(() => {
    setOrderItem(
      orderData
        .sort((a, b) => {
          return new Date(b.crateDate) - new Date(a.crateDate);
        })
        .slice(0, 10)
    );
  }, [orderData]);
  const changePage = (page) => {
    ref.current.scrollIntoView();
    setOrderItem(
      orderData
        .sort((a, b) => {
          return new Date(b.crateDate) - new Date(a.crateDate);
        })
        .slice((page - 1) * 10, 10 * page - 1)
    );
  };
  const convertTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hour = ("0" + date.getHours()).slice(-2);
    const minute = ("0" + date.getMinutes()).slice(-2);
    const second = ("0" + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  };
  const deliveredHandle = async (orderID, productID) => {
    const form = {
      order_id: orderID,
      status: "delivered",
    };
    await changeStatusByUser(form);
    router.push(`/review/${productID}`);
  };
  const openNotificationWithIcon = (content) => {
    api["success"]({
      message: "Thông báo xóa thành công",
      description: content,
    });
  };
  const cancelOrder = async (id) => {
    await cancelByUser(id, getPathName);
    openNotificationWithIcon("Đã hủy đơn hàng thành công");
  };
  return (
    <div ref={ref}>
      {contextHolder}
      {orderItem.length <= 0 ? (
        <p className="text-center">Chưa có đơn hàng nào</p>
      ) : (
        orderItem.map((item, index) => {
          return (
            <div key={`order-${index}`}>
              <div className="flex-col flex justify-between xs:flex-row mb-2 mt-2">
                <Col className="flex items-center">
                  <CiShop className="mr-2" />
                  <p className="mr-2  font-bold">{item.name_shop}</p>
                  <Button type="primary" className="mr-2 flex items-center">
                    <IoMdChatbubbles />
                  </Button>
                  <Link href={`/shop/${item.shopId}`}>
                    <Button className="flex items-center">
                      <CiShop />
                    </Button>
                  </Link>
                </Col>
                <Col className="flex justify-end items-center">
                  <MdOutlineLocalShipping />
                  <span className="mx-2">
                    {item.status === "pending" ? (
                      <p>Chờ xác nhận</p>
                    ) : item.status === "confirmed" ? (
                      <p>Đã xác nhận</p>
                    ) : item.status === "shipped" ? (
                      <p>Đơn hàng đang được giao</p>
                    ) : item.status === "delivered" ? (
                      <p>Giao hàng thành công</p>
                    ) : (
                      item.status === "cancelled" && <p>Đơn hàng bị hủy</p>
                    )}
                  </span>
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item>
                          {convertTimestamp(item.crateDate)}
                        </Menu.Item>
                      </Menu>
                    }
                    placement="bottom"
                  >
                    <CiCircleQuestion />
                  </Dropdown>
                </Col>
              </div>
              <div className="flex justify-between mb-2 flex-col xs:flex-row">
                <div className="flex">
                  <img
                    alt=""
                    className="w-24 h-24 mr-2"
                    src={`${API}/uploads/${item.product_thumb[0]}`}
                  />
                  <div className="">
                    <p>{item.product_name}</p>
                    <p>x{item.product_attributes.quantity}</p>
                    <p>Màu: {item.product_attributes.color}</p>
                    <p> kích cỡ: {item.product_attributes.size}</p>
                  </div>
                </div>
                <div className="text-red-500 text-right">
                  {(
                    item.order_checkout.totalPrice + item.order_checkout.feeShip
                  ).toLocaleString("en-US", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
              </div>
              <div className="flex justify-end mb-2">
                {item.status === "pending" || item.status === "confirmed" ? (
                  <Button onClick={() => cancelOrder(item.oderId)}>
                    Hủy đơn hàng
                  </Button>
                ) : item.status === "shipped" ? (
                  <Button
                    onClick={() =>
                      deliveredHandle(
                        item.oderId,
                        item.product_attributes.productId
                      )
                    }
                    className="mr-2"
                    type="primary"
                  >
                    Nhận hàng
                  </Button>
                ) : (
                  <Link href={`/product/${item.product_attributes.productId}`}>
                    <Button className="mr-2" type="primary">
                      Mua lại
                    </Button>
                  </Link>
                )}
              </div>
              <hr />
            </div>
          );
        })
      )}
      {orderItem.length > 0 && (
        <Pagination
          className="p-2 text-center"
          defaultCurrent={1}
          total={orderData.length}
          pageSize={10}
          showSizeChanger={false}
          onChange={changePage}
        />
      )}
    </div>
  );
};

export default ListOrder;
