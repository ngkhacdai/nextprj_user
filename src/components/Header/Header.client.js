"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Col, Row, Input, Space, Dropdown } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import logo from "@/assets/trustybuy.png";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "@/lib/features/userSlice";
import { signout } from "@/api/Access";
import { API } from "@/helper/url";

const { Search } = Input;

const Header = (props) => {
  const { data } = props;
  const profile = data;
  const router = useRouter();

  const items = [
    {
      label: <Link href="/user">Tài khoản của tôi</Link>,
      key: "0",
    },
    {
      label: <Link href="/user/order">Đơn mua</Link>,
      key: "1",
    },
    {
      label: <div onClick={() => logOut()}>Đăng xuất</div>,
      key: "2",
    },
  ];
  const items2 = [
    {
      label: <Link href="/user">Tài khoản của tôi</Link>,
      key: "0",
    },
    {
      label: <Link href="/cart">Giỏ hàng</Link>,
      key: "1",
    },
    {
      label: <Link href="/user/order">Đơn mua</Link>,
      key: "2",
    },
    {
      label: <div onClick={() => logOut()}>Đăng xuất</div>,
      key: "3",
    },
  ];
  const logOut = async () => {
    await signout();
  };
  const onSearch = (value) => {
    if (value === "") {
      return router.push("/");
    } else {
      router.push(`/search?keyword=${value}`);
    }
  };

  return (
    <div className="md:w-5/6 container mx-auto">
      <Row
        justify="space-between"
        gutter={[0, 0]}
        style={{
          alignItems: "center",
        }}
      >
        <Col xs={6} sm={5}>
          <Link href="/">
            <img src={logo.src} className="w-28" alt="TrustyBuy Logo" />
          </Link>
        </Col>
        <Col xs={13} sm={13} md={11} lg={11} xl={11}>
          <Search onSearch={onSearch} placeholder="Tìm kiếm sản phẩm" />
        </Col>

        <Col
          className=" text-right mdant:flex hidden items-center justify-end"
          span={8}
        >
          <Link href="/cart">
            <ShoppingCartOutlined
              style={{ fontSize: "20px", color: "black" }}
              className="cursor-pointer pr-2"
            />
          </Link>
          <Dropdown className="" menu={{ items }}>
            <Space className="cursor-pointer flex items-center break-words">
              <p>
                <img
                  alt=""
                  className="rounded-full mx-2 w-10 h-10"
                  src={`${API}/${data.information.avatar}`}
                />
              </p>
              <p>
                {profile?.information?.fullName || <div>Chưa có thông tin</div>}
              </p>
            </Space>
          </Dropdown>
        </Col>
        <Col className="mdant:hidden">
          <Dropdown menu={{ items: items2 }}>
            <Space className="cursor-pointer mx-2 flex justify-end break-words">
              <p>
                <img
                  alt=""
                  className="rounded-full w-10 h-10"
                  src={`${API}/${data.information.avatar}`}
                />
              </p>
            </Space>
          </Dropdown>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
