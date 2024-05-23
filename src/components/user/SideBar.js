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
  const [collapsed, setCollapsed] = useState(false);
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
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu theme="dark" mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            height: 35,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </Header>
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
// "use client";
// import { Layout, Menu } from "antd";
// import {
//   FileTextOutlined,
//   UserOutlined,
//   MenuOutlined,
// } from "@ant-design/icons";
// import { useState } from "react";
// import Link from "next/link";

// const { Header, Content, Sider } = Layout;

// const SideBar = ({ children }) => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [drawerVisible, setDrawerVisible] = useState(false);

//   function getItem(label, key, icon, children) {
//     return {
//       key,
//       icon,
//       children,
//       label,
//     };
//   }

//   const items = [
//     getItem("Thông tin cá nhân", "sub1", <UserOutlined />, [
//       getItem(<Link href="/user">Hồ sơ</Link>, "/user"),
//       getItem(<Link href="/user/address">Địa chỉ</Link>, "/user/address"),
//       getItem(
//         <Link href="/user/changepassword">Đổi mật khẩu</Link>,
//         "/user/changepassword"
//       ),
//     ]),
//     getItem(
//       <Link href="/user/order">Đơn mua</Link>,
//       "/user/order",
//       <FileTextOutlined />
//     ),
//   ];

//   const handleToggleDrawer = () => {
//     setDrawerVisible(!drawerVisible);
//   };

//   return (
//     <Layout className="min-h-screen">
//       <Sider
//         breakpoint="md"
//         collapsedWidth="0"
//         collapsible
//         collapsed={collapsed}
//         onCollapse={(value) => setCollapsed(value)}
//         className="hidden md:block"
//       >
//         <Menu theme="dark" mode="inline" items={items} />
//       </Sider>

//       <Layout>
//         <Header className="bg-white shadow-md flex justify-between items-center px-4 md:hidden">
//           <button
//             type="button"
//             onClick={handleToggleDrawer}
//             className="text-xl "
//           >
//             <MenuOutlined />
//           </button>
//         </Header>

//         {drawerVisible && (
//           <div className="fixed inset-0 z-50 flex flex-col bg-gray-800 text-white md:hidden">
//             <div className="flex justify-between items-center p-4">
//               <span className="text-lg">Menu</span>
//               <button
//                 type="button"
//                 onClick={handleToggleDrawer}
//                 className="text-xl"
//               >
//                 <MenuOutlined />
//               </button>
//             </div>
//             <Menu
//               theme="dark"
//               mode="inline"
//               items={items}
//               onClick={handleToggleDrawer}
//             />
//           </div>
//         )}

//         <Content
//           className={`overflow-x-auto ${
//             collapsed ? "w-full" : "w-full md:w-auto"
//           }`}
//         >
//           <div
//             className="p-2"
//             style={{ background: "white", borderRadius: "8px" }}
//           >
//             {children}
//           </div>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default SideBar;
