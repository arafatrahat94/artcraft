import React from "react";
import img1 from "../../../assets/bannerEl/Dark Green Minimalist Aesthetic Modern Paper Texture Brand Fashion Logo (1).png";
import img2 from "../../../assets/bannerEl/Dark Green Minimalist Aesthetic Modern Paper Texture Brand Fashion Logo (11).png";
import img4 from "../../../assets/bannerEl/Dark Green Minimalist Aesthetic Modern Paper Texture Brand Fashion Logo (4).png";
// swiper import code
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
// swiper banner images
import banenr1 from "../../../assets/sliderImage/banner9.png";
import banenr2 from "../../../assets/sliderImage/banner8.png";
import banenr3 from "../../../assets/sliderImage/banner7.png";
import banenr4 from "../../../assets/sliderImage/banner6.png";
import banenr5 from "../../../assets/sliderImage/banner5.png";
// import required modules
import { Autoplay, EffectFade } from "swiper/modules";
const Banner = () => {
  return (
    <div className="k h-[600px]">
      <div className="grid grid-cols-2  h-full ">
        <div className="ms-14 mt-32">
          <h1 className="text-5xl font-Montserrat font-bold  text-gray-800">
            <span className="theme-text">The</span> Most Creative{" "}
            <span className="font-KaushanScript ">Art School </span>&nbsp; That
            can Develop Your Talent
          </h1>
          <img
            className="w-80 absolute -z-0 left-40 bottom-1/3"
            src={img4}
            alt=""
          />
          <button className="btn theme-color1 border-none font-Montserrat font-bold normal-case text-xl text-white  h-16 mt-5 w-[220px]">
            Enroll Now
          </button>
        </div>
        <div>
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            effect={"fade"}
            modules={[EffectFade, Autoplay]}
            className="mySwiper"
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
          >
            <SwiperSlide>
              <img className="bg-white" src={banenr1} />
            </SwiperSlide>
            <SwiperSlide>
              <img className="bg-white" src={banenr2} />
            </SwiperSlide>
            <SwiperSlide>
              <img className="bg-white" src={banenr3} />
            </SwiperSlide>
            <SwiperSlide>
              <img className="bg-white" src={banenr4} />
            </SwiperSlide>
            <SwiperSlide>
              <img className="bg-white w-11/12" src={banenr5} />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="">
        <img
          className="w-72 opacity-60 -z-30 absolute top-1"
          src={img1}
          alt=""
        />
      </div>
    </div>
  );
};

export default Banner;
