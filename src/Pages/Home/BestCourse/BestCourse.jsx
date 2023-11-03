// react rating
import { Rating } from "@smastrom/react-rating";
import { MdArrowCircleRight, MdOutlineHotelClass } from "react-icons/md";
import { AiOutlineHourglass } from "react-icons/ai";
import "@smastrom/react-rating/style.css";
import "./bes.css";
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
import Title from "../../Shared/title/title";
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
        const coursesWithLoadingStatus = response.data.map((course) => ({
          ...course,
          isAddingToCart: false, // Initial loading state for each card
        }));
        setCourses(coursesWithLoadingStatus);
      });
  }, []);
  const scrollTop = () => {
    window.scrollTo({ top: 225, left: 0, behavior: "smooth" });
  };
  const [loading, setIsLoading] = useState(false);
  const handleCart = (item) => {
    const itemIndex = courses.findIndex((course) => course._id === item._id);

    if (itemIndex === -1) {
      return;
    }

    const newData = {
      customerEmail: user?.email,
      ...item,
      courseId: item._id,
    };

    // Set the loading state for the clicked card to true
    setCourses((prevCourses) => {
      const updatedCourses = [...prevCourses];
      updatedCourses[itemIndex].isAddingToCart = true;
      return updatedCourses;
    });

    axios
      .post("https://artogram-server.vercel.app/cartSingle", newData)
      .then(function (response) {
        document.getElementById("my_modal_n2").showModal();
        setTimeout(() => {
          document.getElementById("loginAlertClose2").click();
        }, 5000);
        setCourses((prevCourses) => {
          const updatedCourses = [...prevCourses];
          updatedCourses[itemIndex].isAddingToCart = false;
          return updatedCourses;
        });
      });
  };
  return (
    <div id="Courses" className=" mb-10 w-11/12 mx-auto">
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_n" className="modal">
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
              You need to be signed in , to add this item to your cart. Sign in
              now to enjoy a seamless shopping experience!
            </p>

            <div className="cardAlertactions">
              <Link to="/Login" className="cardAlertread tracking-wider">
                Sign in
              </Link>

              <div className="cardAlertmark-as-read" href="">
                <form method="dialog" className="">
                  <button className=" h-[30px] w-full " id="loginAlertClose">
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </dialog>
      <dialog id="my_modal_n2" className="modal">
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
              <span className="AddedToCartcardtitle">Added To Cart</span>
              <p className="AddedToCartcardmessage">
                Thank you for your selecting this item. you just have payment
                left now
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
      {/* best tutor */}
      <Title>{"Our Course"}</Title>
      <div>
        <div className="mt-6 ">
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
            {courses.map((x, i) => (
              <>
                <SwiperSlide key={i} className=" pt-5 block  h-[550px] ">
                  <SingleCourse
                    setClose={setClose}
                    close={close}
                    x={modal}
                  ></SingleCourse>
                  <div>
                    <div
                      className="w-[300px] lg:w-[290px] flex mb-14 justify-center mx-auto"
                      onBlur={() => setModal(x)}
                    >
                      <div className="card w-72 bg-base-100   h-[450px] shadow-xl">
                        <figure className="h-[200px]">
                          <img src={x.courseImg} alt="Shoes" />
                        </figure>
                        <div className="card-body">
                          <h2 className="card-title font-VarelaRound flex justify-between theme-text">
                            {x.name}{" "}
                            <span className="font-RussoOne">{x.price} $</span>
                          </h2>
                          <p className="font-VarelaRound theme-text">
                            <h1>Duration: {x.duration}</h1>
                            <h1>Available Seats : {x.availableseats}</h1>
                            <h1>Enrolled Seats : {x.bookedSets}</h1>
                          </p>
                          <div className="card-actions justify-end">
                            {x.isAddingToCart ? (
                              <>
                                <div
                                  style={{ scale: "35%" }}
                                  className="flex justify-center items-center h-[45px]  
                                  "
                                >
                                  <div className="spinner">
                                    <div />
                                    <div />
                                    <div />
                                    <div />
                                    <div />
                                    <div />
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <div
                                  onClick={() => {
                                    if (user) {
                                      setTimeout(() => {
                                        handleCart(x);
                                      }, 360);
                                    } else {
                                      document
                                        .getElementById("my_modal_n")
                                        .showModal();
                                      setTimeout(() => {
                                        document
                                          .getElementById("loginAlertClose")
                                          .click();
                                      }, 5000);
                                    }
                                  }}
                                  className={` ${
                                    x.availableseats === 0
                                      ? "btn-disabled btn rounded-lg font-VarelaRound h-[0.6em] px-[1.7em]"
                                      : "buttonshop"
                                  }`}
                                >
                                  <h1 className="transform duration-300 hover:text-white">
                                    Add to Cart
                                  </h1>
                                </div>
                              </>
                            )}
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
            <Link to="/AllCourses" className="buttonView font-VarelaRound">
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

export default BestCourse;
