"use server";
import { revalidatePath } from "next/cache";
import { GET, POST, PUT } from "./route";

export const getProfile = async () => {
  const response = await GET("/user/getProfile");
  return response.message.checkUser;
};

export const getAddress = async () => {
  const response = await GET("/user/getAddress");
  return response.message.information.address;
};

export const addAddress = async (form) => {
  const response = await POST("/user/addAddress", form);
  revalidatePath("/user/address");
  return response.message;
};
export const deleteAddress = async (form) => {
  const response = await PUT("/user/deleteAddress", form);
  revalidatePath("/user/address");
  return response;
};

export const updateProfile = async (form) => {
  const response = await PUT("/user/updateUser", form);
  return response;
};
export const changePassword = async (form) => {
  const response = await PUT("/user/changePassword", form);
  return response;
};
export const followShop = async (idShop) => {
  const response = await GET(`/user/followShop/${idShop}`);
  return response;
};
