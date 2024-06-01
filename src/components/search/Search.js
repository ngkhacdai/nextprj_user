import ProductList from "./ProductList";
import { getAllProduct } from "@/api/Product";

const Search = async () => {
  const productData = await getAllProduct();
  return (
    <div className="md:w-5/6 mx-auto">
      <ProductList productData={productData} />
    </div>
  );
};

export default Search;
