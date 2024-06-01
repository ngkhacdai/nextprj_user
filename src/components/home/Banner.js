"use client";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import bannerImage from "@/assets/3876451.jpg";
import bannerImage1 from "@/assets/5827763.jpg";
import bannerImage2 from "@/assets/9787933.jpg";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
const Banner = () => {
  return (
    <div className="mb-2">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        className="w-full h-56"
      >
        <SwiperSlide>
          <img alt="" className="w-full h-56" src={bannerImage.src} />
        </SwiperSlide>
        <SwiperSlide>
          <img alt="" className="w-full h-56" src={bannerImage1.src} />
        </SwiperSlide>
        <SwiperSlide>
          <img alt="" className="w-full h-56" src={bannerImage2.src} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
