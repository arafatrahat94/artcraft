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
import ImgLoad from "../../Shared/ImgLoad/ImgLoad";
import "react-photo-view/dist/react-photo-view.css";
import { PhotoProvider } from "react-photo-view";
import { FaArrowRight } from "react-icons/fa";

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
        setCourses(coursesWithLoadingStatus.slice(0, 6));
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
    <div id="Courses" className=" mb-10 w-11/12 xl:w-[86%] mx-auto">
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog
        id="my_modal_n"
        className="modal theme-color1 bg-opacity-5 backdrop-blur"
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
      <dialog id="my_modal_n2" className="modal bg-opacity-5 backdrop-blur">
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
          <div className="grid xl:grid-cols-4 gap-y-3 lg:grid-cols-3 ">
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
                          <figure className="xl:h-[240px] h-[240px] rounded-t-[1rem]">
                            <ImgLoad imgs={x.courseImg}></ImgLoad>
                          </figure>
                          <div className=" h-10 mt-2 flex gap-x-1 mx-3">
                            <div className="flex items-center justify-center gap-x-1 font-VarelaRound text-[14px] theme-text bg-opacity-25 w-[100px] rounded-[0.5rem] bg-slate-400 font-semibold">
                              <img
                                className="w-6"
                                src="https://i.ibb.co/fFKTWhG/icons8-clock-100.png"
                                alt=""
                              />
                              34 H
                            </div>
                            <div className="flex items-center justify-center gap-x-1 font-VarelaRound text-[14px] theme-text bg-opacity-25 w-[150px] rounded-[0.5rem]  bg-slate-400 font-semibold">
                              <img
                                className="w-8"
                                src="https://i.ibb.co/hKLKz0K/icons8-three-people-32.png"
                                alt=""
                              />
                              {x.seats} Seat Left
                            </div>
                          </div>
                          <div className="card-body">
                            <h2 className="card-title font-Montserrat font-bold flex dark:text-blue-300 justify-between uppercase theme-text">
                              {x.name}{" "}
                              <span className="font-RussoOne">{x.price} $</span>
                            </h2>
                            <p className="font-VarelaRound dark:text-blue-300 theme-text">
                              <h1>Enrolled : {x.bookedSets}</h1>
                            </p>
                            <div className="card-actions justify-end">
                              <Link
                                className="buttonshop"
                                to={`CourseDetail/${x._id}`}
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
        <div className="flex items-center justify-center mt-3 w-full">
          <Link
            to="/AllCourses"
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
  );
};

export default BestCourse;
