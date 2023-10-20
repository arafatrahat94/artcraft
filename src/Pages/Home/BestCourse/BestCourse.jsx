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

// icons
import arrow from "../../../assets/whychoseUs/triangle.png";

import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
const BestCourse = () => {
  const [courses, setCourses] = useState([]);
  const { user } = useAuth();
  const breakpoint = {
    1000: { slidesPerView: 3 },
    370: { slidesPerView: 1 },
  };
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  useEffect(() => {
    axios
      .get("https://artogram-server.vercel.app/courses")
      .then(function (response) {
        setCourses(response.data);
        console.log(response.data[4]);
      });
  }, []);
  const handleCart = (item) => {
    const newData = { customerEmail: user.mail, courseId: item._id };
    console.log(newData);
    axios
      .post(
        "http://localhost:5000https://artogram-server.vercel.app/cart",
        newData
      )
      .then(function (response) {
        console.log(response);
      });
  };
  return (
    <div id="Courses" className=" mb-10 w-11/12 mx-auto">
      {/* best tutor */}
      <div className="theme-color1 h-[770px] bg-opacity-5 theme-border border-opacity-40 rounded-tr-[3rem] rounded-bl-[3rem] ">
        <h1 className="text-center mt-10 text-4xl lg:text-5xl font-KaushanScript theme-text">
          Our Courses
        </h1>
        <div className="w-6/12 h-[3px] opacity-40 lg:mt-7 mt-3 theme-color1 mx-auto "></div>
        <div className="mt-7">
          <Swiper
            spaceBetween={0}
            breakpoints={breakpoint}
            modules={[Navigation]}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              swiper.params.navigation.nextEl = navigationNextRef.current;
            }}
            className="mySwiper h-[550px] w-[97%] mx-auto"
            loop={true}
          >
            {courses.map((x, i) => (
              <>
                <SwiperSlide key={i} className="w-72 h-[550px] ">
                  <div className="relative theme-text flex flex-col theme-color1 rounded-[3rem] mx-3 pb-1  bg-white bg-clip-border  shadow-xl shadow-[#ee5c541c]">
                    <div className="relative  h-56 overflow-hidden rounded-[3rem] bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                      <img
                        src={x.courseImg}
                        className="w-full h-full bg-white object-cover"
                      />
                    </div>
                    <div className="p-4 pt-4">
                      <h5 className="flex items-center  text-2xl  font-semibold leading-snug tracking-normal justify-center font-KaushanScript  text-blue-gray-900 antialiased">
                        {x.name ? x.name : "coursetittle"}
                      </h5>
                      <h2 className="flex justify-center mt-1 text-xl font-semibold items-center font-Montserrat">
                        <AiOutlineHourglass className="text-2xl" />
                        Duration: {x.duration}
                      </h2>
                      <div className="mt-1 font-KaushanScript items-center font-bold justify-center flex">
                        <MdOutlineHotelClass className="text-2xl" />
                        <span className="font-Montserrat mx-1">
                          {" "}
                          Category:{x.category}
                        </span>{" "}
                      </div>
                      <div className="mt-1 font-KaushanScript items-center font-bold justify-center flex">
                        <MdOutlineHotelClass className="text-2xl" />
                        <span className="font-Montserrat mx-1">
                          {" "}
                          Available Sits:{x.availableseats}
                        </span>{" "}
                      </div>
                      <div className="mt-1 font-KaushanScript items-center font-bold justify-center flex">
                        <MdOutlineHotelClass className="text-2xl" />
                        <span className="font-Montserrat mx-1">
                          {" "}
                          Enrolled:{x.bookedSets}
                        </span>{" "}
                      </div>
                      <div className="mt-4 flex items-center justify-center gap-x-2 text-xl font-VarelaRound">
                        <Rating style={{ maxWidth: 130 }} value={3} readOnly />{" "}
                        (4.9)
                      </div>
                    </div>
                    <div className="p-6 pt-0">
                      <button
                        onClick={() => handleCart(x)}
                        className="px-5 btn theme-color1 border-none w-full rounded-2xl text-white font-Montserrat uppercase"
                        type="button"
                        data-ripple-light="true"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              </>
            ))}
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
