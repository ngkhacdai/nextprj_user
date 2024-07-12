import { getAllCategory } from "@/api/Category";
import { getAllProduct } from "@/api/Product";
import ListProduct from "@/components/ListProduct";
import ListCategory from "@/components/home/ListCategory";
import Banner from "./Banner";
const HomeComponent = async () => {
  const product = await getAllProduct();
  const category = await getAllCategory();

  return (
    <div>
      <Banner />
      <ListCategory category={category} />
      <ListProduct product={product} />
    </div>
  );
};

export default HomeComponent;
