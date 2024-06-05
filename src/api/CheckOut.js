"use server";
import { revalidatePath } from "next/cache";
import { POST } from "./route";

export const PayProduct = async (orderData) => {
  await POST("/checkout/oder", orderData);
  revalidatePath("/user/order");
  return null;
};
