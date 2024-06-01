"use client";
import React, { useEffect, useState } from "react";
import CardCategory from "./CardCategory";
import MenuCategory from "./MenuCategory";
import ListProduct from "../ListProduct";
import { Button, Col, Radio, Row } from "antd";

const CategoryClient = ({ searchParams, categoryData, category }) => {
  const [product, setProduct] = useState(categoryData);
  const [select, setSelect] = useState("all");
  useEffect(() => {
    setProduct(categoryData);
    setSelect("all");
  }, [categoryData]);
  const sortProduct = (e) => {
    const value = e.target.value;
    setSelect(e.target.value);
    let sortedProducts = [...categoryData];
    if (value === "all") {
      sortedProducts = categoryData;
    } else if (value === "name") {
      sortedProducts.sort((a, b) =>
        a.product_name.localeCompare(b.product_name)
      );
    } else if (value === "price") {
      sortedProducts.sort((a, b) => a.product_price - b.product_price);
    } else if (value === "rate") {
      sortedProducts.sort(
        (a, b) => b.product_ratingAverage - a.product_ratingAverage
      );
    } else if (value === "sold") {
      sortedProducts.sort((a, b) => b.product_sold - a.product_sold);
    }
    setProduct(sortedProducts);
  };

  return (
    <div className="xl:w-5/6 mx-auto container">
      <Row justify="space-between">
        <Col span={4} className="hidden xs:flex">
          <MenuCategory category={category} />
        </Col>
        <Col xs={24} sm={20}>
          <CardCategory searchParams={searchParams} category={category} />
          <Button className="h-8 my-2 items-center flex xs::hidden">Lọc</Button>
          <div className="h-8 my-2 items-center hidden xs:flex">
            <p className="pr-2">Sắp xếp theo: </p>
            <Radio.Group
              onChange={sortProduct}
              value={select}
              defaultValue={select}
            >
              <Radio.Button value="all">Tất cả</Radio.Button>
              <Radio.Button value="name">Tên</Radio.Button>
              <Radio.Button value="price">Giá</Radio.Button>
              <Radio.Button value="rate">Đánh giá</Radio.Button>
              <Radio.Button value="sold">Số lượng bán</Radio.Button>
            </Radio.Group>
          </div>
          <ListProduct product={product} />
        </Col>
      </Row>
    </div>
  );
};

export default CategoryClient;
