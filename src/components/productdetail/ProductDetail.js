import { Col, Row } from "antd";
import ImageProductDetail from "./ImageProductDetail";
import ProductInfo from "./ProductInfo";
import ShopInfor from "./ShopInfor";
import Descaption from "./Descaption";
import { getProduct } from "@/api/Product";
import Review from "./Review";

const ProductDetail = async ({ productID }) => {
  const productDetail = await getProduct(productID);
  return (
    <div>
      <div className=" md:w-3/4  mx-auto">
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
      </div>
    </div>
  );
};

export default ProductDetail;
