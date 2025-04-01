import React, { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BannerSlider = ({images}) => {
  console.log("Images in BannerSlider:", images); // Log the images prop
  return (
    <div className="w-100 mx-auto my-1 rounded-[15px] overflow-hidden shadow-md">
      <Swiper
        modules={[ Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={images.length > 1} // ✅ Enable loop only if images.length > 1
        className="w-[100%]"
      >
        {images?.length > 0 ? (
          images.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img.image} alt={`Banner ${index + 1}`} className="w-full  object-cover rounded-[10px]" />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <p>Loading...</p>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default memo(BannerSlider);
