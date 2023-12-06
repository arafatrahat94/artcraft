// react rating
import { Rating } from "@smastrom/react-rating";
import { MdArrowCircleRight } from "react-icons/md";

import "@smastrom/react-rating/style.css";

// swiper import code
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Navigation } from "swiper/modules";

import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";

import Swal from "sweetalert2";
import { Circles } from "react-loader-spinner";
import useToast from "../../../Hooks/useToast";
import { Link } from "react-router-dom";

import Title from "../../Shared/title/title";
import "./teacher.css";

import ImgLoad from "../../Shared/ImgLoad/ImgLoad";
const OurBestTeacher = () => {
  const { user } = useAuth();

  const [courses, setCourses] = useState([]);

  const [modal, setModal] = useState([]);
  const [checked, setChecked] = useState([]);

  const [isloading, setIsLoading] = useState(false);
  const [closedModal, setClosedModal] = useState(false);
  // Add/Remove checked item from list
  const handleCheck = (event, datas) => {
    const newDatas2 = { ...datas };
    delete newDatas2._id;
    const newData = {
      customerEmail: user.email,
      ...newDatas2,
      courseId: datas._id,
    };
    console.log(newData);
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
    <div id="instructors" className=" my-20 w-11/12 mx-auto">
      {/* best tutor */}

      <div className="  lg:h-[700px] h-[660px] bg-opacity-5  border-opacity-40 rounded-tr-[3rem] rounded-bl-[3rem] ">
        <div className="my-5">
          <Title>{"Our Best Teachers"}</Title>
        </div>
        <div className="mt-7">
          {isloading ? (
            <>
              <div className=" h-[470px] items-center w-full flex justify-center">
                <div className="loader32 "></div>
              </div>
            </>
          ) : (
            <Swiper
              spaceBetween={10}
              breakpoints={breakpoint}
              modulesbreakpoints={[Navigation]}
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
              className="mySwiper    h-[470px] w-[90%] mx-auto"
            >
              {closedModal ? (
                <></>
              ) : (
                <>
                  <dialog id="my_modal_1" className="modal backdrop-blur-sm">
                    <div className="modal-box bg-white darkBg">
                      <div className="flex items-center flex-col justify-center  min-h-[300px] lg:w-[460px]">
                        {modal.length > 0 ? (
                          <>
                            {modalLoading ? (
                              <>
                                <div className="w-full transform duration-300  flex justify-center items-center z-50 ">
                                  <div className="w-full  flex justify-center items-center z-50 ">
                                    <div className="loader32 "></div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <h1 className="text-xl font-VarelaRound uppercase theme-text mb-5 -mt-10">
                                  Course List
                                </h1>
                                {modal.map((x) => (
                                  <>
                                    <div className="grid gap-x-2 gap-y-2   w-full transform duration-300  theme-color1 bg-opacity-5  my-1 rounded-[2rem] theme-text font-VarelaRound">
                                      <div className="cardCollection">
                                        <div className="cardCollectionimg">
                                          <div className="object-cover  flex justify-center items-center">
                                            <ImgLoad
                                              roundedd={"rounded-[0.5rem]"}
                                              imgs={x.courseImg}
                                            ></ImgLoad>
                                          </div>
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
                                            Price:{x.price} $ &nbsp;&nbsp;&nbsp;
                                            <span className="text-base">
                                              seats left : {x.availableseats}
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
                          {user ? (
                            <>
                              {modal.length > 0 ? (
                                <>
                                  {checked.length > 0 && (
                                    <>
                                      <div
                                        onClick={handleCart}
                                        className="buttonshop"
                                      >
                                        <h1 className="transform duration-300 hover:text-white">
                                          Add to Cart
                                        </h1>
                                      </div>
                                    </>
                                  )}
                                </>
                              ) : (
                                ""
                              )}
                            </>
                          ) : (
                            <>
                              <div className="AddedToCartcardactions">
                                <Link
                                  to="/Login"
                                  className="AddedToCartcardhistory"
                                >
                                  Login To Order
                                </Link>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </dialog>
                </>
              )}

              {courses.map((x, i) => (
                <>
                  <SwiperSlide key={i} className="w-80 lg:w-72 py-8 px-1">
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
                          I’m Walter, a multidisciplinary designer who focuses
                          on telling my clients’ stories visually.
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
                              document.getElementById("my_modal_1").showModal();
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
                  </SwiperSlide>
                </>
              ))}
            </Swiper>
          )}
        </div>

        <div className="flex items-center justify-between w-full">
          <div className="lg:me-10 ms-4 scale-90 me-3 flex justify-end">
            {" "}
            <Link
              to="/AllTeachers"
              className="flex backdrop-blur lg:backdrop-blur-none lg:bg-opacity-100 lg:text-black bg-blue-400 bg-opacity-10 btn px-10 text-white font-VarelaRound"
            >
              View All
              <svg className="iconView" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurBestTeacher;
