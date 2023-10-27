import React, { useState } from "react";
import { Circles } from "react-loader-spinner";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import axios from "axios";

const SingleCourse = ({ x, setClose, close }) => {
  const { user } = useAuth();
  const [isloading, setIsLoading] = useState(false);

  const handleCart = (item) => {
    const datas = { ...x };

    delete datas._id;
    const newData = {
      customerEmail: user.email,
      ...datas,
      courseId: x._id,
    };

    setClose(null);
    setIsLoading(true);

    axios
      .post("https://artogram-server.vercel.app/cartSingle", newData)
      .then(function (response) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully Added To Cart",
          showConfirmButton: true,
        });
        if (response.data.acknowledged === true) {
          setClose(true);
        }
        if (response.data.message) {
          setClose(true);
        }
        setIsLoading(false);
      });
  };
  if (close === true) {
    setClose(null);
  }
  return (
    <div>
      {" "}
      {close ? (
        <></>
      ) : (
        <>
          <dialog
            id="my_modal_3"
            className="modal w-full backdrop-blur-md z-50 "
          >
            {isloading === true ? (
              <>
                <Circles
                  onClose={() => setClose(null)}
                  height="80"
                  width="80"
                  method="dialog"
                  color="#D81B60"
                  ariaLabel="circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </>
            ) : (
              <>
                <div className="modal-box lg:w-[450px]   duration-200 transform">
                  <form method="dialog" className="">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm lg:btn-md btn-circle btn-ghost theme-color1 text-white lg:text-xl absolute right-2 top-2">
                      ✕
                    </button>
                  </form>

                  <div>
                    <div className="lg:w-[400px] h-[300px] my-5 mx-auto">
                      <img
                        className="rounded-[2rem] mx-auto w-full object-cover h-full"
                        src={x.courseImg}
                        alt=""
                      />
                    </div>
                    <div>
                      <h1 className="text-center font-KaushanScript text-pink-500 text-2xl">
                        Course Name: {x.name}
                      </h1>
                      <h1 className="font-VarelaRound text-base text-pink-600 mt-2">
                        Art Category : {x.category}
                      </h1>
                      <h1 className="font-VarelaRound text-base text-pink-600 mt-2">
                        Available Seats : {x.availableseats}
                      </h1>
                      <h1 className="font-VarelaRound text-base text-pink-600 mt-2">
                        Booked Seats : {x.bookedSets}
                      </h1>
                      <h1 className="font-VarelaRound text-base text-pink-600 mt-2">
                        Course Duration : {x.duration}
                      </h1>
                      <h1 className="font-VarelaRound text-xl text-pink-600 mt-2">
                        Course Price : {x.price} $
                      </h1>
                    </div>
                    <button
                      onClick={() => handleCart(x)}
                      className={`px-5 btn theme-color1 border-none mt-4 w-full rounded-2xl text-white font-Montserrat uppercase"
                      type="button" ${
                        x.availableseats === 0 ? "btn-disabled" : ""
                      }
                      data-ripple-light="true`}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </>
            )}
          </dialog>
        </>
      )}
    </div>
  );
};

export default SingleCourse;
