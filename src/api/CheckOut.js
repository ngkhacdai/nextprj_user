"use server";
import { POST } from "./route";

export const PayProduct = async (orderData) => {
  await POST("/checkout/oder", orderData);
  return null;
};
