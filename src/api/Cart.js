"use server";
import { revalidatePath } from "next/cache";
import { GET, POST } from "./route";
import { cookies } from "next/headers";

export const addProductToCart = async (product) => {
  const form = {
    userId: cookies().get("userID").value,
    product,
  };
  const response = await POST("/cartv2", form);

  return response;
};
export const getCart = async () => {
  const response = await GET("/cartv2");
  revalidatePath("/cart");
  return response.message.cart.cart_products;
};

export const deleteProductInCart = async (form) => {
  const response = await POST("/cartv2/delete", form);
  revalidatePath("/cart");
  return response.message;
};

export const updateUserCartQuantity = async (shop_order_ids) => {
  const formdata = {
    userId: cookies().get("userID").value,
    shop_order_ids,
  };
  const response = await POST("/cartv2/update", formdata);
  revalidatePath("/cart");
  return response.message;
};
