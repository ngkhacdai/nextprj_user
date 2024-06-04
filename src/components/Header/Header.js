import React from "react";
import Header from "./Header.client";
import { getProfile } from "@/api/User";

export default async function HeaderComponent() {
  const response = await getProfile();

  return (
    <div className="drop-shadow-lg border-inherit border-b-2">
      <Header data={response} />
    </div>
  );
}
