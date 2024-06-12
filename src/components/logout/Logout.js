import { signout } from "@/api/Access";
import React from "react";

const Logout = async () => {
  await signout();

  return <div></div>;
};

export default Logout;
