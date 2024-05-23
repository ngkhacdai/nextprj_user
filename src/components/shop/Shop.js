import HeaderShop from "./HeaderShop";
import ListProductShop from "./ListProductShop";
import ListDiscount from "./ListDiscount";
import { getShop } from "@/api/Shop";
import { getDiscountShop } from "@/api/Discount";

const Shop = async ({ shopID }) => {
  const shopData = await getShop(shopID);
  const shopDiscount = await getDiscountShop(shopID);

  return (
    <div>
      <div className="bg-white">
        <HeaderShop shopData={shopData} />
      </div>
      <div className="md:w-3/4  mx-auto mt-2">
        <ListDiscount shopDiscount={shopDiscount} />
        <ListProductShop shopData={shopData} />
      </div>
    </div>
  );
};

export default Shop;
