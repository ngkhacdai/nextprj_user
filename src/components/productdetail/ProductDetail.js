import { Col, Row } from "antd";
import ImageProductDetail from "./ImageProductDetail";
import ProductInfo from "./ProductInfo";
import ShopInfor from "./ShopInfor";
import Descaption from "./Descaption";
import { getProduct } from "@/api/Product";
import Review from "./Review";
import { getShop } from "@/api/Shop";
import ListProduct from "../ListProduct";
import ListProductShop from "./ListProductShop";

const ProductDetail = async ({ productID }) => {
  const productDetail = await getProduct(productID);
  const shopData = await getShop(productDetail.shop_id);
  return (
    <div>
      <div className=" md:w-5/6 mx-auto">
        <Row className="bg-white p-2">
          <Col xs={24} sm={24} md={24} lg={24} xl={11}>
            <ImageProductDetail ProductDetail={productDetail} />
          </Col>
          <Col className="pl-2" xs={24} sm={18} md={16} lg={24} xl={11}>
            <ProductInfo ProductDetail={productDetail} />
          </Col>
        </Row>
        <div>
          <ShopInfor ProductDetail={productDetail} />
        </div>
        <div>
          <Review productDetail={productDetail} />
        </div>
        <div>
          <Descaption ProductDetail={productDetail} />
        </div>
        <div className="mt-2">
          <p className="">Sản phẩm khác của shop</p>
          <ListProductShop product={shopData.products.slice(0, 6)} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
