import { getAllCategory } from "@/api/Category";
import { getAllProduct } from "@/api/Product";
import ListProduct from "@/components/ListProduct";
import ListCategory from "@/components/home/ListCategory";
const HomeComponent = async () => {
  const product = await getAllProduct();
  const category = await getAllCategory();

  return (
    <div>
      <ListCategory category={category} />
      <ListProduct product={product} />
    </div>
  );
};

export default HomeComponent;
