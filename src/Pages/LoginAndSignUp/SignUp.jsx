import React from "react";
import banenr1 from "../../assets/sliderImage/banner9.png";
import banenr2 from "../../assets/sliderImage/banner8.png";
import banenr3 from "../../assets/sliderImage/banner7.png";
import banenr4 from "../../assets/sliderImage/banner6.png";
import { useForm } from "react-hook-form";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
const SignUp = () => {
  const imgHostingUrl = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_SEC_IMG
  }`;
  const formData = new FormData();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    formData.append("image", data.img[0]);
    fetch(imgHostingUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((idata) => console.log(idata));
    console.log(data);
  };

  return (
    <div className="relative ">
      <div className="absolute opacity-30  -z-30  w-full flex items-center min-h-screen">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          effect={"fade"}
          modules={[EffectFade, Autoplay]}
          className="mySwiper"
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <img className="bg-white w-[600px] mx-auto" src={banenr1} />
          </SwiperSlide>
          <SwiperSlide>
            <img className="bg-white w-[600px] mx-auto" src={banenr2} />
          </SwiperSlide>
          <SwiperSlide>
            <img className="bg-white w-[600px] mx-auto" src={banenr3} />
          </SwiperSlide>
          <SwiperSlide>
            <img className="bg-white w-[600px] mx-auto" src={banenr4} />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="w-full min-h-screen h-full flex items-center justify-center">
        {" "}
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body theme-color1 bg-opacity-5 rounded-3xl"
          >
            <h1 className="text-center font-KaushanScript  text-4xl text-black">
              Sign Up
            </h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl font-VarelaRound text-black">
                  Name
                </span>
              </label>
              <input
                {...register("name")}
                type="text"
                placeholder="Enter Your Name"
                className="input rounded-lg h-16 ps-6 input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl font-VarelaRound text-black">
                  Email
                </span>
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="@mail.com"
                className="input rounded-lg h-16 ps-6 input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl font-VarelaRound text-black">
                  Password
                </span>
              </label>
              <input
                type="text"
                {...register("pass")}
                placeholder="pAssw0rd"
                className="input rounded-lg h-16 ps-6 input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl font-VarelaRound text-black">
                  Confirm Password
                </span>
              </label>
              <input
                type="text"
                {...register("pass2")}
                placeholder="confirm pAssw0rd"
                className="input rounded-lg h-16 ps-6 input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl font-VarelaRound text-black">
                  Upload Image
                </span>
              </label>
              <input
                type="file"
                {...register("img")}
                className="file-input border-none font-VarelaRound shadow-2xl  file-input-error	 w-full max-w-xs"
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn theme-color1 text-white border-none font-Montserrat btn-primary">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
