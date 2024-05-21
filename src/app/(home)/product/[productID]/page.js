"use client";
import Descaption from "@/components/productdetail/Descaption";
import ImageProductDetail from "@/components/productdetail/ImageProductDetail";
import ProductInfo from "@/components/productdetail/ProductInfo";
import ShopInfor from "@/components/productdetail/ShopInfor";
import { getProduct } from "@/services/productAPI";
import { Col, Row, Spin } from "antd";
import { useEffect, useState } from "react";

const ProductDetail = ({ params }) => {
  const [ProductDetail, setProductDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      setProductDetail(await getProduct(params.productID));
      setIsLoading(false);
    };
    getData();
  }, []);

  if (isLoading) {
    return <Spin fullscreen />;
  }
  return (
    <div>
      <div className=" md:w-3/4  mx-auto">
        <Row className="bg-white p-2">
          <Col xs={24} sm={24} md={24} lg={24} xl={11}>
            <ImageProductDetail ProductDetail={ProductDetail} />
          </Col>
          <Col className="pl-2" xs={24} sm={18} md={16} lg={24} xl={11}>
            <ProductInfo ProductDetail={ProductDetail} />
          </Col>
        </Row>
        <div>
          <ShopInfor ProductDetail={ProductDetail} />
        </div>
        <div>
          <Descaption ProductDetail={ProductDetail} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
