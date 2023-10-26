import { useContext, useState } from "react";
import banenr1 from "../../assets/sliderImage/banner9.png";
import banenr2 from "../../assets/sliderImage/banner8.png";
import banenr3 from "../../assets/sliderImage/banner7.png";
import banenr4 from "../../assets/sliderImage/banner6.png";
import { useForm } from "react-hook-form";

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
const Login = () => {
  // location
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const navigate = useNavigate();
  // states
  const [subMitLoading, setSubMitLoading] = useState(false);
  const [passErro, setPassErro] = useState("");
  //   hooks

  // auth data
  const { logIn, glogin } = useContext(AuthCOntext);

  const { register, handleSubmit } = useForm();
  //   form on submit
  const onSubmit = (data) => {
    setSubMitLoading(true);
    logIn(data.email, data.pass)
      .then((result) => {
        const user = result.user;

        if (user) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Signed in successfully",

            timer: 1500,
            showConfirmButton: true,
          });
          navigate(from, { replace: true });
          setSubMitLoading(false);
        }
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
        });
        setSubMitLoading(false);
      });
  };

  const handleGlog = () => {
    glogin()
      .then((result) => {
        const user = result.user;
        const newData = {
          name: user.displayName,
          email: user.email,
          img: user.photoURL,
        };

        axios
          .post("https://artogram-server.vercel.app/users", newData)
          .then(function (response) {
            setSubMitLoading(false);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Signed in successfully",
              showConfirmButton: true,
              timer: 1500,
            });
            navigate(from, { replace: true });
          });
      })
      .catch(() => {});
  };
  return (
    <div className="relative ">
      <Helmet>
        <title>SignIn | ARTOGRAM</title>
      </Helmet>
      <div className="absolute opacity-30  -z-30  w-full flex items-center min-h-screen">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          effect={"fade"}
          modules={[EffectFade, Autoplay]}
          className="mySwiper"
          loop={true}
          autoplay={{
            delay: 5500,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <img className="bg-white w-[700px] mx-auto" src={banenr1} />
          </SwiperSlide>
          <SwiperSlide>
            <img className="bg-white w-[700px] mx-auto" src={banenr2} />
          </SwiperSlide>
          <SwiperSlide>
            <img className="bg-white w-[700px] mx-auto" src={banenr3} />
          </SwiperSlide>
          <SwiperSlide>
            <img className="bg-white w-[700px] mx-auto" src={banenr4} />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="w-11/12 mx-auto min-h-screen flex h-full p-2 lg:p-5 rounded-3xl my-5 lg:mt-10  items-center justify-center">
        {" "}
        <div className="card order-2 flex-shrink-0 w-full  lg:h-[590px]   h-full shadow-2xl ">
          <div className="lg:h-[590px]    rounded-3xl w-full absolute backdrop-blur-xs lg:backdrop-blur-sm bg-opacity-5 bg-red-300 border lg:theme-border "></div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body theme-color1 bg-opacity-5 lg:w-full rounded-3xl flex lg:flex-row items-center"
          >
            <div className="lg:w-1/2 z-0">
              <h1 className="text-center font-KaushanScript z-0 my-5 mb-14 text-4xl  theme-text">
                Login
              </h1>

              <div className="form-control my-10">
                <div className="relative h-14 w-full min-w-[270px]">
                  <input
                    type="email"
                    {...register("email")}
                    required
                    placeholder="@mail.com"
                    className="peer h-full w-full border-b border-gr bg-transparent pt-4 ps-4 pb-1.5 font-sans text-base font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-gray-300 focus:border-[#D81B60] focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                  <label className="after:content[' '] pointer-events-none font-VarelaRound text-black absolute left-0 -top-4 flex h-full w-full select-none text-xl font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0  after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-[#D81B60] peer-focus:after:scale-x-100 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
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
                    className="peer h-full w-full border-b border-gr bg-transparent pt-4 ps-4 pb-1.5 font-sans text-base font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-gray-300 focus:border-[#D81B60] focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                  <label className="after:content[' '] pointer-events-none font-VarelaRound text-black absolute left-0 -top-4 flex h-full w-full select-none text-xl font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0  after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-[#D81B60] peer-focus:after:scale-x-100 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Password
                  </label>
                </div>
              </div>

              <div className="form-control z-0 mt-6">
                <button className="btn theme-color1 text-white border-none font-Montserrat btn-primary">
                  Login
                </button>
              </div>
            </div>
            <div className="divider divider-horizontal px-2 h-[520px] font-VarelaRound hidden lg:flex z-0">
              OR
            </div>
            <div className="z-0 lg:w-1/2">
              <div>
                <div className="order-2 flex items-center mt-5 flex-col justify-center gap-y-3">
                  <h1 className="text-4xl mb-10 font-KaushanScript theme-text hidden lg:block text-center">
                    Or Login With
                  </h1>
                  <div className="divider theme-text mt-10 lg:hidden text-2xl mb-10 font-KaushanScript">
                    Or Login With
                  </div>
                  <button
                    type="button"
                    onClick={handleGlog}
                    className="btn theme-color1 text-white h-[70px] w-[200px] border-none font-Montserrat btn-primary"
                  >
                    <FaGooglePlusG className="text-5xl" />
                    Google
                  </button>
                  <div className="mt-5 font-VarelaRound text-black">
                    New Here?{" "}
                    <Link
                      state={{ from: from }}
                      className="theme-text btn-link"
                      to="/SignUp"
                    >
                      Sign Up
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
                <Circles
                  height="80"
                  width="80"
                  color="#D81B60"
                  ariaLabel="circles-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
