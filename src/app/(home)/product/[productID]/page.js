import ProductDetail from "@/components/productdetail/ProductDetail";

const ProductDetailPage = ({ params }) => {
  return <ProductDetail productID={params.productID} />;
};

export default ProductDetailPage;
