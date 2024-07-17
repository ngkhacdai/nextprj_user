"use client";
import { Carousel } from "antd";
import { API } from "@/helper/url";
const ImageProductDetail = ({ ProductDetail }) => {
  return (
    <div>
      <Carousel
        autoplay={true}
        autoplaySpeed={3000}
        arrows={true}
        infinite={true}
        waitForAnimate={true}
      >
        {ProductDetail.product_thumb.map((item, index) => {
          return (
            <img
              key={`image-${index}`}
              alt=""
              src={`${API}/uploads/${item}`}
              className="h-[30rem] w-full"
            />
          );
        })}
      </Carousel>
    </div>
  );
};

export default ImageProductDetail;
