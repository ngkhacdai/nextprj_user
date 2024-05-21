"use client";
import { Layout, Menu, theme } from "antd";
const { Content, Sider } = Layout;
import { FileTextOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
// import "./sidebar.css";
import Link from "next/link";
const SideBar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items = [
    getItem("Thông tin cá nhân", "sub1", <UserOutlined />, [
      getItem(<Link href={"/user"}>Hồ sơ</Link>, "/user"),
      getItem(<Link href={"/user/address"}>Địa chỉ</Link>, "/user/address"),
      getItem(
        <Link href={"/user/changepassword"}>Đổi mật khẩu</Link>,
        "/user/changepassword"
      ),
    ]),

    getItem(
      <Link href={"/user/order"}>Đơn mua</Link>,
      "/user/order",
      <FileTextOutlined />
    ),
  ];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme="dark"
          //   defaultSelectedKeys={[window.location.pathname]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Content
          className={`overflow-x-auto ${
            collapsed ? "w-full" : "w-full md:w-auto"
          }`}
        >
          <div
            className="p-2"
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SideBar;
