"use server";
import { GET } from "./route";

export const getAllCategory = async () => {
  const response = await GET("/category/getAllCategory");
  return response.message.category;
};
