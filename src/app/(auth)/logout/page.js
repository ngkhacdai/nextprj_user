import Logout from "@/components/logout/Logout";
import { Spin } from "antd";

const LogoutPage = () => {
  return (
    <div>
      <Spin fullscreen />
      <Logout />
    </div>
  );
};

export default LogoutPage;
