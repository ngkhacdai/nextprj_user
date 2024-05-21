"use client";
import { Layout, Menu, theme } from "antd";
import Link from "next/link";
const { Header, Content } = Layout;

const NavOrder = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const items = [
    {
      key: "1",
      label: <Link href={"/user/order"}>Chờ xác nhận</Link>,
    },
    {
      key: "2",
      label: <Link href={"/user/order/confirmed"}>Xác nhận</Link>,
    },
    {
      key: "3",
      label: <Link href={"/user/order/shipped"}>Đang giao</Link>,
    },
    {
      key: "4",
      label: <Link href={"/user/order/cancelled"}>Đã hủy</Link>,
    },
    {
      key: "5",
      label: <Link href={"/user/order/delivered"}>Đã nhận</Link>,
    },
  ];
  return (
    <div>
      <div>
        <Layout>
          <Header
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <div className="demo-logo" />
            <Menu
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              items={items}
              style={{ flex: 1, minWidth: 0 }}
            />
          </Header>
          <Content>
            <div
              style={{
                background: colorBgContainer,
                minHeight: 280,
                padding: 24,
                borderRadius: borderRadiusLG,
              }}
            >
              {children}
            </div>
          </Content>
        </Layout>
      </div>
    </div>
  );
};

export default NavOrder;
