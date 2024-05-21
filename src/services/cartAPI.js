"use server";
import axios from "@/services/customAxios";
import { cookies } from "next/headers";

export const addProductToCart = async (form) => {
  const response = await axios.post("/cartv2", form);
  return response;
};
export const getCart = async () => {
  const response = await axios.get("/cartv2");
  return response.message.cart;
};

export const deleteProductInCart = async (form) => {
  const response = await axios.post("/cartv2/delete", form);
  return response.message;
};

export const updateUserCartQuantity = async (shop_order_ids) => {
  const formdata = {
    userId: cookies().get("userID").value,
    shop_order_ids,
  };
  const response = await axios.post("/cartv2/update", formdata);
  return response.message;
};
