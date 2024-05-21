import "../globals.css";
import { Inter } from "next/font/google";
import { Col, Dropdown, Image, Row, Space } from "antd";
import Link from "next/link";
import Search from "antd/es/transfer/search";
import { ShoppingCartOutlined } from "@ant-design/icons";
import logo from "@/assets/trustybuy.png";
import StoreProvider from "@/lib/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home",
};

const items = [
  {
    label: <Link href="/user">Tài khoản của tôi</Link>,
    key: "0",
  },
  {
    label: <Link href="/logout">Đăng xuất</Link>,
    key: "1",
  },
];

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </head>
        <body className={inter.className}>
          <header className="bg-green-300">
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
                  <Search placeholder="Tìm kiếm sản phẩm" />
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
                  <Dropdown
                    menu={{
                      items,
                    }}
                  >
                    <Space className="cursor-pointer">ngkhacdai</Space>
                  </Dropdown>
                </Col>
              </Row>
            </div>
          </header>
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}
