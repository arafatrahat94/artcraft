// react rating
import { Rating } from "@smastrom/react-rating";
import { MdArrowCircleRight } from "react-icons/md";

import "@smastrom/react-rating/style.css";

// swiper import code
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Navigation } from "swiper/modules";

// icons
import arrow from "../../assets/whychoseUs/triangle.png";
import arrow2 from "../../assets/icon/icons8-next-96.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";

import Swal from "sweetalert2";
import { Circles } from "react-loader-spinner";
import useToast from "../../Hooks/useToast";
import { Link, useNavigation } from "react-router-dom";
import ScrolltoTop from "../Shared/ScroolltoTop/Scrolltotop";
import { Helmet } from "react-helmet-async";
import Title from "../Shared/title/title";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
const AllTeachers = () => {
  const { user } = useAuth();

  const [courses, setCourses] = useState([]);
  const [modal, setModal] = useState([]);
  const [checked, setChecked] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [closedModal, setClosedModal] = useState(false);
  // Add/Remove checked item from list
  const handleCheck = (event) => {
    const findData = modal.find((x) => x._id === event.target.value);
    const datas = { ...findData };

    delete datas._id;
    const newData = {
      customerEmail: user.email,
      ...datas,
      courseId: findData._id,
    };

    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, newData];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  const breakpoint = {
    1000: { slidesPerView: 1 },
    370: { slidesPerView: 1 },
  };
  const [initialLoading, setInitialLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const navigationPrevRef = React.useRef(currentPage);
  const navigationNextRef = React.useRef(currentPage);
  useEffect(() => {
    setInitialLoading(true);
    axios
      .get("https://artogram-server.vercel.app/teacherUser")
      .then(function (response) {
        setCourses(response.data);

        setInitialLoading(false);
      });
  }, []);
  //   pagination
  const ItemsPerPage = 6;
  const totalItemsPage = Math.ceil(courses.length / ItemsPerPage);
  const pageNumber = [...Array(totalItemsPage).keys()];

  const handleLoadData = (email) => {
    axios
      .get(`https://artogram-server.vercel.app/course?email=${email}`)
      .then(function (res) {
        setModal(res.data);
      });
  };
  const handleCart = () => {
    setIsLoading(true);

    axios
      .post("https://artogram-server.vercel.app/cart", checked)
      .then(function (response) {
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
    <div id="Courses" className=" my-10 w-11/12 mx-auto">
      <Helmet>
        <title>AllTeacher | ARTOGRAM</title>
      </Helmet>
      <ScrolltoTop></ScrolltoTop>
      <ScrolltoTop></ScrolltoTop>
      {/* best tutor */}
      {initialLoading ? (
        <>
          <div className="w-full  min-h-[70vh] flex justify-center items-center">
            <div className="w-full  flex justify-center items-center z-50 ">
              <div className="w-full  flex justify-center items-center z-50 ">
                <div className="loader32"></div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="pb-5  bg-opacity-5   rounded-tr-[3rem] rounded-bl-[3rem]  mx-auto">
            <Title>{"All Of Our Teachers"}</Title>
            <div className="w-6/12 h-[3px] opacity-40 lg:mt-7 mt-3  mx-auto "></div>
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
                className="mySwiper     w-[97%] mx-auto"
              >
                {closedModal ? (
                  <></>
                ) : (
                  <>
                    <dialog id="my_modal_1" className="modal">
                      <div className="modal-box">
                        <div className="flex items-center flex-col justify-center min-h-[300px] lg:w-[460px] w-full">
                          {isloading ? (
                            <>
                              <div className="w-full  flex justify-center items-center z-50 ">
                                <div className="w-full  flex justify-center items-center z-50 ">
                                  <div className="loader32"></div>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              {modal.length > 0 ? (
                                <>
                                  {modalLoading ? (
                                    <>
                                      <div className="w-full  flex justify-center items-center z-50 ">
                                        <div className="w-full  flex justify-center items-center z-50 ">
                                          <div className="loader32"></div>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      {modal.map((x) => (
                                        <>
                                          <div className="grid gap-x-2 gap-y-2   w-full theme-color1 bg-opacity-5  my-1 rounded-[2rem] theme-text font-VarelaRound">
                                            <div className="cardCollection">
                                              <div className="cardCollectionimg">
                                                <img
                                                  loading="lazy"
                                                  className="w-16 rounded-[0.5rem] lg:w-40"
                                                  src={x.courseImg}
                                                  alt=""
                                                />
                                              </div>

                                              <div className="cardCollectiontextBox">
                                                <div className="cardCollectiontextContent">
                                                  <p className="cardCollectionh1">
                                                    {x.name}
                                                  </p>
                                                  <span className="cardCollectionspan">
                                                    <label className="cardCollectioncheckbox-container">
                                                      <input
                                                        onChange={() =>
                                                          handleCheck(event, x)
                                                        }
                                                        value={x._id}
                                                        type="checkbox"
                                                        className="cardCollectioncustom-checkbox"
                                                      />
                                                      <span className="cardCollectioncheckmark" />
                                                    </label>
                                                  </span>
                                                </div>
                                                <p className="cardCollectionp">
                                                  Price:{x.price} ${" "}
                                                  &nbsp;&nbsp;&nbsp;
                                                  <span className="text-base">
                                                    seats left :{" "}
                                                    {x.availableseats}
                                                  </span>
                                                </p>
                                                <div />
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      ))}
                                    </>
                                  )}
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <h1 className="theme-text text-center text-sm font-VarelaRound font-semibold">
                                    No Class Is Added By Teacher Untill Now
                                  </h1>
                                </>
                              )}
                            </>
                          )}
                        </div>
                        <div className="modal-action flex items-center justify-between">
                          <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}

                            <button className=" ">
                              <div className="cta ">
                                <h1 className="span2 hover:text-white text-[#0b2447]">
                                  Close
                                </h1>
                              </div>
                            </button>
                          </form>
                          <div>
                            {modal.length > 0 ? (
                              <div onClick={handleCart} className="buttonshop">
                                <h1 className="transform duration-300 hover:text-white">
                                  Add to Cart
                                </h1>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </dialog>
                  </>
                )}
                {pageNumber.map((index) => (
                  <>
                    <SwiperSlide className=" pt-5 w-full  h-[50px] ">
                      <div className="lg:grid flex flex-col justify-center items-center lg:grid-cols-3 gap-y-2  pb-5">
                        {courses
                          .slice(
                            index * ItemsPerPage,
                            (index + 1) * ItemsPerPage
                          )
                          .map((x, i) => (
                            <>
                              <div
                                className="xl:w-[400px] w-80 lg:w-72"
                                key={i}
                                onClick={() => handleLoadData(x.email)}
                              >
                                <div
                                  onClick={() => handleLoadData(x.email)}
                                  className=" flex justify-center"
                                >
                                  <div
                                    onClick={() => handleLoadData(x.email)}
                                    className=" flex justify-center"
                                  >
                                    <div className="card3 darkBg gap-y-2">
                                      <div className="img">
                                        <img
                                          loading="lazy"
                                          src={x.img}
                                          className="object-cover"
                                          alt=""
                                        />
                                      </div>
                                      <span>{x.name}</span>
                                      <p className="info xl:px-3">
                                        I’m Walter, a multidisciplinary designer
                                        who focuses on telling my clients’
                                        stories visually.
                                      </p>
                                      <div className="flex items-center theme-text justify-center">
                                        <Rating
                                          style={{ maxWidth: 130 }}
                                          value={3}
                                          readOnly
                                        />{" "}
                                        (4.9)
                                      </div>
                                      <div
                                        onClick={() => {
                                          setTimeout(() => {
                                            document
                                              .getElementById("my_modal_1")
                                              .showModal();
                                          }, 350);

                                          setModalLoading(true);
                                          setTimeout(() => {
                                            setModalLoading(false);
                                          }, 1000);
                                        }}
                                        className="w-[170px] my-3  mx-auto hover:text-white text-[#0b2447]"
                                      >
                                        <div className="cta ">
                                          <h1 className="span2 hover:text-white text-[#0b2447]">
                                            View Courses
                                          </h1>
                                        </div>
                                      </div>
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

export default AllTeachers;
