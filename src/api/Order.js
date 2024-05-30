"use server";
import { revalidatePath } from "next/cache";
import { GET, PATCH } from "./route";

export const getAllOrderByStatus = async (status) => {
  const response = await GET(`/checkout/getAllOrderForUser/${status}`);
  return response.message.orderRes.user;
};
export const cancelByUser = async (id, getPathName) => {
  const response = await PATCH(`/checkout/cancelByUser/${id}`);
  revalidatePath(getPathName);
  return response;
};
export const changeStatusByUser = async (form) => {
  const response = await PATCH(`/checkout/changeStatus`, form);
  return response;
};
