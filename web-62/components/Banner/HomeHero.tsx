"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// @ts-ignore: no type declarations for CSS side-effect import
import "swiper/css";
// @ts-ignore: no type declarations for CSS side-effect import
import "swiper/css/navigation";
export default function HomeHero() {
  return (
    <section className="w-full h-100">
      <Swiper
        modules={[Navigation]}
        navigation
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <img
            src="https://placehold.co/1900x400"
            width={1900}
            height={400}
            alt="banner"
            className="w-full h-100"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://placehold.co/1900x400"
            width={1900}
            height={400}
            alt="banner"
            className="w-full h-100"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://placehold.co/1900x400"
            width={1900}
            height={400}
            alt="banner"
            className="w-full h-100"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://placehold.co/1900x400"
            width={1900}
            height={400}
            alt="banner"
            className="w-full h-100"
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
