import { getProductByCategory } from "@/api/Product";
import ListProduct from "../ListProduct";

const Category = async ({ categoryID }) => {
  const categoryData = await getProductByCategory(categoryID);

  return (
    <div className="md:w-3/4 mx-auto">
      {/* <p>Danh mục: {searchParams.get("name")}</p> */}
      <ListProduct product={categoryData} />
    </div>
  );
};

export default Category;
