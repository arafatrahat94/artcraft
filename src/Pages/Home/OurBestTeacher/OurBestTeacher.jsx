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
import arrow from "../../../assets/whychoseUs/triangle.png";
import arrow2 from "../../../assets/icon/icons8-next-96.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";

import Swal from "sweetalert2";
import { Circles } from "react-loader-spinner";
import useToast from "../../../Hooks/useToast";
import { Link } from "react-router-dom";
import useScroll from "../../../Hooks/useScroll";
const OurBestTeacher = () => {
  const { user } = useAuth();
  const Toast = useToast();
  const [courses, setCourses] = useState([]);

  const [modal, setModal] = useState([]);
  const [checked, setChecked] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [closedModal, setClosedModal] = useState(false);
  // Add/Remove checked item from list
  const handleCheck = (event, datas) => {
    delete datas._id;
    const newData = {
      customerEmail: user.email,
      ...datas,
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
    1000: { slidesPerView: 3 },
    370: { slidesPerView: 1 },
  };
  const [currentPage, setCurrentPage] = useState(0);
  const navigationPrevRef = React.useRef(currentPage);
  const navigationNextRef = React.useRef(currentPage);
  const [modalLoading, setModalLoading] = useState(false);
  const ItemsPerPage = 1;
  const totalItemsPage = Math.ceil(courses.length / ItemsPerPage);
  useEffect(() => {
    axios
      .get("https://artogram-server.vercel.app/teacherUser")
      .then(function (response) {
        setCourses(response.data);
      });
  }, []);
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

  return (
    <div id="instructors" className=" mb-10 w-11/12 mx-auto">
      {/* best tutor */}
      <div className="theme-color1 lg:h-[700px] h-[660px] bg-opacity-5 theme-border border-opacity-40 rounded-tr-[3rem] rounded-bl-[3rem] ">
        <h1 className="text-center mt-10 text-4xl lg:text-5xl font-KaushanScript theme-text">
          Our Best Teachers
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
            onSlideChange={(swiper) => {
              setCurrentPage(swiper.activeIndex);
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              swiper.params.navigation.nextEl = navigationNextRef.current;
            }}
            className="mySwiper    h-[460px] w-[97%] mx-auto"
          >
            {closedModal ? (
              <></>
            ) : (
              <>
                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box">
                    <div className="flex items-center flex-col justify-center min-h-[300px] lg:w-[460px]">
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
                          {modal.length > 0 ? (
                            <>
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
                                  {modal.map((x) => (
                                    <>
                                      <div className="grid gap-x-2 gap-y-2 grid-cols-2 lg:grid-cols-3 w-full theme-color1 bg-opacity-5 border my-1 rounded-[2rem]">
                                        <div className="flex items-center lg:flex-row flex-col lg:col-span-2">
                                          <div className="rounded-3xl my-1  ">
                                            <img
                                              className="w-16 lg:w-40"
                                              src={x.courseImg}
                                              alt=""
                                            />
                                          </div>
                                          <div className="text-pink-600  flex lg:text-[16px] text-sm items-center flex-col lg:items-start justify-center font-bold font-VarelaRound">
                                            <h1>Name:{x.name}</h1>
                                            <h1>
                                              Available: {x.availableseats} sits
                                            </h1>
                                            <h1>Price:{x.price} $</h1>
                                          </div>
                                        </div>
                                        <div className="rounded-3xl my-1  flex flex-col items-center gap-y-2 justify-center">
                                          <div>
                                            <input
                                              onChange={() =>
                                                handleCheck(event, x)
                                              }
                                              value={x._id}
                                              type="checkbox"
                                              className="checkbox checkbox-lg  checkbox-secondary"
                                            />
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
                              <h1 className="text-pink-600 text-center text-sm font-VarelaRound font-semibold">
                                No Class Is Added By Teacher Untill Now
                              </h1>
                            </>
                          )}
                        </>
                      )}
                    </div>
                    <div className="modal-action flex justify-between">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn rounded-md bg-pink-600 text-white">
                          Close
                        </button>
                      </form>
                      <div>
                        <button
                          onClick={handleCart}
                          className="btn text-pink-600 outline
                         rounded-md outline-pink-600"
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </dialog>
              </>
            )}
            {courses.map((x, i) => (
              <>
                <SwiperSlide key={i} className="w-72 pt-5  ">
                  <div onClick={() => handleLoadData(x.email)}>
                    <div className="relative theme-text  flex flex-col theme-color1 rounded-[3rem] mx-3 pb-1  bg-white h-[400px] bg-clip-border  shadow-xl shadow-[#ee5c541c]">
                      <div className="relative  h-48 overflow-hidden rounded-[3rem] bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                        <img
                          src={x.img}
                          className="w-full h-full bg-white object-cover"
                        />
                      </div>
                      <div className="p-4 pt-4">
                        <h5 className="flex items-center   text-2xl  font-semibold leading-snug tracking-normal justify-center font-KaushanScript  text-blue-gray-900 antialiased">
                          {x.name ? x.name.slice(0, 19) : "coursetittle"}
                        </h5>

                        <div className="flex flex-grow flex-col h-full justify-end">
                          <div className="mt-4  flex items-center  justify-center gap-x-2 text-xl font-VarelaRound">
                            <Rating
                              style={{ maxWidth: 130 }}
                              value={3}
                              readOnly
                            />{" "}
                            (4.9)
                          </div>
                          <div className="mt-3 flex items-center justify-center h-10">
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
                              View Classes
                            </button>
                          </div>
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
            <button ref={navigationPrevRef} className=" text-white">
              <img
                className="w-[50px] rotate-180"
                src={arrow2}
                alt="circled-chevron-right--v2"
              />
            </button>
            <button className="join-item lg:hidden bg-white text-pink-600 font-bold uppercase w-[35px]">
              {currentPage + 1}/{totalItemsPage}
            </button>
            <button ref={navigationNextRef} className=" text-white">
              <img
                className="w-[50px]"
                src={arrow2}
                alt="circled-chevron-right--v2"
              />
            </button>
          </div>
          <div className="lg:me-10 ms-4 scale-90 me-3 flex justify-end">
            <Link
              to="/AllTeachers"
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

export default OurBestTeacher;
