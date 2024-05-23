import React from "react";
import Header from "./Header.client";
import { getProfile } from "@/api/User";

export default async function HeaderComponent() {
  const response = await getProfile();

  return <Header data={response} />;
}
