"use server";

import { GET } from "./route";

export const getShop = async (id) => {
  const response = await GET(`/shop/getShop/${id}`);
  return response.message;
};
