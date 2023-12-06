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
import "../../Pages/LoginAndSignUp/sign.css";
import useToast from "../useToast";
import { FaGooglePlusG } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../useAuth";
import ScrolltoTop from "../../Pages/Shared/ScroolltoTop/Scrolltotop";
import { Helmet } from "react-helmet-async";
const AddClasses = () => {
  // states
  const [subMitLoading, setSubMitLoading] = useState(false);

  //   hooks
  const toast = useToast();
  const { user } = useAuth();
  // img url
  const imgHostingUrl = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_SEC_IMG
  }`;
  // authoriztion token get
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
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
    setSubMitLoading(true);
    axios.post(imgHostingUrl, formData).then(function (response) {
      const newData = {
        courseImg: response.data.data.display_url,
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        availableseats: parseFloat(data.seats),
        bookedSets: 0,
        email: user.email,
        status: "pending",
        duration: data.duration + " " + data.durationType,
      };
      axios
        .post(
          `https://artogram-server.vercel.app/PendingCourses?email=${user.email}`,
          newData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
            },
          }
        )
        .then(function (responseEI) {
          if (responseEI.data.acknowledged === true) {
            setSubMitLoading(false);
            Swal.fire({
              position: "center",
              icon: "success",
              title:
                "Your Course has been submitted to admin wait for approval",
              showConfirmButton: true,
            });
          }
        });
    });
  };
  // image show
  const [image, setImage] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className="relative min-h-screen">
      <Helmet>
        <title>AddClasses | ARTOGRAM</title>
      </Helmet>
      <ScrolltoTop></ScrolltoTop>
      <ScrolltoTop></ScrolltoTop>
      <div className="absolute opacity-30 min-h-screen -z-30  w-full flex items-center ">
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
            <img
              loading="lazy"
              className="bg-white w-[700px] mx-auto"
              src={banenr1}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              loading="lazy"
              className="bg-white w-[700px] mx-auto"
              src={banenr2}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              loading="lazy"
              className="bg-white w-[700px] mx-auto"
              src={banenr3}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              loading="lazy"
              className="bg-white w-[700px] mx-auto"
              src={banenr4}
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="w-11/12 mx-auto mb-20 flex h-full p-2 lg:p-5 rounded-3xl my-5  mt-16 justify-center">
        {" "}
        <div className="card order-2 flex-shrink-0 w-full  lg:h-[590px]   h-full shadow-2xl ">
          <div className="lg:h-[590px]  h-[808px]  rounded-3xl w-full absolute backdrop-blur-xs lg:backdrop-blur-sm bg-opacity-5 bg-red-300 border lg:theme-border "></div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body theme-color1 bg-opacity-5 lg:w-full rounded-3xl flex lg:flex-row items-center"
          >
            <div className="lg:w-1/2 z-0">
              <h1 className="text-center font-KaushanScript z-0 my-5 mb-14 text-4xl  theme-text">
                Add Course
              </h1>

              <div className="form-control my-10">
                <div className="relative h-14 w-full lg:min-w-[200px] min-w-[270px]">
                  <input
                    {...register("name")}
                    type="text"
                    required
                    placeholder="enter your class title"
                    className="peer h-full w-full border-b border-gr bg-transparent pt-4 ps-4 pb-1.5 font-sans text-base font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-gray-300 focus:border-pink-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                  <label className="after:content[' '] pointer-events-none font-VarelaRound text-black absolute left-0 -top-4 flex h-full w-full select-none text-xl font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0  after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-pink-600 peer-focus:after:scale-x-100 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Title
                  </label>
                </div>
              </div>
              <div className="form-control my-10">
                <div className="relative h-14 w-full min-w-[200px]">
                  <input
                    type="number"
                    {...register("price")}
                    required
                    placeholder="$price"
                    className="peer h-full w-full border-b border-gr bg-transparent pt-4 ps-4 pb-1.5 font-sans text-base font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-gray-300 focus:border-pink-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                  <label className="after:content[' '] pointer-events-none font-VarelaRound text-black absolute left-0 -top-4 flex h-full w-full select-none text-xl font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0  after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-pink-600 peer-focus:after:scale-x-100 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Course Price
                  </label>
                </div>
              </div>
              <div className="form-control my-10">
                <div className="relative h-14 w-full min-w-[200px]">
                  <input
                    type="number"
                    required
                    {...register("seats")}
                    placeholder="total seats"
                    className="peer h-full w-full border-b border-gr bg-transparent pt-4 ps-4 pb-1.5 font-sans text-base font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-gray-300 focus:border-pink-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                  <label className="after:content[' '] pointer-events-none font-VarelaRound text-black absolute left-0 -top-4 flex h-full w-full select-none text-xl font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0  after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-pink-600 peer-focus:after:scale-x-100 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Total seats
                  </label>
                </div>
              </div>
              <div className="form-control my-10">
                <div className="relative h-14 w-full min-w-[200px]">
                  <div className="relative font-VarelaRound h-16  min-w-[200px]">
                    <select
                      {...register("category")}
                      className="peer h-full w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 font-sans text-xl font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200  placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-b-2 focus:border-pink-500 focus:border-x-transparent focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    >
                      <option value="3D">3D Painting</option>
                      <option value="Acrylic">Acrylic Painting</option>
                      <option value="Water">Water Painting</option>
                    </select>
                    <label className="after:content[' '] pointer-events-none font-VarelaRound text-black absolute left-0 -top-4 flex h-full w-full select-none text-xl font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0  after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-pink-600 peer-focus:after:scale-x-100 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 after:border-pink-600">
                      Select a Category
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="divider lg:divider-horizontal divider-vertical px-2 lg:h-[520px] font-VarelaRound lg:flex hidden z-0"></div>
            <div className="z-0 lg:w-1/2">
              <div className="grid grid-cols-2 mt-2 mb-10 lg:gap-x-10">
                <div className="form-control ">
                  <div className="relative  h-14 w-1/2 lg:min-w-[200px] min-w-[120px]">
                    <input
                      type="number"
                      required
                      {...register("duration")}
                      placeholder="duration"
                      className="peer h-full w-full border-b border-gr bg-transparent pt-4 ps-4 pb-1.5 font-sans text-base font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-gray-300 focus:border-pink-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    />
                    <label className="after:content[' '] pointer-events-none font-VarelaRound text-black absolute left-0 -top-4 flex h-full w-full select-none text-sm lg:text-xl font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0  after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-pink-600 peer-focus:after:scale-x-100 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Class Duration
                    </label>
                  </div>
                </div>
                <div className="form-control ">
                  <div className="relative h-14 w-1/2 lg:min-w-[140px] min-w-[120px]">
                    <div className="relative font-VarelaRound h-14  min-w-[100px]">
                      <select
                        {...register("durationType")}
                        className="peer h-full w-full    bg-transparent px-3 py-2.5 font-sans text-base font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 border-gray-300 border-b placeholder-shown:border-t-blue-gray-200 empty:!bg-pink-500 focus:border-b focus:border-pink-500 border-x-none focus:border-x-transparent focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      >
                        <option value="Hour">Hour</option>
                        <option value="Min">Min</option>
                        <option value="Day">Day</option>
                      </select>
                      <label className="after:content[' '] pointer-events-none font-VarelaRound text-black absolute left-0 -top-4 flex h-full w-full select-none lg:text-xl text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0  after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-pink-600 peer-focus:after:scale-x-100 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 after:border-pink-600">
                        Duration Type
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-control z-0">
                <div className="file-upload font-VarelaRound">
                  {image ? (
                    ""
                  ) : (
                    <>
                      <img loading="lazy" src={iconsupload} alt="upload" />
                      <h3>upload course banner</h3>
                    </>
                  )}
                  <input
                    {...register("img", { required: true })}
                    aria-invalid={errors.img ? "true" : "false"}
                    onChange={onImageChange}
                    type="file"
                  />
                  {image ? (
                    <img
                      loading="lazy"
                      className="w-full  h-full object-cover rounded-[3rem]"
                      src={image}
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="form-control z-0 mt-6">
                <button className="btn theme-color1 text-white border-none font-Montserrat btn-primary">
                  Add Now
                </button>
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

export default AddClasses;
