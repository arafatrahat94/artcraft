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
import ScrolltoTop from "../Shared/ScroolltoTop/Scrolltotop";

const AllCourses = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setInitialLoading(false);
    }, 1000);
  }, []);
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);

  const [modal, setModal] = useState([]);

  const [modalLoading, setModalLoading] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [closedModal, setClosedModal] = useState(false);

  const breakpoint = {
    1000: { slidesPerView: 1 },
    370: { slidesPerView: 1 },
  };

  const [currentPage, setCurrentPage] = useState(0);
  const navigationPrevRef = React.useRef(currentPage);
  const navigationNextRef = React.useRef(currentPage);
  useEffect(() => {
    axios
      .get("https://artogram-server.vercel.app/courses")
      .then(function (response) {
        setCourses(response.data);
      });
  }, []);
  //   pagination
  const ItemsPerPage = 6;
  const totalItemsPage = Math.ceil(courses.length / ItemsPerPage);
  const pageNumber = [...Array(totalItemsPage).keys()];

  const handleCart = (datas) => {
    datas;
    delete datas._id;
    const newData = {
      customerEmail: user.email,
      ...datas,
    };
    newData;
    setIsLoading(true);
    axios
      .post("https://artogram-server.vercel.app/cartSingle", newData)
      .then(function (response) {
        response.data;
        setClosedModal(true);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully Added To Cart",
          showConfirmButton: true,
        });
        setIsLoading(false);
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
  return (
    <div id="Courses" className=" mb-10 w-11/12 mx-auto">
      {/* best tutor */}

      {initialLoading ? (
        <>
          <div className=" min-h-[70vh] flex  justify-center items-center">
            <Circles
              height="80"
              width="80"
              method="dialog"
              color="#D81B60"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        </>
      ) : (
        <>
          <div className="theme-color1 pb-5  bg-opacity-5 theme-border border-opacity-40 rounded-tr-[3rem] rounded-bl-[3rem] ">
            <ScrolltoTop></ScrolltoTop>
            <ScrolltoTop></ScrolltoTop>
            <h1 className="text-center mt-10 text-4xl lg:text-5xl font-KaushanScript theme-text">
              All Courses
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
                  swiper.activeIndex;
                }}
                onChange={() => "hi"}
                className="mySwiper     w-[97%] mx-auto"
              >
                {closedModal ? (
                  <></>
                ) : (
                  <>
                    <dialog id="my_modal_1" className="modal">
                      <div className="modal-box flex items-center justify-center flex-col h-[570px]">
                        {modalLoading ? (
                          <>
                            <Circles
                              height="80"
                              width="80"
                              method="dialog"
                              color="#D81B60"
                              ariaLabel="circles-loading"
                              wrapperStyle={{}}
                              wrapperClass=""
                              visible={true}
                            />
                          </>
                        ) : (
                          <>
                            <div className="flex items-center flex-col justify-center min-h-[300px] lg:w-[460px] w-full">
                              {isloading ? (
                                <>
                                  <Circles
                                    height="80"
                                    width="80"
                                    method="dialog"
                                    color="#D81B60"
                                    ariaLabel="circles-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                  />
                                </>
                              ) : (
                                <>
                                  <div>
                                    <div className="lg:w-[450px] w-[300px] h-[210px]  mx-auto">
                                      <img
                                        className="rounded-[2rem] mx-auto w-full object-contain h-full
                                "
                                        src={modal.courseImg}
                                        alt=""
                                      />
                                    </div>
                                    <div>
                                      <h1 className="text-center font-KaushanScript text-pink-500 text-2xl">
                                        Course Name: {modal.name}
                                      </h1>
                                      <h1 className="font-VarelaRound text-base text-pink-600 mt-2">
                                        Art Category : {modal.category} Art
                                      </h1>
                                      <h1 className="font-VarelaRound text-base text-pink-600 mt-2">
                                        Available Seats : {modal.availableseats}
                                      </h1>
                                      <h1 className="font-VarelaRound text-base text-pink-600 mt-2">
                                        Booked Seats : {modal.bookedSets}
                                      </h1>
                                      <h1 className="font-VarelaRound text-base text-pink-600 mt-2">
                                        Course Duration : {modal.duration}
                                      </h1>
                                      <h1 className="font-VarelaRound text-xl text-pink-600 mt-2">
                                        Course Price : {modal.price} $
                                      </h1>
                                    </div>
                                    <button
                                      onClick={() => handleCart(modal)}
                                      className={`${
                                        modal.availableseats === 0
                                          ? "btn-disabled"
                                          : ""
                                      }px-5 btn theme-color1 border-none mt-4 w-full rounded-2xl text-white font-Montserrat uppercase`}
                                      type="button"
                                      data-ripple-light="true"
                                    >
                                      Add To Cart
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                            <div className="modal-action flex justify-between">
                              <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-square outline-pink-600 border w-10 h-10 border-pink-600">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="#D81B60"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M6 18L18 6M6 6l12 12"
                                    />{" "}
                                  </svg>
                                </button>
                              </form>
                            </div>
                          </>
                        )}
                      </div>
                    </dialog>
                  </>
                )}
                {pageNumber.map((index) => (
                  <>
                    <SwiperSlide className=" pt-5 w-full  h-[50px] ">
                      <div className="lg:grid flex flex-col justify-center items-center lg:grid-cols-3 gap-y-2 pb-5">
                        {courses
                          .slice(
                            index * ItemsPerPage,
                            (index + 1) * ItemsPerPage
                          )
                          .map((x, i) => (
                            <>
                              <div className="w-72" key={i}>
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
                                    <h2 className="flex justify-center mt-1  font-semibold items-center font-Montserrat">
                                      <AiOutlineHourglass className="text-2xl" />
                                      Duration: {x.duration}
                                    </h2>
                                    <div className="mt-1 font-KaushanScript items-center font-bold justify-center flex">
                                      <MdOutlineHotelClass className="" />
                                      <span className="font-Montserrat mx-1">
                                        {" "}
                                        Category:{x.category}
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
                                      onClick={() => setModal(x)}
                                      className="mt-3 flex items-center justify-center h-10"
                                    >
                                      <button
                                        onClick={() => {
                                          setTimeout(() => {
                                            document
                                              .getElementById("my_modal_1")
                                              .showModal();
                                          }, 250);

                                          setModalLoading(true);
                                          setTimeout(() => {
                                            setModalLoading(false);
                                          }, 1000);
                                        }}
                                        className="btn w-full mt-3 outline h-full outline-pink-500 text-pink-600 font-VarelaRound font-semibold bg-white "
                                      >
                                        View Details
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          ))}
                      </div>
                    </SwiperSlide>
                  </>
                ))}
              </Swiper>
            </div>
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
              <button className="join-item bg-white text-pink-600 font-bold uppercase w-[75px]">
                Page {currentPage + 1}/{totalItemsPage}
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
          </div>
        </>
      )}
    </div>
  );
};

export default AllCourses;
