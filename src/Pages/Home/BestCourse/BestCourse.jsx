// react rating
import { Rating } from "@smastrom/react-rating";
import { MdOutlineHotelClass } from "react-icons/md";
import { AiOutlineHourglass } from "react-icons/ai";
import "@smastrom/react-rating/style.css";

// swiper import code
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Navigation } from "swiper/modules";

// react icons
import { PiChalkboardTeacherThin, PiStudentLight } from "react-icons/pi";
// icons
import arrow from "../../../assets/whychoseUs/triangle.png";
import img1 from "../../../assets/sliderImage/banner8.png";
// animated number
import AnimatedNumbers from "react-animated-numbers";
import React from "react";
const BestCourse = () => {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  return (
    <div id="instructors" className=" mb-10 w-11/12 mx-auto">
      {/* best tutor */}
      <div className="theme-color1 h-[700px] bg-opacity-5 theme-border border-opacity-40 rounded-tr-[3rem] rounded-bl-[3rem] ">
        <h1 className="text-center mt-10 text-5xl font-KaushanScript theme-text">
          Our Courses
        </h1>
        <div className="w-6/12 h-[3px] opacity-40 mt-7 theme-color1 mx-auto "></div>
        <div className="mt-7">
          <Swiper
            spaceBetween={0}
            slidesPerView={3}
            modules={[Navigation]}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              swiper.params.navigation.nextEl = navigationNextRef.current;
            }}
            className="mySwiper h-[490px] w-[97%] mx-auto"
            loop={true}
          >
            <SwiperSlide>
              <div className="relative theme-text flex w-72 flex-col  rounded-[3rem] pb-1  bg-white bg-clip-border  shadow-xl shadow-[#ee5c541c]">
                <div className="relative  h-56 overflow-hidden rounded-[3rem] bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                  <img src={img1} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 pt-4">
                  <h5 className="flex items-center  text-2xl  font-semibold leading-snug tracking-normal justify-center font-KaushanScript  text-blue-gray-900 antialiased">
                    font-KaushanScript
                  </h5>
                  <h2 className="flex justify-center mt-1 text-xl font-semibold items-center font-Montserrat">
                    <AiOutlineHourglass className="text-2xl" />
                    Time: 1.2 Hour
                  </h2>
                  <div className="mt-1 font-KaushanScript items-center font-bold justify-center flex">
                    <MdOutlineHotelClass className="text-2xl" />
                    <span className="font-Montserrat mx-1">
                      {" "}
                      Enrolled:
                    </span>{" "}
                    <AnimatedNumbers
                      includeComma
                      className="m bg-blue-400"
                      animateToNumber={55}
                      fontStyle={{
                        fontSize: 20,
                        width: "12px",
                        color: "#ee5b54",
                        textDecorationColor: "#ee5b54",
                      }}
                      locale="en-US"
                      configs={[
                        { mass: 1, tension: 220, friction: 100 },
                        { mass: 1, tension: 180, friction: 130 },
                        { mass: 1, tension: 280, friction: 90 },
                        { mass: 1, tension: 180, friction: 135 },
                        { mass: 1, tension: 260, friction: 100 },
                        { mass: 1, tension: 210, friction: 180 },
                      ]}
                    ></AnimatedNumbers>
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-x-2 text-xl font-VarelaRound">
                    <Rating style={{ maxWidth: 130 }} value={3} readOnly />{" "}
                    (4.9)
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <button
                    className="px-5 btn theme-color1 border-none w-full rounded-2xl text-white font-Montserrat uppercase"
                    type="button"
                    data-ripple-light="true"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative theme-text flex w-72 flex-col  rounded-[3rem] pb-1  bg-white bg-clip-border  shadow-xl shadow-[#ee5c541c]">
                <div className="relative  h-56 overflow-hidden rounded-[3rem] bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                  <img src={img1} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 pt-4">
                  <h5 className="flex items-center  text-2xl  font-semibold leading-snug tracking-normal justify-center font-KaushanScript  text-blue-gray-900 antialiased">
                    font-KaushanScript
                  </h5>
                  <h2 className="flex justify-center mt-1 text-xl font-semibold items-center font-Montserrat">
                    <AiOutlineHourglass className="text-2xl" />
                    Time: 1.2 Hour
                  </h2>
                  <div className="mt-1 font-KaushanScript items-center font-bold justify-center flex">
                    <MdOutlineHotelClass className="text-2xl" />
                    <span className="font-Montserrat mx-1">
                      {" "}
                      Enrolled:
                    </span>{" "}
                    <AnimatedNumbers
                      includeComma
                      className="m bg-blue-400"
                      animateToNumber={55}
                      fontStyle={{
                        fontSize: 20,
                        width: "12px",
                        color: "#ee5b54",
                        textDecorationColor: "#ee5b54",
                      }}
                      locale="en-US"
                      configs={[
                        { mass: 1, tension: 220, friction: 100 },
                        { mass: 1, tension: 180, friction: 130 },
                        { mass: 1, tension: 280, friction: 90 },
                        { mass: 1, tension: 180, friction: 135 },
                        { mass: 1, tension: 260, friction: 100 },
                        { mass: 1, tension: 210, friction: 180 },
                      ]}
                    ></AnimatedNumbers>
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-x-2 text-xl font-VarelaRound">
                    <Rating style={{ maxWidth: 130 }} value={3} readOnly />{" "}
                    (4.9)
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <button
                    className="px-5 btn theme-color1 border-none w-full rounded-2xl text-white font-Montserrat uppercase"
                    type="button"
                    data-ripple-light="true"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative theme-text flex w-72 flex-col  rounded-[3rem] pb-1  bg-white bg-clip-border  shadow-xl shadow-[#ee5c541c]">
                <div className="relative  h-56 overflow-hidden rounded-[3rem] bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                  <img src={img1} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 pt-4">
                  <h5 className="flex items-center  text-2xl  font-semibold leading-snug tracking-normal justify-center font-KaushanScript  text-blue-gray-900 antialiased">
                    font-KaushanScript
                  </h5>
                  <h2 className="flex justify-center mt-1 text-xl font-semibold items-center font-Montserrat">
                    <AiOutlineHourglass className="text-2xl" />
                    Time: 1.2 Hour
                  </h2>
                  <div className="mt-1 font-KaushanScript items-center font-bold justify-center flex">
                    <MdOutlineHotelClass className="text-2xl" />
                    <span className="font-Montserrat mx-1">
                      {" "}
                      Enrolled:
                    </span>{" "}
                    <AnimatedNumbers
                      includeComma
                      className="m bg-blue-400"
                      animateToNumber={55}
                      fontStyle={{
                        fontSize: 20,
                        width: "12px",
                        color: "#ee5b54",
                        textDecorationColor: "#ee5b54",
                      }}
                      locale="en-US"
                      configs={[
                        { mass: 1, tension: 220, friction: 100 },
                        { mass: 1, tension: 180, friction: 130 },
                        { mass: 1, tension: 280, friction: 90 },
                        { mass: 1, tension: 180, friction: 135 },
                        { mass: 1, tension: 260, friction: 100 },
                        { mass: 1, tension: 210, friction: 180 },
                      ]}
                    ></AnimatedNumbers>
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-x-2 text-xl font-VarelaRound">
                    <Rating style={{ maxWidth: 130 }} value={3} readOnly />{" "}
                    (4.9)
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <button
                    className="px-5 btn theme-color1 border-none w-full rounded-2xl text-white font-Montserrat uppercase"
                    type="button"
                    data-ripple-light="true"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative theme-text flex w-72 flex-col  rounded-[3rem] pb-1  bg-white bg-clip-border  shadow-xl shadow-[#ee5c541c]">
                <div className="relative  h-56 overflow-hidden rounded-[3rem] bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                  <img src={img1} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 pt-4">
                  <h5 className="flex items-center  text-2xl  font-semibold leading-snug tracking-normal justify-center font-KaushanScript  text-blue-gray-900 antialiased">
                    font-KaushanScript
                  </h5>
                  <h2 className="flex justify-center mt-1 text-xl font-semibold items-center font-Montserrat">
                    <AiOutlineHourglass className="text-2xl" />
                    Time: 1.2 Hour
                  </h2>
                  <div className="mt-1 font-KaushanScript items-center font-bold justify-center flex">
                    <MdOutlineHotelClass className="text-2xl" />
                    <span className="font-Montserrat mx-1">
                      {" "}
                      Enrolled:
                    </span>{" "}
                    <AnimatedNumbers
                      includeComma
                      className="m bg-blue-400"
                      animateToNumber={55}
                      fontStyle={{
                        fontSize: 20,
                        width: "12px",
                        color: "#ee5b54",
                        textDecorationColor: "#ee5b54",
                      }}
                      locale="en-US"
                      configs={[
                        { mass: 1, tension: 220, friction: 100 },
                        { mass: 1, tension: 180, friction: 130 },
                        { mass: 1, tension: 280, friction: 90 },
                        { mass: 1, tension: 180, friction: 135 },
                        { mass: 1, tension: 260, friction: 100 },
                        { mass: 1, tension: 210, friction: 180 },
                      ]}
                    ></AnimatedNumbers>
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-x-2 text-xl font-VarelaRound">
                    <Rating style={{ maxWidth: 130 }} value={3} readOnly />{" "}
                    (4.9)
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <button
                    className="px-5 btn theme-color1 border-none w-full rounded-2xl text-white font-Montserrat uppercase"
                    type="button"
                    data-ripple-light="true"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="flex justify-start items-center relative ms-5 gap-x-4">
          {" "}
          <div ref={navigationPrevRef} className="p-2 rounded-full">
            <img className="-rotate-90 w-10" src={arrow} alt="" />
          </div>
          <div ref={navigationNextRef} className="  rounded-3xl  ">
            <img className="rotate-90 w-10 " src={arrow} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestCourse;
