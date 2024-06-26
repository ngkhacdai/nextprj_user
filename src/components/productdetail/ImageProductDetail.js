"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { API } from "@/helper/url";
const ImageProductDetail = ({ ProductDetail }) => {
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        slidesPerView={1}
      >
        {ProductDetail.product_thumb.map((item, index) => {
          return (
            <SwiperSlide span={4} key={`product_thumb-${index}`}>
              <img
                alt=""
                src={`${API}/uploads/${item}`}
                className="h-[30rem] w-full"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ImageProductDetail;
