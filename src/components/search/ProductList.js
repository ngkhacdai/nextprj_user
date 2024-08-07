"use client";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import ListProduct from "../ListProduct";
import Fillter from "./Fillter";
import { useSearchParams } from "next/navigation";

const ProductList = ({ productData }) => {
  const [productSearch, setProductSearch] = useState([]);
  const [product, setProduct] = useState(productData);
  const searchParams = useSearchParams();
  const searchText = searchParams.get("keyword");
  useEffect(() => {
    const getData = async () => {
      setProductSearch(
        product.filter((product) =>
          product.product_name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    };
    getData();
  }, [searchText]);

  // const handleSearch = () => {
  //   const pathParts = searchParams.get("keyword");
  //   // const encodedSearch = pathParts[1];
  //   const decodedSearch = decodeURIComponent(pathParts).toLowerCase();
  //   return decodedSearch;
  // };

  const sortProduct = (sortedProducts) => {
    setProductSearch([...sortedProducts]);
  };

  return (
    <div>
      <Row
        gutter={[0, 10]}
        justify="space-between"
        className="flex items-center"
      >
        <Col className="text-xl">
          Kết quả tìm kiếm:
          {'"' + searchParams.get("keyword") + '"'}
        </Col>
        <Col>
          <Fillter productSearch={product} sortProduct={sortProduct} />
        </Col>
      </Row>
      {productSearch.length === 0 ? (
        <div className="text-center">Không tìm thấy sản phẩm nào</div>
      ) : (
        <ListProduct product={productSearch} />
      )}
    </div>
  );
};

export default ProductList;
