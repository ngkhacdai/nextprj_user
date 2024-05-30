"use client";
import { Col, Rate, Row } from "antd";
import React from "react";

const Review = ({ productDetail }) => {
  console.log(productDetail);
  return (
    <div className="bg-white mt-2 p-2">
      <p>Người dùng đánh giá</p>
      <Row>
        <Col>
          <div className="text-center">
            <p className="font-bold text-xl">
              {productDetail?.product_ratingAverage}
            </p>
            <Rate
              allowHalf
              defaultValue={productDetail?.product_ratingAverage}
              disabled
            />
            <p>{productDetail?.reviews.length} đánh giá</p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Review;
