import { getProductByCategory } from "@/api/Product";
import { getAllCategory } from "@/api/Category";
import CategoryClient from "./Category.client";

const Category = async ({ searchParams }) => {
  const categoryData = await getProductByCategory(searchParams.id);
  const category = await getAllCategory();
  return (
    <div>
      <CategoryClient
        searchParams={searchParams}
        categoryData={categoryData}
        category={category}
      />
    </div>
  );
};

export default Category;
