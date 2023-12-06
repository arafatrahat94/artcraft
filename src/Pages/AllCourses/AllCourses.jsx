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
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Title from "../Shared/title/title";
import ImgLoad from "../Shared/ImgLoad/ImgLoad";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";

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
    const newDatas = { ...datas };

    delete newDatas._id;
    const newData = {
      customerEmail: user.email,
      ...newDatas,
      courseId: datas._id,
    };

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
      <Helmet>
        <title>AllCourses | ARTOGRAM</title>
      </Helmet>
      {initialLoading ? (
        <>
          <div className=" min-h-[70vh] flex  justify-center items-center">
            <div className="loader32 "></div>
          </div>
        </>
      ) : (
        <>
          <div className="theme-color1 flex justify-center flex-col bg-opacity-5  border-opacity-40 rounded-tr-[3rem] rounded-bl-[3rem] ">
            <ScrolltoTop></ScrolltoTop>
            <ScrolltoTop></ScrolltoTop>
            <div className="mt-7">
              <Title>{"Our Courses"}</Title>
            </div>

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
                <dialog
                  id="my_modal_n"
                  className="modal bg-opacity-5 backdrop-blur"
                >
                  <div className="font-VarelaRound">
                    <div className="cardAlert modal-box">
                      <div className="cardAlertheader">
                        <span className="cardAlerticon">
                          <svg
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              clipRule="evenodd"
                              d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                              fillRule="evenodd"
                            ></path>
                          </svg>
                        </span>
                        <p className="cardAlertalert font-Montserrat">
                          sign in to continue!
                        </p>
                      </div>

                      <p className="cardAlertmessage ps-1 tracking-wide lg:tracking-normal">
                        You need to be signed in , to add this item to your
                        cart. Sign in now to enjoy a seamless shopping
                        experience!
                      </p>

                      <div className="cardAlertactions">
                        <Link
                          to="/Login"
                          className="cardAlertread tracking-wider"
                        >
                          Sign in
                        </Link>

                        <div className="cardAlertmark-as-read" href="">
                          <form method="dialog" className="">
                            <button
                              className=" h-[30px] w-full "
                              id="loginAlertClose"
                            >
                              Cancel
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </dialog>
                <dialog
                  id="my_modal_n2"
                  className="modal bg-opacity-5 backdrop-blur"
                >
                  <div className="AddedToCartcard">
                    <button type="button" className="AddedToCartcarddismiss">
                      <form method="dialog" className="">
                        <button id="loginAlertClose2">×</button>
                      </form>
                    </button>
                    <div className="AddedToCartcardheader">
                      <div className="AddedToCartcardimage">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                          <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            id="SVGRepo_tracerCarrier"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              strokeLinejoin="round"
                              strokeLinecap="round"
                              strokeWidth="1.5"
                              stroke="#000000"
                              d="M20 7L9.00004 18L3.99994 13"
                            ></path>{" "}
                          </g>
                        </svg>
                      </div>
                      <div className="AddedToCartcardcontent">
                        <span className="AddedToCartcardtitle">
                          Added To Cart
                        </span>
                        <p className="AddedToCartcardmessage">
                          Thank you for your selecting this item. you just have
                          payment left now
                        </p>
                      </div>
                      <div className="AddedToCartcardactions">
                        <Link
                          to="/DashBoard/CourseCart"
                          type="button"
                          className="AddedToCartcardhistory"
                        >
                          Checkout
                        </Link>
                      </div>
                    </div>
                  </div>
                </dialog>
                {pageNumber.map((index) => (
                  <>
                    <SwiperSlide className=" pt-5 w-full  h-[50px] ">
                      <div className="my-6 ">
                        <div className="grid gap-x-2 xl:grid-cols-4 gap-y-3 lg:grid-cols-3 ">
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
                      </div>
                    </SwiperSlide>
                  </>
                ))}
              </Swiper>
            </div>
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

export default AllCourses;
