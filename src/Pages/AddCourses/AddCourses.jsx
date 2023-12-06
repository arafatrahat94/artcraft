import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import ScrolltoTop from "../Shared/ScroolltoTop/Scrolltotop";
import ModuleCLasses from "./ModuleCLasses";
import MainModuleClass from "./MainModuleClass";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
const customId = "custom-id-yes";

import "react-toastify/dist/ReactToastify.css";
const AddCourses = () => {
  const [studyPlan, setStudyPlan] = useState(true);
  const [instuctor, setinstuctor] = useState(false);
  const [help, sethelp] = useState(false);
  const [help2, sethelp2] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  const [loading, setLoading] = useState(false);
  // const [banerImage, setbanerImage] = useState(null);

  const [image1, setImage1] = useState(null);
  const formData = new FormData();
  const [Modules, setModulues] = useState([0]);
  const [modulesDataFUll, setmodulesDataFUll] = useState([]);
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage1(URL.createObjectURL(event.target.files[0]));
    }
  };

  const imgHostingUrl = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_SEC_IMG
  }`;
  const deleteImg = () => {
    setImage1(null);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // setLoading(true);

    console.log(data);
    formData.append("image", data.image[0]);
    axios.post(imgHostingUrl, formData).then((res) => {
      console.log(res);
    });
    fetch(imgHostingUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data2) => {
        const newDataL = {
          courseTitle: data.courseTitle,
          shortDecription: data.shortDecription,
          price: parseFloat(data.totalPrice),
          seats: parseFloat(data.totalSeats),
          category: data.category,
          email: user?.email,
          bookedSets: 0,
          status: "pending",
          courseImg: data2.data.display_url,
          Modules: modulesDataFUll,
          leadTeacher: {
            imgUrl: "https://i.ibb.co/jRtmcZG/icons8-account-94.png",
            instructorname: data.leadInstructorName,
            instructorEdu: data.leadInstructorEducationalDetails,
          },
          aboutCourse: data.aboutCourse,
          supportiveTeacher: {
            imgUrl: "https://i.ibb.co/jRtmcZG/icons8-account-94.png",
            instructorname: data.SupportiveInstructorname,
            instructorEdu: data.SupportiveInstructorEducationalDetails,
          },
        };
        axios
          .post(
            `https://artogram-server.vercel.app/PendingCourses?email=${user.email}`,
            newDataL,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
              },
            }
          )
          .then(function (responseEI) {
            if (responseEI.data.acknowledged === true) {
              setLoading(false);
              toast.info("Course Submitted to admin Successfully!", {
                toastId: customId,
              });
              reset();
              deleteImg();
            }
          });
      });
  };
  console.log(modulesDataFUll);
  const addCourseButton = (
    <>
      {" "}
      <div>
        <button
          type="submit"
          className="btn w-full mt-3 font-sans uppercase border border-black theme-text bg-opacity-25 bg-blue-400  border-opacity-25
h-[55px] dark:bg-[#2d8cf0] dark:text-[#0b2447]"
        >
          Add Course Now
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen max-w-7xl mx-auto">
      <ScrolltoTop></ScrolltoTop>
      <Helmet>
        <title>Course Detail | ARTOGRAM</title>
      </Helmet>
      {loading === true ? (
        <div className="w-full min-h-screen flex justify-center items-center z-50 bg-white dark:bg-[#121212]">
          <div className="loader32"></div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col-reverse gap-x-4 lg:flex-row w-[96%] mx-auto"
        >
          <div className="w-full lg:w-[590px] xl:w-[700px] theme-text mt-2 ">
            <h1 className="font-Montserrat uppercase text-3xl lg:text-5xl flex flex-col items-center justify-center font-bold text-center">
              <input
                {...register("courseTitle", { required: true })}
                className="w-[80%] rounded-xl bg-transparent border border-blue-300 focus:text-start px-4 transform duration-300 lg:w-[70%] outline-none border-opacity-30 text-center py-2 uppercase"
                placeholder="Course Title"
                type="text"
              />
              <h1 className="text-xl flex justify-start w-[70%] mt-1">
                {errors.courseTitle && <span>! This field is required</span>}
              </h1>
            </h1>

            <p className="mt-3 px-1 text-center lg:text-left theme-text flex justify-center dark:text-white transform flex-col items-center duration-500 ">
              <textarea
                name=""
                id=""
                {...register("shortDecription", { required: true })}
                placeholder="Enter a short description about course"
                className="w-[90%] px-4 py-3 backdrop-blur-lg rounded-2xl  border border-blue-300 border-opacity-30 text-center focus:transform focus:duration-300 outline-none focus:text-start focus:h-[180px] bg-transparent"
              ></textarea>
              <h1 className="text-xl theme-text flex justify-start w-[85%] mt-1">
                {errors.shortDecription && (
                  <span> ! This field is required</span>
                )}
              </h1>
            </p>

            <div id="studyplan" className="mt-5  ms-0 lg:ms-2">
              <select
                {...register("category")}
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 outline-none bg-transparent px-3 py-2.5 font-sans text-xl font-normal text-blue-gray-700  outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200  placeholder-shown:border-t-blue-gray-200 empty:!bg-blue-500 focus:border-b-2 focus:border-blue-500 focus:border-x-transparent focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              >
                <option value="3D">3D Painting</option>
                <option value="Acrylic">Acrylic Painting</option>
                <option value="Water">Water Painting</option>
              </select>
              <div className="mt-4 focus:border-opacity-40 border  border-opacity-20 w-full dark:bg-[#121212]  dark:border-opacity-25 join join-vertical dark:border-blue-400 rounded-xl border-base-300">
                {Modules.map((x, i) => (
                  <>
                    <MainModuleClass
                      i={i}
                      Modules={Modules}
                      setmodulesDataFUll={setmodulesDataFUll}
                      modulesDataFUll={modulesDataFUll}
                      setModulues={setModulues}
                    ></MainModuleClass>
                  </>
                ))}
              </div>
              <div id="AboutCourse">
                {" "}
                <h1 className="font-sans uppercase text-3xl font-semibold my-5 text-[#0b2447] dark:text-white">
                  About Course :
                </h1>
                <div className="mb-10 bg-opacity-5 dark:bg-opacity-60 border-s-4 border border-opacity-25 bg-blue-400 dark:bg-[#121212] rounded-lg border-blue-500 p-5">
                  <p className="text-xl backdrop-blur-md my-4">
                    <textarea
                      {...register("aboutCourse", { required: true })}
                      placeholder="write a brief description about your course"
                      className="w-full p-3 theme-text bg-transparent border border-opacity-25  border-blue-300 rounded-3xl h-[200px]"
                    ></textarea>
                  </p>
                </div>
              </div>
              <div id="Instructor" className="mt-10 ">
                <h1 className="font-sans uppercase text-3xl font-semibold text-[#0b2447] dark:text-white">
                  Instructor :
                </h1>

                <div className="   mt-5 border-s-4 border border-opacity-25 rounded-lg border-blue-500 pb-5">
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
                  <div className="w-[95%] rounded-xl mx-auto   flex items-center gap-x-4 p-2">
                    <div>
                      <img
                        src="https://i.ibb.co/jRtmcZG/icons8-account-94.png"
                        alt=""
                      />{" "}
                    </div>
                    <div>
                      <h1 className="text-2xl flex flex-col font-bold font-VarelaRound">
                        <input
                          {...register("leadInstructorName", {
                            required: true,
                          })}
                          className="w-[100%] rounded-md bg-transparent px-2 border border-blue-300   transform duration-300  outline-none border-opacity-30 mx-2  uppercase"
                          placeholder="Instructor name"
                          type="text"
                        />{" "}
                        <h1 className="text-xl theme-text flex justify-start w-[85%] mt-1">
                          {errors.leadInstructorName && (
                            <span> ! This field is required</span>
                          )}
                        </h1>
                      </h1>
                      <h1>
                        <input
                          {...register("leadInstructorEducationalDetails", {
                            required: true,
                          })}
                          className="w-[100%] rounded-md bg-transparent px-2 border border-blue-300 my-1  transform duration-300  outline-none border-opacity-30 mx-2  "
                          placeholder="Educational Details"
                          type="text"
                        />{" "}
                        <h1 className="text-xl theme-text flex justify-start w-[85%] mt-1">
                          {errors.leadInstructorEducationalDetails && (
                            <span> ! This field is required</span>
                          )}
                        </h1>
                      </h1>
                    </div>
                  </div>
                  ;
                </div>
                <div className="  mt-5 border-s-4 border border-opacity-25 rounded-lg border-blue-500 pb-5">
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
                  <div className="w-[95%] rounded-xl mx-auto   flex items-center gap-x-4 p-2">
                    <div>
                      <img
                        src="https://i.ibb.co/jRtmcZG/icons8-account-94.png"
                        alt=""
                      />
                    </div>
                    <div>
                      <h1 className="text-2xl flex-col font-bold font-VarelaRound">
                        <input
                          {...register("SupportiveInstructorname", {
                            required: true,
                          })}
                          className="w-[100%] rounded-md bg-transparent px-2 border border-blue-300   transform duration-300  outline-none border-opacity-30 mx-2  uppercase"
                          placeholder="Instructor name"
                          type="text"
                        />{" "}
                        <h1 className="text-xl theme-text flex justify-start w-[85%] mt-1">
                          {errors.SupportiveInstructor && (
                            <span> ! This field is required</span>
                          )}
                        </h1>
                      </h1>
                      <h1>
                        <input
                          {...register(
                            "SupportiveInstructorEducationalDetails",
                            {
                              required: true,
                            }
                          )}
                          className="w-[100%] rounded-md bg-transparent px-2 border border-blue-300 my-1  transform duration-300  outline-none border-opacity-30 mx-2  "
                          placeholder="Educational Details"
                          type="text"
                        />{" "}
                        <h1 className="text-xl theme-text flex justify-start w-[85%] mt-1">
                          {errors.SupportiveInstructorEducationalDetails && (
                            <span> ! This field is required</span>
                          )}
                        </h1>
                      </h1>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="md:hidden">{addCourseButton}</div>
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
          lg:flex-grow rounded-xl pb-5  lg:flex"
          >
            <div className=" mt-5">
              <div className="">
                <div className="containerUp3 ">
                  <div className="containerUpheader relative">
                    {image1 ? (
                      ""
                    ) : (
                      <>
                        <div className="absolute  ">
                          <img
                            className="lg:scale-110 mx-auto"
                            src="https://i.ibb.co/rHz2prn/icons8-upload-to-cloud-96-2.png"
                            alt=""
                          />
                          <p className="theme-text w-[200px]">
                            Browse File to upload banner image!
                          </p>{" "}
                        </div>
                      </>
                    )}
                    <input
                      className="opacity w-full relative opacity-0 h-full "
                      {...register("image")}
                      id="imgOne"
                      onChange={onImageChange}
                      type="file"
                      value={image1 ? undefined : ""}
                    />
                    {image1 ? (
                      <img
                        loading="lazy"
                        className="w-full  h-full rounded-md object-cover absolute -z-10"
                        src={image1}
                        alt=""
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="relative">
                    <div onClick={deleteImg} className="svgDelete3 ">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z"
                            stroke="#000000"
                            strokeWidth="2"
                          ></path>{" "}
                          <path
                            d="M19.5 5H4.5"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                          ></path>{" "}
                          <path
                            d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z"
                            stroke="#000000"
                            strokeWidth="2"
                          ></path>{" "}
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-x-2">
                <div className="flex items-center justify-center gap-x-1 font-VarelaRound text-[14px] theme-text bg-opacity-25  h-[50px] mx-auto mt-2 rounded-[0.5rem] w-full bg-slate-400 font-semibold">
                  <img
                    className="w-8"
                    src="https://i.ibb.co/hKLKz0K/icons8-three-people-32.png"
                    alt=""
                  />
                  <input
                    {...register("totalSeats", {
                      required: true,
                    })}
                    className="w-[40px] rounded-md bg-transparent px-2 border border-blue-300   transform duration-300 outline-none border-opacity-30 mx-2  uppercase"
                    placeholder=""
                    type="number"
                  />{" "}
                  Seat Left
                </div>
                <h1 className="text-xl theme-text flex justify-start w-[70%] mt-1">
                  {errors.totalSeats && <span>! This field is required</span>}
                </h1>
                <div className="flex items-center justify-center gap-x-1 font-VarelaRound text-[14px] theme-text bg-opacity-25 w-full h-[50px] mx-auto mt-2 rounded-[0.5rem]  bg-slate-400 font-semibold">
                  <img
                    className="w-8"
                    src="https://i.ibb.co/17pbgq8/icons8-dollar-100.png"
                    alt=""
                  />
                  <input
                    {...register("totalPrice", {
                      required: true,
                    })}
                    className="w-[40px] rounded-md bg-transparent px-2 border border-blue-300   transform duration-300 outline-none border-opacity-30 mx-2  uppercase"
                    placeholder=""
                    type="number"
                  />
                  Price
                </div>

                <h1 className="text-xl theme-text flex justify-start w-[70%] mt-1">
                  {errors.totalPrice && <span>! This field is required</span>}
                </h1>
              </div>
            </div>{" "}
            <div>
              <div>
                <button
                  type="submit"
                  className="btn hidden lg:flex w-full mt-3 font-sans uppercase border border-black theme-text bg-opacity-25 bg-blue-400  border-opacity-25
h-[55px] dark:bg-[#2d8cf0] dark:text-[#0b2447]"
                >
                  Add Course Now
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default AddCourses;
