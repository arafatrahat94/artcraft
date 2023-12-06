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

// import "./sign.css";

import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Title from "../Shared/title/title";
import axios from "axios";

const ShareArt = () => {
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);
  // auth data

  // img url
  const imgHostingUrl = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_SEC_IMG
  }`;

  //   form data
  const formData = new FormData();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //   form on submit
  let newData;
  const onSubmit2 = async (data) => {
    if (data.imgO[0] && data.imgTw[0] && data.imgTh[0] && data.imgF[0]) {
      newData = [data.imgO[0], data.imgTw[0], data.imgTh[0], data.imgF[0]];
      console.log(newData);
    } else if (data.imgO[0] && data.imgTw[0] && data.imgTh[0]) {
      newData = [data.imgO[0], data.imgTw[0], data.imgTh[0]];
      console.log(newData);
    } else if (data.imgO[0] && data.imgTw[0]) {
      newData = [data.imgO[0], data.imgTw[0]];
      console.log(newData);
    } else {
      newData = [data.imgO[0]];
      console.log(newData);
    }
    newData.map((x) => {
      formData.append("image", x);
      fetch(imgHostingUrl, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          const newData2 = { src: data.data.display_url };
          console.log(newData2);
          axios
            .post("https://artogram-server.vercel.app/postPicture", newData2, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
              },
            })
            .then((res) => {
              console.log(res);
            });
          console.log(data);
        });
    });

    console.log(formData);
    // fetch(imgHostingUrl, {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
  };
  // image show
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [showImg2, setShowImg2] = useState(true);
  const [showImg3, setShowImg3] = useState(true);
  const [showImg4, setShowImg4] = useState(true);
  const deleteImg = () => {
    setImage1(null);
    document.getElementById("imgO").value = "";
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage1(URL.createObjectURL(event.target.files[0]));
    }
    setShowImg2(true);
  };
  const deleteImg2 = () => {
    setImage2(null);
    document.getElementById("imgTwo").value = "";
  };
  const onImageChange2 = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage2(URL.createObjectURL(event.target.files[0]));
    }
    setShowImg3(true);
  };
  const deleteImg3 = () => {
    setImage3(null);
    document.getElementById("imgThree").value = "";
  };
  const onImageChange3 = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage3(URL.createObjectURL(event.target.files[0]));
    }
    setShowImg4(true);
  };
  const deleteImg4 = () => {
    setImage4(null);
    document.getElementById("imgFour").value = "";
  };
  const onImageChange4 = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage4(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className="relative min-h-screen">
      <Helmet>
        <title>ShareArt | ARTOGRAM</title>
      </Helmet>{" "}
      {isLoading ? (
        <div className="w-full min-h-[80vh] flex justify-center items-center z-50 ">
          <div className="loader32"></div>
        </div>
      ) : (
        <div className="lg:w-11/12 mx-auto flex h-full p-2 rounded-3xl flex-col my-5 py-5  items-center justify-center">
          {" "}
          <Title>{"ShareArt"}</Title>
          <div className="card order-2 flex-shrink-0 w-full  lg:h-[590px]   h-full  ">
            <div className="lg:h-[590px]  h-full  rounded-3xl w-full absolute backdrop-blur-xs lg:backdrop-blur-sm   "></div>
            <form
              onSubmit={handleSubmit(onSubmit2)}
              className="card-body lg:w-full rounded-3xl flex lg:flex-col items-center"
            >
              <div className="form-control z-0 items-center ">
                <div className="containerUp ">
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
                            Browse File to upload!
                          </p>{" "}
                        </div>
                      </>
                    )}
                    <input
                      className="opacity w-full relative opacity-0 h-full "
                      {...register("imgO")}
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
                    <div onClick={deleteImg} className="svgDelete ">
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
              <div className="form-control lg:grid grid-cols-3 z-0 flex-row flex items-center gap-x-2 justify-center">
                {showImg2 && (
                  <div className="containerUp2 ">
                    <div className="containerUpheader relative">
                      {image2 ? (
                        ""
                      ) : (
                        <>
                          <div className="absolute w-10  lg:w-20">
                            <img
                              src=" https://i.ibb.co/ft5nqzS/icons8-add-96.png"
                              alt=""
                            />
                          </div>
                        </>
                      )}
                      <input
                        className="opacity w-full relative opacity-0 h-full "
                        id="imgTwo"
                        {...register("imgTw")}
                        onChange={onImageChange2}
                        type="file"
                        value={image2 ? undefined : ""}
                      />
                      {image2 ? (
                        <img
                          loading="lazy"
                          className="w-full  h-full rounded-md object-cover absolute -z-10"
                          src={image2}
                          alt=""
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="relative">
                      <div onClick={deleteImg2} className="svgDelete2 ">
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
                )}
                {showImg3 && (
                  <div className="containerUp2 ">
                    <div className="containerUpheader relative">
                      {image3 ? (
                        ""
                      ) : (
                        <>
                          <div className="absolute w-10 lg:w-20">
                            <img
                              src=" https://i.ibb.co/ft5nqzS/icons8-add-96.png"
                              alt=""
                            />
                          </div>
                        </>
                      )}
                      <input
                        className="opacity w-full relative opacity-0 h-full "
                        id="imgThree"
                        {...register("imgTh")}
                        onChange={onImageChange3}
                        value={image3 ? undefined : ""}
                        type="file"
                      />
                      {image3 ? (
                        <img
                          loading="lazy"
                          className="w-full  h-full rounded-md object-cover absolute -z-10"
                          src={image3}
                          alt=""
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="relative">
                      <div onClick={deleteImg3} className="svgDelete2 ">
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
                )}
                {showImg4 && (
                  <div className="containerUp2 ">
                    <div className="containerUpheader relative">
                      {image4 ? (
                        ""
                      ) : (
                        <>
                          <div className="absolute w-10 lg:w-20">
                            <img
                              src=" https://i.ibb.co/ft5nqzS/icons8-add-96.png"
                              alt=""
                            />
                          </div>
                        </>
                      )}
                      <input
                        className="opacity w-full relative opacity-0 h-full "
                        id="imgFour"
                        {...register("imgF")}
                        onChange={onImageChange4}
                        value={image4 ? undefined : ""}
                        type="file"
                      />
                      {image4 ? (
                        <img
                          loading="lazy"
                          className="w-full  h-full rounded-md object-cover absolute -z-10"
                          src={image4}
                          alt=""
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="relative">
                      <div onClick={deleteImg4} className="svgDelete2 ">
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
                )}
              </div>
              <button type="submit" className="z-10  ">
                <div className="form-control z-0 mt-6">
                  <button className="btn bg-[#0b2447] rounded-md text-white h-[40px] w-[150px] border-none font-Montserrat btn-primary">
                    Upload Now
                  </button>
                </div>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareArt;
