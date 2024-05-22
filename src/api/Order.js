"use server";
import { GET } from "./route";

export const getAllOrderByStatus = async (status) => {
  const response = await GET(`/checkout/getAllOrderForUser/${status}`);
  return response.message.orderRes.user;
};
