import HeaderShop from "./HeaderShop";
import ListProductShop from "./ListProductShop";
import ListDiscount from "./ListDiscount";
import { getShop } from "@/api/Shop";
import { getDiscountShop } from "@/api/Discount";
import { cookies } from "next/headers";

const Shop = async ({ shopID }) => {
  const shopData = await getShop(shopID);
  const shopDiscount = await getDiscountShop(shopID);
  const userID = cookies().get("userID").value;
  console.log(userID);
  return (
    <div>
      <div className="mt-2">
        <HeaderShop userID={userID} shopData={shopData} />
      </div>
      <div className="md:w-5/6 mx-auto mt-2">
        <ListDiscount shopDiscount={shopDiscount} />
        <ListProductShop shopData={shopData} />
      </div>
    </div>
  );
};

export default Shop;
