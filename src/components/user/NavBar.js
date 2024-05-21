import { FileTextOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Link from "next/link";
const { Header, Content } = Layout;
const NavBar = ({ children }) => {
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
  return (
    <Layout className="w-full bg-white">
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        ></Menu>
      </Header>
      <Content className="p-2">{children}</Content>
    </Layout>
  );
};

export default NavBar;
