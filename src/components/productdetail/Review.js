"use client";
import { Col, Rate, Row } from "antd";
import dynamic from "next/dynamic";
import React from "react";
import { FaStar } from "react-icons/fa6";
const ListReview = dynamic(() => import("./ListReview"), { ssr: false });

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
          <span className="mr-2 flex items-center">
            {rating} <FaStar className="text-yellow-400" />
          </span>
          <div className="flex-1 rounded-lg bg-gray-200 h-4 relative">
            <div
              className="bg-yellow-400 rounded-lg h-4"
              style={{
                width: `${
                  totalRatings ? (distribution[rating] / totalRatings) * 100 : 0
                }%`,
              }}
            />
          </div>
          <span className="ml-2 w-10">
            {totalRatings
              ? Math.round((distribution[rating] / totalRatings) * 100)
              : 0}
            %
          </span>
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
      <div>Người dùng đánh giá</div>
      <Row gutter={[10, 10]}>
        <Col xs={24} sm={6}>
          <div className="text-center">
            <div className="font-bold text-xl">
              {productDetail?.product_ratingAverage} trên 5
            </div>
            <Rate
              allowHalf
              defaultValue={productDetail?.product_ratingAverage}
              disabled
            />
            <div>
              {productDetail?.reviews === "Chưa có đánh giá nào"
                ? 0
                : productDetail?.reviews.length}{" "}
              đánh giá
            </div>
          </div>
        </Col>
        <Col xs={24} sm={18}>
          <RatingBreakdown distribution={ratingDistribution} />
          <div className="py-2">
            <ListReview reviews={productDetail.reviews} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Review;
