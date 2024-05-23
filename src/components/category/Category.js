import { getProductByCategory } from "@/api/Product";
import ListProduct from "../ListProduct";

const Category = async ({ searchParams }) => {
  const categoryData = await getProductByCategory(searchParams.id);

  return (
    <div className="md:w-3/4 mx-auto">
      <p>Danh mục: {searchParams.name}</p>
      <ListProduct product={categoryData} />
    </div>
  );
};

export default Category;
