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
import { scroller } from "react-scroll";
const Banner = () => {
  const scrollToElement = (element) => {
    scroller.scrollTo(element, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };
  return (
    <div className=" lg:h-[550px]">
      <div className="flex flex-col-reverse lg:flex-row w-full h-full ">
        <div className="lg:ms-14 mx-5 lg:w-1/2 lg:mt-32 ">
          <h1 className="lg:text-5xl font-Montserrat font-bold text-4xl text-gray-800">
            <span className="theme-text text-3xl">The</span> Most Creative{" "}
            <span className="font-KaushanScript text-4xl">Art School </span>
            &nbsp; That can Develop Your Talent
          </h1>
          <img
            className="lg:w-80 w-[200px] absolute -z-0 lg:left-40  left-36 bottom-1/3"
            src={img4}
            alt=""
          />
          <button
            onClick={() => scrollToElement("Courses")}
            className="btn theme-color1 border-none font-Montserrat font-bold normal-case text-xl text-white z-0 h-16 mt-5 w-[220px]"
          >
            Enroll Now
          </button>
        </div>
        <div
          className="lg:w-1/2
        "
        >
          <Swiper
            spaceBetween={100}
            slidesPerView={1}
            effect={window.innerWidth >= 1000 ? "fade" : ""}
            modules={[EffectFade, Autoplay]}
            className="mySwiper "
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
          >
            <SwiperSlide>
              <img className="lg:bg-white" src={banenr1} />
            </SwiperSlide>
            <SwiperSlide>
              <img className=" lg:bg-white" src={banenr2} />
            </SwiperSlide>
            <SwiperSlide>
              <img className="lg:bg-white" src={banenr3} />
            </SwiperSlide>
            <SwiperSlide>
              <img className="lg:bg-white" src={banenr4} />
            </SwiperSlide>
            <SwiperSlide>
              <img className="lg:bg-white w-11/12" src={banenr5} />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="">
        <img
          className="lg:w-72 w-56 opacity-60 -z-30 absolute top-1"
          src={img1}
          alt=""
        />
      </div>
    </div>
  );
};

export default Banner;
