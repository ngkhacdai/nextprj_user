import { GET } from "./route";

export const getAllProduct = async () => {
  const response = await GET("/product/getAllProductByUser");
  return response.message.allProduct;
};

export const getProduct = async (id) => {
  const response = await GET(`/product/getProduct/${id}`);
  return response.message;
};
export const findProduct = async (name) => {
  const response = await GET(`/product/findProduct/${name}`);
  return response.message;
};

export const getProductByCategory = async (id) => {
  const response = await GET(`/product/ofCategory/${id}`);
  return response.message.allProduct;
};
