import React from "react";
import ReviewClient from "./ReviewClient";

const Review = ({ productID }) => {
  return (
    <div className="md:w-3/4 mx-auto bg-white">
      <ReviewClient productID={productID} />
    </div>
  );
};

export default Review;
