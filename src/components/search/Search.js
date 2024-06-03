const ProductList = dynamic(() => import("./ProductList"), { ssr: false });
import { getAllProduct } from "@/api/Product";
import dynamic from "next/dynamic";

const Search = async () => {
  const productData = await getAllProduct();
  return (
    <div className="md:w-5/6 mx-auto">
      <ProductList productData={productData} />
    </div>
  );
};

export default Search;
