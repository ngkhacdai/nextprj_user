"use client";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import ListProduct from "../ListProduct";
import Fillter from "./Fillter";

const ProductList = ({ productData }) => {
  const [productSearch, setProductSearch] = useState([]);
  const [product, setProduct] = useState();

  useEffect(() => {
    const getData = async () => {
      setProductSearch(
        product.filter((product) =>
          product.product_name.toLowerCase().includes(searchText)
        )
      );
      setProduct(
        product.filter((product) =>
          product.product_name.toLowerCase().includes(searchText)
        )
      );
    };
    getData();
  }, []);

  const handleSearch = () => {
    const pathParts = window.location.search.split("?")[1];
    // const encodedSearch = pathParts[1];
    const decodedSearch = decodeURIComponent(pathParts).toLowerCase();
    return decodedSearch;
  };

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
          {'"' + window.location.search.split("?")[1] + '"'}
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
