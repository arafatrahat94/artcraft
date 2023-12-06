import { useContext, useState } from "react";
import banenr1 from "../../assets/sliderImage/banner9.png";
import banenr2 from "../../assets/sliderImage/banner8.png";
import banenr3 from "../../assets/sliderImage/banner7.png";
import banenr4 from "../../assets/sliderImage/banner6.png";
import { useForm } from "react-hook-form";
import iconsupload from "../../assets/icon/icons8-upload-to-cloud-96.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import { AuthCOntext } from "../../Provider/AuthProvider";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import Swal from "sweetalert2";
import iconImg from "../../assets/icon/icons8-error-80.png";
import "./sign.css";

import { FaGooglePlusG } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Spinner from "../Shared/Spinner/Spinner";
import Title from "../Shared/title/title";
const SignUp = () => {
  // states
  const [subMitLoading, setSubMitLoading] = useState(false);
  const [passErro, setPassErro] = useState("");
  const location = useLocation();
  const from = location?.state?.from || "/";

  const navigate = useNavigate();

  // auth data
  const { createN, glogin } = useContext(AuthCOntext);
  // img url
  const imgHostingUrl = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_SEC_IMG
  }`;
  const closedPopUp = () => {
    navigate(from, { replace: true });
  };
  //   form data
  const formData = new FormData();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //   form on submit
  const onSubmit = (data) => {
    formData.append("image", data.img[0]);
    if (data.pass !== data.pass2) {
      return setPassErro("⚠ both password does not match");
    } else {
      setSubMitLoading(true);
      createN(data.email, data.pass)
        .then((result) => {
          const user = result.user;

          fetch(imgHostingUrl, {
            method: "POST",
            body: formData,
          })
            .then((res) => res.json())
            .then((idata) => {
              if (idata.success === true) {
                const newData = {
                  name: data.name,
                  email: data.email,
                  img: idata.data.display_url,
                  profiletype: "student",
                };

                axios
                  .post("https://artogram-server.vercel.app/users", newData)
                  .then(function () {
                    setSubMitLoading(false);
                    document.getElementById("showSuccess").click();
                    // navigate(from, { replace: true });
                  });
              }
            });
        })
        .catch((error) => {
          Swal.fire({
            icon: ``,
            iconHtml: `<img  src=${iconImg} alt="error"/>`,
            title: "Error",
            backdrop: "blur",
            text: error.message
              .split("Firebase:")
              .join(" ")
              .split(" Error ")
              .join(""),
            showConfirmButton: false,
            footer: '<a href="">you did not created any account yet?Report</a>',
          });
          setSubMitLoading(false);
        });
    }
  };
  // image show
  const [image, setImage] = useState(null);
  const deleteImg = () => {
    setImage(null);
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  const handleGlog = () => {
    glogin()
      .then((result) => {
        const user = result.user;
        const newData = {
          name: user.displayName,
          email: user.email,
          img: user.photoURL,
          profiletype: "student",
        };

        axios
          .post("https://artogram-server.vercel.app/users", newData)
          .then(function (response) {
            setSubMitLoading(false);
            document.getElementById("showSuccess").click();
          });
      })
      .catch(() => {});
  };
  return (
    <div className="relative dark:bg-[#121212]">
      <Helmet>
        <title>SignUp | ARTOGRAM</title>
      </Helmet>
      <div className="absolute opacity-30     w-full flex items-center  min-h-[100%] lg:min-h-screen ">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          modules={[Autoplay]}
          className="mySwiper min-h-screen lg:min-h-full"
          loop={true}
          autoplay={{
            delay: 5500,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <img loading="lazy" className=" w-[700px] mx-auto" src={banenr1} />
          </SwiperSlide>
          <SwiperSlide>
            <img loading="lazy" className=" w-[700px] mx-auto" src={banenr2} />
          </SwiperSlide>
          <SwiperSlide>
            <img loading="lazy" className=" w-[700px] mx-auto" src={banenr3} />
          </SwiperSlide>
          <SwiperSlide>
            <img loading="lazy" className=" w-[700px] mx-auto" src={banenr4} />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="lg:w-11/12 mx-auto flex h-full lg:px-5 rounded-3xl min-h-[100%] lg:min-h-screen    items-center justify-center">
        {" "}
        <div className="card order-2 flex-shrink-0 w-full  lg:h-[590px]   h-full  ">
          <div className="lg:h-[590px]    rounded-3xl w-full hidden lg:block absolute backdrop-blur-md bg-opacity-5  "></div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body theme-color1 bg-opacity-5 lg:w-full rounded-3xl flex lg:flex-row items-center"
          >
            <div className="lg:w-1/2 z-0">
              <h1 className="text-center font-KaushanScript z-i0 my-5  mb-14 text-4xl  scale-75 theme-text">
                <Title>{"SignUp"}</Title>
              </h1>

              <div className="form-control my-10">
                <div className="relative h-14 w-full lg:min-w-[200px] min-w-[290px]">
                  <input
                    {...register("name")}
                    type="text"
                    required
                    placeholder="enter your name"
                    className="peer h-full w-full border-b border-gr bg-transparent pt-4 ps-4 pb-1.5 font-sans text-base font-normal text-blue-gray-700 outline outline-0 transition-all dark:text-white placeholder-shown:border-gray-300 focus:border-[#0b2447] focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                  <label className="after:content[' '] pointer-events-none font-VarelaRound theme-text absolute left-0 -top-4 flex h-full w-full select-none text-xl font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0  after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm  peer-focus:leading-tight peer-focus:theme-text peer-focus:after:scale-x-100 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Name
                  </label>
                </div>
              </div>
              <div className="form-control my-10">
                <div className="relative h-14 w-full min-w-[200px]">
                  <input
                    type="email"
                    {...register("email")}
                    required
                    placeholder="@mail.com"
                    className="peer h-full w-full border-b border-gr bg-transparent pt-4 ps-4 pb-1.5 font-sans text-base font-normal  text-blue-gray-700 outline outline-0 transition-all dark:text-white placeholder-shown:border-gray-300 focus:border-[#0b2447] focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                  <label className="after:content[' '] pointer-events-none font-VarelaRound theme-text absolute left-0 -top-4 flex h-full w-full select-none text-xl font-normal  leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0  after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:theme-text peer-focus:after:scale-x-100 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Email
                  </label>
                </div>
              </div>
              <div className="form-control my-10">
                <div className="relative h-14 w-full min-w-[200px]">
                  <input
                    type="text"
                    required
                    onChangeCapture={() => setPassErro("")}
                    {...register("pass")}
                    placeholder="pAssw0rd"
                    className="peer h-full w-full border-b border-gr bg-transparent dark:text-white pt-4 ps-4 pb-1.5 font-sans text-base font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-gray-300 focus:border-[#0b2447] focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                  <label className="after:content[' '] pointer-events-none font-VarelaRound theme-text absolute left-0 -top-4 flex h-full w-full select-none text-xl font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0  after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:theme-text peer-focus:after:scale-x-100 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Password
                  </label>
                </div>
              </div>
              <div className="form-control my-10">
                <div className="relative h-14 w-full min-w-[200px]">
                  <input
                    type="text"
                    required
                    onChangeCapture={() => setPassErro("")}
                    {...register("pass2")}
                    placeholder="pAssw0rd"
                    className="peer h-full w-full border-b border-gr bg-transparent pt-4 ps-4 pb-1.5 font-sans text-base font-normal text-blue-gray-700 outline outline-0 transition-all dark:text-white placeholder-shown:border-gray-300 focus:border-[#0b2447] focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                  <label className="after:content[' '] pointer-events-none font-VarelaRound theme-text absolute left-0 -top-4 flex h-full w-full select-none text-xl font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0  after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:theme-text peer-focus:after:scale-x-100 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Confirm Password
                  </label>
                </div>
                {passErro ? (
                  <>
                    <p
                      role="alert"
                      className="duration-300 mt-3 transform bg-white py-2 rounded-xl theme-text text-center font-VarelaRound"
                    >
                      {passErro}
                    </p>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="divider divider-horizontal px-2 h-[520px] font-VarelaRound hidden lg:flex z-0">
              OR
            </div>
            <div className="z-0 lg:w-1/2">
              <div className="form-control z-0 flex items-center ">
                <div className="containerUpn">
                  <div className="containerUpheader relative">
                    {image ? (
                      ""
                    ) : (
                      <>
                        <div className="absolute w-20">
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
                              <path
                                d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15"
                                stroke="#000000"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>{" "}
                            </g>
                          </svg>{" "}
                          <p className="theme-text">Browse File to upload!</p>{" "}
                        </div>
                      </>
                    )}
                    <input
                      className="opacity w-full relative opacity-0 h-full "
                      {...register("img", { required: true })}
                      aria-invalid={errors.img ? "true" : "false"}
                      onChange={onImageChange}
                      type="file"
                    />
                    {image ? (
                      <img
                        loading="lazy"
                        className="w-full  h-full object-cover absolute -z-10"
                        src={image}
                        alt=""
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>

              <div className="form-control z-0 mt-6">
                <button className="btn bg-[#0b2447] rounded-md text-white border-none font-Montserrat btn-primary">
                  Sign Up
                </button>
              </div>
              <div>
                <div className="order-2 flex items-center mt-5 flex-col justify-center gap-y-3">
                  <h1 className="text-4xl mb-10 font-KaushanScript theme-text hidden lg:block text-center">
                    Or Sign Up With
                  </h1>
                  <div className="divider theme-text mt-10 lg:hidden text-2xl mb-10 font-KaushanScript">
                    Or Sign Up With
                  </div>
                  <button
                    type="button"
                    className="btn px-20 outline outline-[#0b2447] bg-transparent theme-text"
                    onClick={handleGlog}
                  >
                    Google
                  </button>
                  <div className="mt-5 font-VarelaRound text-black dark:text-white">
                    Already Created Account?{" "}
                    <Link className="theme-text btn-link" to="/Login">
                      Sign In
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
          {subMitLoading === true ? (
            <>
              <div className="lg:h-[590px] rounded-3xl w-full h-full absolute backdrop-blur-sm bg-opacity-5 z-0 bg-black  "></div>
              <div className="absolute text-5xl lg:h-[590px]  w-full h-full flex justify-center items-center">
                <div className="w-full min-h-[100vh] flex justify-center items-center z-50 ">
                  <div className="w-full min-h-[100vh] flex justify-center items-center z-50 ">
                    <div className="w-full  flex justify-center items-center z-50 ">
                      <div className="loader32 "></div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          <button
            id="showSuccess"
            onClick={() => document.getElementById("my_modal_n2").showModal()}
          ></button>
          <dialog id="my_modal_n2" className="modal">
            <div className="AddedToCartcard">
              <button type="button" className="AddedToCartcarddismiss">
                <form method="dialog" className="">
                  <button onClick={closedPopUp} id="loginAlertClose2">
                    ×
                  </button>
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
                  <span className="AddedToCartcardtitle">Sucess</span>
                  <p className="AddedToCartcardmessage">
                    Thank you for your selecting us. your account is created.
                  </p>
                </div>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
