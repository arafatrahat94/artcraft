// react rating
import { Rating } from "@smastrom/react-rating";
import { MdArrowCircleRight, MdOutlineHotelClass } from "react-icons/md";
import { AiOutlineHourglass } from "react-icons/ai";
import "@smastrom/react-rating/style.css";

// swiper import code
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Navigation } from "swiper/modules";

// icons
import arrow from "../../../assets/whychoseUs/triangle.png";
import arrow2 from "../../../assets/icon/icons8-next-96.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import SingleCourse from "./SingleCourse";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
const BestCourse = () => {
  const [courses, setCourses] = useState([]);
  const [modal, setModal] = useState([]);
  const { user } = useAuth();
  const [close, setClose] = useState(null);
  const breakpoint = {
    1000: { slidesPerView: 3 },
    370: { slidesPerView: 1 },
  };
  const [currentPage, setCurrentPage] = useState(0);
  const navigationPrevRef = React.useRef(currentPage);
  const navigationNextRef = React.useRef(currentPage);
  const ItemsPerPage = 1;
  const totalItemsPage = Math.ceil(courses.length / ItemsPerPage);

  useEffect(() => {
    axios
      .get("https://artogram-server.vercel.app/courses")
      .then(function (response) {
        setCourses(response.data);
      });
  }, []);
  const scrollTop = () => {
    window.scrollTo({ top: 225, left: 0, behavior: "smooth" });
  };
  return (
    <div id="Courses" className=" mb-10 w-11/12 mx-auto">
      {/* best tutor */}
      <div className="theme-color1 lg:h-[720px] h-[700px] bg-opacity-5 theme-border border-opacity-40 rounded-tr-[3rem] rounded-bl-[3rem] ">
        <h1 className="text-center mt-10 text-4xl lg:text-5xl font-KaushanScript theme-text">
          Our Courses
        </h1>
        <div className="w-6/12 h-[3px] opacity-40 lg:mt-7 mt-3 theme-color1 mx-auto "></div>
        <div className="mt-7">
          <Swiper
            spaceBetween={10}
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
            onSlideChange={(swiper) => {
              setCurrentPage(swiper.activeIndex);
            }}
            className="mySwiper    h-[500px] w-[97%] mx-auto"
          >
            {courses.map((x, i) => (
              <>
                <SwiperSlide key={i} className="w-72 pt-5 block  h-[550px] ">
                  <SingleCourse
                    setClose={setClose}
                    close={close}
                    x={modal}
                  ></SingleCourse>
                  <div onBlur={() => setModal(x)}>
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
                            Category:{x.category} Art
                          </span>{" "}
                        </div>

                        <div className="mt-4 flex items-center justify-center gap-x-2 text-xl font-VarelaRound">
                          <Rating
                            style={{ maxWidth: 130 }}
                            value={3}
                            readOnly
                          />{" "}
                          (4.9)
                        </div>
                        <div
                          onClick={() => {
                            document.getElementById("my_modal_3").showModal();
                          }}
                          className="mt-3 flex items-center justify-center h-10"
                        >
                          <button className="btn w-full mt-3 outline h-full outline-pink-500 text-pink-600 font-VarelaRound font-semibold bg-white ">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </>
            ))}
          </Swiper>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="join ms-5 bg-white shadow-md shadow-pink-300">
            <button
              onClick={scrollTop}
              ref={navigationPrevRef}
              className=" text-white"
            >
              <img
                className="w-[50px] rotate-180"
                src={arrow2}
                alt="circled-chevron-right--v2"
              />
            </button>
            <button className="join-item lg:hidden bg-white text-pink-600 font-bold uppercase w-[35px]">
              {currentPage + 1}/{totalItemsPage}
            </button>
            <button
              onClick={scrollTop}
              ref={navigationNextRef}
              className=" text-white"
            >
              <img
                className="w-[50px]"
                src={arrow2}
                alt="circled-chevron-right--v2"
              />
            </button>
          </div>
          <div className="lg:me-10 ms-4 scale-90 me-3 flex justify-end">
            <Link
              to="/AllCourses"
              className="flex items-center gap-x-2 btn bg-white ring-2 ring-pink-600 text-pink-600 lg:w-[200px] justify-center "
            >
              View All <MdArrowCircleRight className="text-3xl text-pink-600" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestCourse;
