import { GET } from "./route";

export const getDiscountShop = async (id) => {
  const response = await GET(`/discount/ofShop/${id}`);
  return response.message;
};
