"use client";
import { Button, Layout, Menu, theme } from "antd";
const { Header, Content, Sider } = Layout;
import {
  FileTextOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true); // Set initial state to true to collapse the menu by default
  const pathName = usePathname();

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
        breakpoint="md"
        collapsible
        collapsedWidth={0}
        trigger={null}
        collapsed={collapsed}
        className="sticky bg-white min-h-120 hidden mdant:block top-28 left-0 border-r-inherit border-r-2"
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme="light"
          defaultSelectedKeys={pathName}
          mode="inline"
          className="bg-white"
          items={items}
        />
      </Sider>
      <Layout className="max-h-120 w-full bg-white">
        <Header
          style={{
            zIndex: 10,
            padding: 0,
            height: 30,
            lineHeight: 2,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </Header>

        <Menu
          // theme="dark"
          defaultSelectedKeys={pathName}
          onClick={() => {
            setCollapsed(!collapsed);
          }}
          mode="inline"
          items={items}
          className={`block sticky z-10 top-36  transition-all duration-300 mdant:hidden ${
            collapsed ? "hidden opacity-0" : "opacity-100"
          }`} // Hide the menu when collapsed
        />
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
