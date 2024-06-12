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
import { Carousel } from "antd";
const Banner = () => {
  return (
    <div className="mb-2 bg-white">
      <Carousel
        autoplay={true}
        autoplaySpeed={3000}
        arrows={true}
        infinite={true}
        waitForAnimate={true}
      >
        <div>
          <img alt="" className="w-full h-96" src={bannerImage.src} />
        </div>
        <div>
          <img alt="" className="w-full h-96" src={bannerImage1.src} />
        </div>
        <div>
          <img alt="" className="w-full h-96" src={bannerImage2.src} />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
