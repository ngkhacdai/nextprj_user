import { signout } from "@/api/Access";
import { Spin } from "antd";
import React from "react";

const Logout = async () => {
  await signout();

  return <div>{/* <Spin fullscreen /> */}</div>;
};

export default Logout;
