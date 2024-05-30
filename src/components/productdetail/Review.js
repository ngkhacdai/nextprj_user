"use client";
import { Col, Rate, Row } from "antd";
import React from "react";

// Function to calculate the rating distribution
const calculateRatingDistribution = (reviews) => {
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((review) => {
    distribution[review.rating] += 1;
  });
  return distribution;
};

// Component to display the rating breakdown
const RatingBreakdown = ({ distribution }) => {
  const totalRatings = Object.values(distribution).reduce(
    (acc, num) => acc + num,
    0
  );

  return (
    <div className="mt-2">
      {Object.keys(distribution).map((rating) => (
        <div key={rating} className="flex items-center my-1">
          <span className="mr-2">{rating} Star</span>
          <div className="flex-1 bg-gray-200 h-4 relative">
            <div
              className="bg-black h-4"
              style={{
                width: `${(distribution[rating] / totalRatings) * 100}%`,
              }}
            />
          </div>
          <span className="ml-2">{distribution[rating]}</span>
        </div>
      ))}
    </div>
  );
};

const Review = ({ productDetail }) => {
  const ratingDistribution = calculateRatingDistribution(
    productDetail?.reviews === "Chưa có đánh giá nào"
      ? []
      : productDetail?.reviews
  );
  return (
    <div className="bg-white mt-2 p-2">
      <p>Người dùng đánh giá</p>
      <Row className="items-center">
        <Col span={8}>
          <div className="text-center">
            <p className="font-bold text-xl">
              {productDetail?.product_ratingAverage}
            </p>
            <Rate
              allowHalf
              defaultValue={productDetail?.product_ratingAverage}
              disabled
            />
            <p>
              {productDetail?.reviews === "Chưa có đánh giá nào"
                ? 0
                : productDetail?.reviews.length}{" "}
              đánh giá
            </p>
          </div>
        </Col>
        <Col span={16}>
          <RatingBreakdown distribution={ratingDistribution} />
        </Col>
      </Row>
    </div>
  );
};

export default Review;