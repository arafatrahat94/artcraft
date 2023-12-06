// react rating
import { Rating } from "@smastrom/react-rating";
import { MdOutlineHotelClass } from "react-icons/md";

import "@smastrom/react-rating/style.css";

// swiper import code
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Navigation } from "swiper/modules";

// icons

import arrow2 from "../../assets/icon/icons8-next-96.png";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { Circles } from "react-loader-spinner";
import { AiOutlineHourglass } from "react-icons/ai";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useLoaderData, useLocation } from "react-router-dom";
import ScrolltoTop from "../Shared/ScroolltoTop/Scrolltotop";
import { Helmet } from "react-helmet-async";
import ImgLoad from "../Shared/ImgLoad/ImgLoad";
import SingleCourse from "../Home/BestCourse/SingleCourse";
import { Link } from "react-scroll";
import Title from "../Shared/title/title";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
const WaterPainting = () => {
  const location = useLocation();
  const [courses, setCourses] = useState([]);
  const loadedData = useLoaderData();
  useEffect(() => {
    setCourses(loadedData);
  }, [loadedData]);
  const { user } = useAuth();

  const [modal, setModal] = useState([]);

  const [modalLoading, setModalLoading] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [closedModal, setClosedModal] = useState(false);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const breakpoint = {
    1000: { slidesPerView: 1 },
    370: { slidesPerView: 1 },
  };

  const [currentPage, setCurrentPage] = useState(0);
  const navigationPrevRef = React.useRef(currentPage);
  const navigationNextRef = React.useRef(currentPage);

  //   pagination
  const ItemsPerPage = 6;
  const totalItemsPage = Math.ceil(courses.length / ItemsPerPage);
  const pageNumber = [...Array(totalItemsPage).keys()];
  const [close, setClose] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setInitialLoading(false);
    }, 1000);
  }, []);

  const handleCart = (item) => {
    const datas = { ...item };

    delete datas._id;
    const newData = {
      customerEmail: user.email,
      ...datas,
      courseId: item._id,
    };
    setPurchaseLoading(true);
    console.log(newData);
    setIsLoading(true);
    setClose(null);
    axios
      .post("https://artogram-server.vercel.app/cartSingle", newData)
      .then(function (response) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully Added To Cart",
          showConfirmButton: true,
        });
        // console.log(response);
        setIsLoading(false);
        setPurchaseLoading(false);
        setClose(true);
      });
  };
  setTimeout(() => {
    setClosedModal(false);
  }, 1000);
  const scrollTop = () => {
    window.scrollTo({ top: 225, left: 0, behavior: "smooth" });
  };
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  if (close === true) {
    setTimeout(() => {
      setClose(null);
    }, 1000);
  }
  // console.log(close);
  return (
    <div id="Courses" className=" mb-10 w-11/12 mx-auto">
      <Helmet>
        <title>Category | ARTOGRAM</title>
      </Helmet>
      {/* best tutor */}
      <ScrolltoTop></ScrolltoTop>

      {initialLoading ? (
        <>
          <div className=" min-h-[70vh] flex  justify-center items-center">
            <div className="loader32 "></div>
          </div>
        </>
      ) : (
        <>
          <div className="theme-color1 pb-5  bg-opacity-5   rounded-tr-[3rem] rounded-bl-[3rem] ">
            <div className="my-5">
              <Title>
                {location.pathname.split("/Category/").join("")} Painting
              </Title>
            </div>
            {purchaseLoading ? (
              <>
                <div className=" min-h-[70vh] flex  justify-center items-center">
                  <div className="loader32 "></div>
                </div>
              </>
            ) : (
              <div className="">
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
                  onChange={() => console.log("hi")}
                  className="mySwiper     w-[97%] mx-auto"
                >
                  {pageNumber.map((index) => (
                    <>
                      <SwiperSlide className=" pt-5 w-full  h-[50px] ">
                        <div className="grid xl:grid-cols-4 gap-y-3 my-4 lg:grid-cols-3 ">
                          {courses.map((x, i) => (
                            <>
                              <div key={i}>
                                {x.isAddingToCart ? (
                                  <>
                                    <div className="card w-full bg-base-100  h-[520px] flex justify-center items-center shadow-xl">
                                      <div className="loader32 "></div>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div
                                      className=" flex    justify-center mx-auto"
                                      onBlur={() => setModal(x)}
                                    >
                                      <div className="card w-[300px]  dark:bg-[#121212] border border-blue-400 dark:bg-opacity-60 bg-opacity-25 bg-white h-[470px] xl:h-[500px] shadow-xl ">
                                        <figure className="xl:h-[240px] h-[240px] rounded-[1rem]">
                                          <ImgLoad imgs={x.courseImg}></ImgLoad>
                                        </figure>
                                        <div className=" h-10 mt-2 flex gap-x-1 mx-3">
                                          <div className="flex items-center justify-center gap-x-1 font-VarelaRound text-[14px] theme-text bg-opacity-25 w-[100px] rounded-[0.5rem] bg-slate-400 font-semibold">
                                            <img
                                              className="w-6"
                                              src="https://i.ibb.co/fFKTWhG/icons8-clock-100.png"
                                              alt=""
                                            />
                                            {x.duration}
                                          </div>
                                          <div className="flex items-center justify-center gap-x-1 font-VarelaRound text-[14px] theme-text bg-opacity-25 w-[150px] rounded-[0.5rem]  bg-slate-400 font-semibold">
                                            <img
                                              className="w-8"
                                              src="https://i.ibb.co/hKLKz0K/icons8-three-people-32.png"
                                              alt=""
                                            />
                                            {x.availableseats} Seat Left
                                          </div>
                                        </div>
                                        <div className="card-body">
                                          <h2 className="card-title font-Montserrat font-bold flex dark:text-blue-300 justify-between uppercase theme-text">
                                            {x.name}{" "}
                                            <span className="font-RussoOne">
                                              {x.price} $
                                            </span>
                                          </h2>
                                          <p className="font-VarelaRound dark:text-blue-300 theme-text">
                                            <h1>Enrolled : {x.bookedSets}</h1>
                                          </p>
                                          <div className="card-actions justify-end">
                                            <Link
                                              className="buttonshop"
                                              to={`/CourseDetail/${x._id}`}
                                            >
                                              View Details{" "}
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </>
                          ))}
                        </div>
                      </SwiperSlide>
                    </>
                  ))}
                </Swiper>
              </div>
            )}

            <div className="join ms-5 theme-text">
              <button
                onClick={scrollTop}
                ref={navigationPrevRef}
                className=" theme-text text-4xl"
              >
                <FaCircleChevronLeft />
              </button>
              <button className="join-item mx-2 font-bold uppercase w-[75px]">
                Page {currentPage + 1}/{totalItemsPage}
              </button>
              <button
                onClick={scrollTop}
                ref={navigationNextRef}
                className=" theme-text text-4xl"
              >
                <FaCircleChevronRight />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WaterPainting;
