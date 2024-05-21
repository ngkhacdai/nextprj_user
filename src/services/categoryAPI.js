"use server";
import axios from "@/services/customAxios";

export const getAllCategory = async () => {
  const response = await axios.get("/category/getAllCategory");
  return response.message.category;
};
