import ProductList from "./ProductList";
import { getAllProduct } from "@/api/Product";

const Search = async () => {
  const productData = await getAllProduct();
  return (
    <div className="md:w-3/4 mx-auto">
      <ProductList productData={productData} />
    </div>
  );
};

export default Search;
