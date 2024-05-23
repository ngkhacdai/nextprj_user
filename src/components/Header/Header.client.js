"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Col, Image, Row, Input, Space, Dropdown, Spin } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import logo from "@/assets/trustybuy.png";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "@/lib/features/userSlice";
import { signout } from "@/api/Access";

const { Search } = Input;

const Header = (props) => {
  const { data } = props;
  const dispatch = useDispatch();
  const profile = data;
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const items = [
    {
      label: <Link href="/user">Tài khoản của tôi</Link>,
      key: "0",
    },
    {
      label: <div onClick={() => logOut()}>Đăng xuất</div>,
      key: "1",
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
    <div className="md:w-3/4 mx-auto">
      <Row
        justify="space-between"
        gutter={[0, 0]}
        style={{
          alignItems: "center",
        }}
      >
        <Col span={5}>
          <Link href="/">
            <Image
              preview={false}
              src={logo.src}
              style={{ height: 100 }}
              alt="TrustyBuy Logo"
            />
          </Link>
        </Col>
        <Col xs={9} sm={11} md={13} lg={12} xl={12}>
          <Search onSearch={onSearch} placeholder="Tìm kiếm sản phẩm" />
        </Col>
        <Col span={1}>
          <Link href="/cart">
            <ShoppingCartOutlined
              style={{ fontSize: "20px", color: "black" }}
              className="cursor-pointer"
            />
          </Link>
        </Col>
        <Col span={5}>
          <Dropdown menu={{ items }}>
            <Space className="cursor-pointer break-words">
              {profile?.information?.fullName || <div>Chưa có thông tin</div>}
            </Space>
          </Dropdown>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
