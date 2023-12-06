import img1 from "../../../assets/bannerEl/Dark Green Minimalist Aesthetic Modern Paper Texture Brand Fashion Logo (1).png";

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

// import required modules
import "./banner.css";
import { Autoplay } from "swiper/modules";

const Banner = () => {
  return (
    <div className=" transform duration-300 transition-transform ">
      <div className="flex flex-col-reverse lg:flex-row xl:p-12 h-full">
        <div className="lg:ms-14 mx-5 lg:w-1/2 lg:mt-32 ">
          <h1
            className={`lg:text-5xl xl:text-[55px] font-Montserrat text-black dark:text-white font-bold text-4xl  `}
          >
            <span className="theme-text2 before:-z-[1] before:text-black relative text-3xl before:top-[-2px]  before:left-[-2px] before:absolute before:content-['The']">
              The
            </span>{" "}
            Most Creative{" "}
            <span className="font-KaushanScript text-4xl lg:text-4xl xl:text-5xl theme-text2">
              Art School{" "}
            </span>
            &nbsp; That can Develop Your Talent
          </h1>
          <img
            loading="lazy"
            className="lg:w-80 w-[200px] absolute -z-10 lg:left-40  left-36 bottom-[40%]"
            src={img4}
            alt=""
          />
          <a href="#Courses" className="">
            <div className="Enroll ">
              Enroll Now
              <div className="star-1">
                <svg
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 784.11 815.53"
                  style={{
                    shapeRendering: "geometricPrecision",
                    textRendering: "geometricPrecision",
                    imageRendering: "optimizeQuality",
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                  }}
                  version="1.1"
                  xmlSpace="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs />
                  <g id="Layer_x0020_1">
                    <metadata id="CorelCorpID_0Corel-Layer" />
                    <path
                      d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                      className="fil0"
                    />
                  </g>
                </svg>
              </div>
              <div className="star-2">
                <svg
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 784.11 815.53"
                  style={{
                    shapeRendering: "geometricPrecision",
                    textRendering: "geometricPrecision",
                    imageRendering: "optimizeQuality",
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                  }}
                  version="1.1"
                  xmlSpace="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs />
                  <g id="Layer_x0020_1">
                    <metadata id="CorelCorpID_0Corel-Layer" />
                    <path
                      d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                      className="fil0"
                    />
                  </g>
                </svg>
              </div>
              <div className="star-3">
                <svg
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 784.11 815.53"
                  style={{
                    shapeRendering: "geometricPrecision",
                    textRendering: "geometricPrecision",
                    imageRendering: "optimizeQuality",
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                  }}
                  version="1.1"
                  xmlSpace="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs />
                  <g id="Layer_x0020_1">
                    <metadata id="CorelCorpID_0Corel-Layer" />
                    <path
                      d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                      className="fil0"
                    />
                  </g>
                </svg>
              </div>
              {/*  */}
            </div>
          </a>
        </div>
        <div
          className="lg:w-1/2
        "
        >
          <Swiper
            spaceBetween={100}
            slidesPerView={1}
            effect={window.innerWidth >= 1000 ? "" : ""}
            modules={[Autoplay]}
            className="mySwiper z-0  flex justify-center items-center mx-auto"
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
          >
            <SwiperSlide className=" flex justify-center items-center">
              <div
                className="flex justify-center items-center w-full
              "
              >
                <img loading="lazy" src={banenr1} />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="flex justify-center items-center w-full
              "
              >
                <img loading="lazy" src={banenr2} />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="flex justify-center items-center w-full
              "
              >
                <img loading="lazy" src={banenr3} />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="flex justify-center items-center w-full
              "
              >
                <img loading="lazy" src={banenr4} />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="">
        <img
          className="lg:w-72 w-56 opacity-60 -z-10 absolute top-1"
          src={img1}
          alt=""
        />
      </div>
    </div>
  );
};

export default Banner;
