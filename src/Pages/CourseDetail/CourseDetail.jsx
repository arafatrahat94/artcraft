import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import ScrolltoTop from "../Shared/ScroolltoTop/Scrolltotop";
import { Link, useLoaderData } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";

const CourseDetail = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const courseData = useLoaderData();
  console.log(courseData);
  const [studyPlan, setStudyPlan] = useState(true);
  const [instuctor, setinstuctor] = useState(false);
  const [help, sethelp] = useState(false);
  const [help2, sethelp2] = useState(false);
  const { user } = useAuth();
  const handleCart = (item) => {
    const newdataasw = { ...item };
    delete newdataasw._id;
    const newData = {
      customerEmail: user?.email,
      ...newdataasw,
      courseId: item._id,
    };
    console.log(newData);
    axios
      .post("https://artogram-server.vercel.app/cartSingle", newData)
      .then(function (response) {
        document.getElementById("my_modal_n2").showModal();
        setTimeout(() => {
          document.getElementById("loginAlertClose2").click();
        }, 5000);
      });
  };
  useEffect(() => {
    setTimeout(() => {
      setInitialLoading(false);
    }, 2000);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  const enrollNow = (
    <>
      {courseData.seats === 0 ? (
        <>
          {" "}
          <button
            className=" w-full mt-3 font-sans uppercase rounded-lg line-through  border opacity-40 border-black theme-text bg-opacity-25 bg-blue-400  border-opacity-25
  h-[55px] dark:bg-[#2d8cf0] dark:text-[#0b2447]"
          >
            Enroll Now
          </button>
        </>
      ) : (
        <>
          {" "}
          <button
            onClick={() => {
              if (!user) {
                document.getElementById("my_modal_n2").showModal();
              } else {
                handleCart(courseData);
              }
            }}
            className="btn w-full mt-3 font-sans uppercase border border-black theme-text bg-opacity-25 bg-blue-400  border-opacity-25
  h-[55px] dark:bg-[#2d8cf0] dark:text-[#0b2447]"
          >
            Enroll Now
          </button>
        </>
      )}
    </>
  );
  return (
    <div className="min-h-screen max-w-7xl mx-auto">
      <ScrolltoTop></ScrolltoTop>
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
      <Helmet>
        <title>Course Detail | ARTOGRAM</title>
      </Helmet>
      {initialLoading === true ? (
        <div className="w-full min-h-[100vh] flex justify-center items-center z-50 ">
          <div className="loader32"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-x-4 lg:flex-row w-[96%] mx-auto">
          <div className="w-full lg:w-[590px] xl:w-[700px] theme-text mt-2 ">
            <h1 className="font-Montserrat uppercase text-4xl lg:text-5xl font-bold text-center">
              {courseData.courseTitle}
            </h1>
            <p className="mt-3 px-1 text-center lg:text-left theme-text dark:text-white">
              {courseData.shortDecription}
            </p>
            <div className="md:hidden mt-5">
              <img
                className="bg-white w-full h-[200px] xl:h-[300px] rounded-xl object-cover"
                src={courseData.courseImg}
                alt=""
              />
              <div className="flex gap-x-2">
                <div className="flex items-center justify-center gap-x-1 font-VarelaRound text-[14px] theme-text bg-opacity-25  h-[50px] mx-auto mt-2 rounded-[0.5rem] w-full bg-slate-400 font-semibold">
                  <img
                    className="w-8"
                    src="https://i.ibb.co/hKLKz0K/icons8-three-people-32.png"
                    alt=""
                  />
                  {courseData.seats} Seat Left
                </div>
                <div className="flex items-center justify-center gap-x-1 font-VarelaRound text-[14px] theme-text bg-opacity-25 w-full h-[50px] mx-auto mt-2 rounded-[0.5rem]  bg-slate-400 font-semibold">
                  Price {courseData.price} $
                </div>
              </div>
              <div>{enrollNow}</div>
              <div className="mt-5 p-4  rounded-lg dark:bg-opacity-30 theme-color1 bg-opacity-10 dark:bg-[#121212]">
                <h1 className="font-sans  mb-4 dark:text-white uppercase text-black">
                  What Are You Getting From This Course???
                </h1>
                <div className="flex  gap-x-1 theme-text">
                  <div
                    className="font-VarelaRound w-1/2
              "
                  >
                    <li className="lg:text-xl text-base">10 Modules</li>
                    <li className="lg:text-xl text-base">650 Classes</li>
                    <li className="lg:text-xl text-base">Job Placement</li>
                    <li className="lg:text-xl text-base">Certificate</li>
                  </div>
                  <div className="font-VarelaRound w-1/2">
                    <li className="lg:text-xl text-base">10 Live Class</li>
                    <li className="lg:text-xl text-base">650 Classes</li>
                    <li className="lg:text-xl text-base">Digital notes</li>
                    <li className="lg:text-xl text-base">free resources</li>
                  </div>
                </div>
                <p
                  type="Call"
                  className="mt-4 font-VarelaRound theme-text text-[19px]"
                >
                  Call{" "}
                  <span className="link text-black dark:text-white">
                    +8801940389600
                  </span>{" "}
                  (10am to 8pm)
                </p>
              </div>
            </div>
            <div
              role="tablist"
              className="flex border p-2 gap-x-1 items-center mt-10 mb-10 bg-transparent lg:border-0 border-black border-opacity-25 h-16 rounded-lg "
            >
              {/* <a
              href="#studyplan"
              onClick={() => {
                setStudyPlan(true);
                sethelp(false);
                sethelp2(false);
                setinstuctor(false);
              }}
              role="tab"
              className={`${
                studyPlan === true
                  ? "text-white dark:text-black transform duration-300 w-[120px] h-[50px] flex items-center justify-center rounded-xl font-VarelaRound font-bold  text-center bg-blue-400"
                  : "w-[120px] transform duration-300 h-[50px] flex items-center justify-center rounded-xl font-VarelaRound font-bold  text-center theme-text"
              } text-xs lg:text-xl`}
            >
              StudyPlan
            </a> */}
              <a
                href="#AboutCourse"
                onClick={() => {
                  setStudyPlan(false);
                  sethelp2(true);
                  sethelp(false);
                  setinstuctor(false);
                }}
                role="tab"
                className={`${
                  help2 === true
                    ? "text-white dark:text-black transform duration-300 lg:w-[145px] w-[120px] h-[50px] flex items-center justify-center rounded-xl font-VarelaRound font-bold  text-center bg-blue-400"
                    : " lg:w-[145px] w-[120px] transform duration-300 h-[50px] flex items-center justify-center rounded-xl font-VarelaRound font-bold  text-center theme-text "
                } text-xs lg:text-xl`}
              >
                About Course
              </a>
              <a
                href="#Instructor"
                onClick={() => {
                  setStudyPlan(false);
                  sethelp(false);
                  sethelp2(false);
                  setinstuctor(true);
                }}
                role="tab"
                className={`${
                  instuctor === true
                    ? "text-white dark:text-black transform duration-300 w-[120px] h-[50px] flex items-center justify-center rounded-xl font-VarelaRound font-bold  text-center bg-blue-400"
                    : "w-[120px] transform duration-300 h-[50px] flex items-center justify-center rounded-xl font-VarelaRound font-bold  text-center theme-text "
                } text-xs lg:text-xl`}
              >
                Instructor
              </a>
              <a
                href="#help"
                onClick={() => {
                  setStudyPlan(false);
                  sethelp(true);
                  sethelp2(false);
                  setinstuctor(false);
                }}
                role="tab"
                className={`${
                  help === true
                    ? "text-white dark:text-black transform duration-300 w-[120px] h-[50px] flex items-center justify-center rounded-xl font-VarelaRound font-bold  text-center bg-blue-400"
                    : "w-[120px] transform duration-300 h-[50px] flex items-center justify-center rounded-xl font-VarelaRound font-bold  text-center theme-text "
                } text-xs lg:text-xl`}
              >
                Help
              </a>
            </div>
            <div id="studyplan" className="mt-5  ms-0 lg:ms-2">
              {/* <h1 className=" text-xl uppercase darkBg font-VarelaRound py-2 px-4 rounded-lg dark:text-white">
              Study Plan : <br className="lg:hidden" />
              <span className="theme-text">
                <span>10 Modules</span> , <span>34 Live Class</span> ,{" "}
                <span>12 Test</span>
              </span>
            </h1> */}
              <div className="mt-4">
                <Accordion allowMultipleExpanded>
                  {courseData.Modules.map((x, index) => (
                    <AccordionItem key={index}>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          <div
                            tabIndex={0}
                            className="collapse collapse-arrow focus:border-opacity-40 border  border-blue-400 border-opacity-60 dark:bg-[#121212] dark:bg-opacity-60 dark:border-opacity-25 dark:border-blue-400"
                          >
                            <div className="flex p-3">
                              <div className="w-[80px] text-center bg-blue-500 text-white h-[80px] px-2 rounded-xl flex items-center justify-center font-semibold font-VarelaRound">
                                <h1>Module {x.moduleNo}</h1>
                              </div>
                              <div className="ms-4">
                                <h1 className="text-2xl font-sans uppercase font-semibold">
                                  {x.moduleTitle}
                                </h1>
                                <div className="mt-2 flex gap-x-2">
                                  <div className="flex items-center font-VarelaRound font-semibold theme-text text-opacity-70 uppercase dark:text-white">
                                    <img
                                      className="w-6"
                                      src="https://i.ibb.co/Fm7FF0Z/icons8-documentary-96.png"
                                      alt=""
                                    />
                                    {x.liveCLass} Live Class
                                  </div>
                                  <div className="flex items-center font-VarelaRound font-semibold theme-text text-opacity-70 uppercase dark:text-white">
                                    <img
                                      className="w-5"
                                      src="https://i.ibb.co/z619jJw/icons8-clipboard-list-96.png"
                                      alt=""
                                    />{" "}
                                    &nbsp;
                                    {x.testS} Test
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel className="">
                        {x.classes.map((y) => (
                          <>
                            {y.type === "textarea" ? (
                              <div>
                                <h1 className="bg-black bg-opacity-5 px-3 font-VarelaRound py-3 border-b-2 border-opacity-20 border-blue-300">
                                  <span className="py-2 text-xl">
                                    Class {y.classNo} :
                                  </span>{" "}
                                  {y.classTitle}
                                </h1>
                              </div>
                            ) : (
                              <div>
                                <h1 className="bg-black bg-opacity-5 px-3 font-VarelaRound py-3 border-b-2 border-opacity-20 border-blue-300">
                                  <span className="py-2 text-xl">
                                    Class {y.classNo} :
                                  </span>{" "}
                                  {y.classTitle}
                                </h1>
                              </div>
                            )}
                          </>
                        ))}
                      </AccordionItemPanel>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
              <div id="AboutCourse">
                {" "}
                <h1 className="font-sans uppercase text-3xl font-semibold my-5 text-[#0b2447] dark:text-white">
                  About Course :
                </h1>
                <div className="mb-10 bg-opacity-5 dark:bg-opacity-60 border-s-4 border border-opacity-25 bg-blue-400 dark:bg-[#121212] rounded-lg border-blue-500 p-5">
                  <p className="text-xl my-4">{courseData.aboutCourse}</p>
                </div>
              </div>
              <div id="Instructor" className="my-10 ">
                <h1 className="font-sans uppercase text-3xl font-semibold text-[#0b2447] dark:text-white">
                  Instructor :
                </h1>

                <div className=" theme-color1 dark:bg-[#121212] bg-opacity-5 dark:bg-opacity-25 mt-5 border-s-4 border border-opacity-25 rounded-lg border-blue-500 pb-5">
                  <div className="text-2xl font-sans font-semibold uppercase flex items-center p-2">
                    <img
                      className="w-14"
                      src="https://i.ibb.co/CnNFc4p/icons8-badge-64.png"
                      alt=""
                    />
                    <h1 className="-mt-2 dark:text-white theme-text">
                      {" "}
                      Lead Instuctor :
                    </h1>
                  </div>
                  <div className="w-[95%] rounded-xl mx-auto  darkBg flex items-center gap-x-4 p-2">
                    <div>
                      {" "}
                      <img
                        className="rounded-full border-4 border-blue-400 w-24"
                        src={courseData.leadTeacher.imgUrl}
                      />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold font-VarelaRound">
                        {courseData.leadTeacher.instructorname}
                      </h1>
                      <h1>{courseData.leadTeacher.instructorEdu}</h1>
                    </div>
                  </div>
                </div>
                <div className=" theme-color1 dark:bg-[#121212] bg-opacity-5 dark:bg-opacity-25 mt-5 border-s-4 border border-opacity-25 rounded-lg border-blue-500 pb-5">
                  <div className="text-2xl font-sans font-semibold uppercase flex items-center p-2">
                    <img
                      className="w-14"
                      src="https://i.ibb.co/Njj1nwH/icons8-police-badge-94.png"
                      alt=""
                    />{" "}
                    <h1 className="-mt-2 dark:text-white theme-text">
                      {" "}
                      Support Instuctor :
                    </h1>
                  </div>
                  <div className="w-[95%] rounded-xl mx-auto  darkBg flex items-center gap-x-4 p-2">
                    <div>
                      {" "}
                      <img
                        className="rounded-full border-4 border-blue-400 w-24"
                        src={courseData.supportiveTeacher.imgUrl}
                      />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold font-VarelaRound">
                        {courseData.supportiveTeacher.instructorname}
                      </h1>
                      <h1>{courseData.supportiveTeacher.instructorEdu}</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div id="help">
                {" "}
                <h1 className="font-sans uppercase text-3xl font-semibold my-5 text-[#0b2447] dark:text-white">
                  Help :
                </h1>
                <div className="mb-10 bg-opacity-5 dark:bg-opacity-50 border-s-4 border border-opacity-25 rounded-lg bg-blue-400 dark:bg-[#121212] border-blue-500 p-5">
                  <h1 className="text-xl font-VarelaRound dark:text-white">
                    Course Related :
                  </h1>
                  <p className=" my-4">
                    For any batch related information call +880193895040 (10 am
                    to 10 pm)
                  </p>
                  <h1 className="text-xl font-VarelaRound text-black dark:text-white">
                    Payment Related :
                  </h1>
                  <p className=" my-4">
                    If you want to join live batch and make payment- <br />
                    1. Click on "Join Live Batch" button <br />
                    2. Select your batch schedule
                    <br /> 3. Click on the "Purchase" button
                    <br /> 4. Select your preferred payment method <br />
                    5. Complete the payment Once the process is complete you
                    will get a message and your dashboard will show your joined
                    batch.
                    <br />
                    Start the course according to your study plan.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className=" flex-col h-full
        border border-black border-opacity-25 darkBg lg:flex-grow rounded-xl pb-5 hidden lg:flex"
          >
            <div className="">
              <img
                className="bg-white w-full h-[200px] xl:h-[300px] rounded-xl object-cover"
                src={courseData.courseImg}
                alt=""
              />
              <div className="flex gap-x-2 mt-4 px-4">
                <div className="flex items-center justify-center gap-x-1 font-VarelaRound text-[14px] theme-text bg-opacity-25  h-[50px] mx-auto mt-2 rounded-[0.5rem] w-full bg-slate-400 font-semibold">
                  <img
                    className="w-8"
                    src="https://i.ibb.co/hKLKz0K/icons8-three-people-32.png"
                    alt=""
                  />
                  {courseData.seats} Seat Left
                </div>
                <div className="flex items-center justify-center gap-x-1 font-VarelaRound text-[14px] theme-text bg-opacity-25 w-full h-[50px] mx-auto mt-2 rounded-[0.5rem]  bg-slate-400 font-semibold">
                  Price {courseData.price} $
                </div>
              </div>
              <div className="px-4">{enrollNow}</div>
            </div>
            <div className="mt-5 px-4  ">
              <h1 className="font-sans  mb-4 dark:text-white uppercase text-black">
                What Are You Getting From This Course???
              </h1>
              <div className="flex  gap-x-1 theme-text">
                <div
                  className="font-VarelaRound w-1/2
              "
                >
                  <li className="text-xl">10 Modules</li>
                  <li className="text-xl">650 Classes</li>
                  <li className="text-xl">Job Placement</li>
                  <li className="text-xl">Certificate</li>
                </div>
                <div className="font-VarelaRound w-1/2">
                  <li className="text-xl">10 Live Class</li>
                  <li className="text-xl">650 Classes</li>
                  <li className="text-xl">Digital notes</li>
                  <li className="text-xl">free resources</li>
                </div>
              </div>
              <p
                type="Call"
                className="mt-4 font-VarelaRound theme-text text-[19px]"
              >
                Call{" "}
                <span className="link text-black dark:text-white">
                  +8801940389600
                </span>{" "}
                (10am to 8pm)
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
<>
  {/* <div
                    tabIndex={0}
                    className="collapse collapse-arrow focus:border-opacity-40 border border-base-300 border-opacity-20 dark:bg-[#121212] dark:bg-opacity-60 dark:border-opacity-25 dark:border-blue-400"
                  >
                    <div className="flex p-3">
                      <div className="w-[80px] text-center bg-blue-500 text-white h-[80px] px-2 rounded-xl flex items-center justify-center font-semibold font-VarelaRound">
                        <h1>Module {x.moduleNo}</h1>
                      </div>
                      <div className="ms-4">
                        <h1 className="text-2xl font-sans uppercase font-semibold">
                          {x.moduleTitle}
                        </h1>
                        <div className="mt-2 flex gap-x-2">
                          <div className="flex items-center font-VarelaRound font-semibold theme-text text-opacity-70 uppercase dark:text-white">
                            <img
                              className="w-6"
                              src="https://i.ibb.co/Fm7FF0Z/icons8-documentary-96.png"
                              alt=""
                            />
                            {x.liveCLass} Live Class
                          </div>
                          <div className="flex items-center font-VarelaRound font-semibold theme-text text-opacity-70 uppercase dark:text-white">
                            <img
                              className="w-5"
                              src="https://i.ibb.co/z619jJw/icons8-clipboard-list-96.png"
                              alt=""
                            />{" "}
                            2 Test
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="collapse-content">
                      <p>
                        tabIndex={0} attribute is necessary to make the div
                        focusable
                      </p>
                    </div>
                  </div> */}
</>;
