import axios from "axios";
import plus from "../../assets/icon/icons8-plus-96.png";
import exclamation from "../../assets/icon/icons8-exclamation-96.png";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";

import { Circles } from "react-loader-spinner";
import Swal from "sweetalert2";

import success from "../../assets/icon/icons8-verified-account-96.png";
import ScrolltoTop from "../Shared/ScroolltoTop/Scrolltotop";
import { Helmet } from "react-helmet-async";
const EnrolledCourse = () => {
  const { user } = useAuth();

  const [loading, setIsLoading] = useState(true);
  const [data, setdata] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://artogram-server.vercel.app/EnrolledCourse?email=${user?.email}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(`ArtAccess`)}`,
          },
        }
      )
      .then((res) => {
        setdata(res.data);
        setIsLoading(false);
      });
  }, [user]);
  const addToSelected = (x) => {
    delete x._id;
    Swal.fire({
      title: "Are you sure?",
      icon: "",
      iconHtml: `<img src=${exclamation} alt="" />`,
      customClass: {
        confirmButton: "sweet_confirmbuttonImportant",
        cancelButton: "cancelButton",
        isConfirmed: "isConfirmed",
      },

      showCancelButton: true,

      confirmButtonText: "Yes , add to favorite",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://artogram-server.vercel.app/FavouriteProducts`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
            "content-type": "application/json",
          },
          body: JSON.stringify(x),
        }).then((res) => {
          Swal.fire({
            title: "Sweet!",
            iconHtml: `<img src=${success} alt="" />`,
            text: "Added to favorite",
          });
        });
      }
    });
  };
  return (
    <div>
      <ScrolltoTop></ScrolltoTop>
      <ScrolltoTop></ScrolltoTop>
      <Helmet>
        <title>EnrolledCourse | ARTOGRAM</title>
      </Helmet>
      {loading ? (
        <>
          <div className=" min-h-screen flex  justify-center items-center">
            <Circles
              height="80"
              width="80"
              method="dialog"
              color="#D81B60"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        </>
      ) : (
        <>
          <h1 className="hidden lg:block text-center text-4xl font-KaushanScript  my-5 text-pink-600">
            Enrolled Course
          </h1>
          {data.length > 0 ? (
            <>
              <div>
                {data.map((x, i) => (
                  <>
                    <div className="flex lg:flex-row flex-col  gap-x-2  p-3 w-9/12 lg:w-11/12 mx-auto theme-color1 bg-opacity-5 border my-1 rounded-[2rem]">
                      <div className="flex items-center lg:flex-row flex-col text-center lg:w-[500px] gap-x-2 lg:col-span-2">
                        <div className="rounded-3xl my-1  ">
                          <button className="btn-circle text-pink-600 btn">
                            {i + 1}
                          </button>
                        </div>
                        <div className=" rounded-3xl w-24 ">
                          <img
                            className="w-full h-full object-cover"
                            src={x.courseImg}
                            alt=""
                          />
                        </div>
                        <div className="text-pink-600  flex lg:text-[16px] text-sm items-center flex-col lg:items-start justify-center  font-VarelaRound">
                          <h1>Name:{x?.name}</h1>
                          <h1 className="my-2">
                            Category:{" "}
                            <span className=" p-[2px] ">{x?.category}</span> Art
                          </h1>
                          <h1 className="">
                            Duration :{" "}
                            <span className=" p-[2px] ">{x?.duration} $</span>{" "}
                          </h1>
                        </div>
                      </div>
                      <div>
                        <div
                          onClick={() => {
                            addToSelected(x);
                          }}
                          className="h-full flex items-center justify-center"
                        >
                          <button className="btn  w-[150px]  bg-white text-pink-600 border border-pink-600 font-Montserrat rounded-xl">
                            <img className="w-5" src={plus} alt="" /> Favorites
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </>
          ) : (
            <>
              <h1 className="text-pink-600 min-h-[70vh] font-KaushanScript text-xl flex justify-center items-center divider-vertical text-center">
                Enrolled Course Is Empty
              </h1>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default EnrolledCourse;
