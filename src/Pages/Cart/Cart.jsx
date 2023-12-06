import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import deleteicon from "../../assets/icon/icons8-delete-96.png";
import Swal from "sweetalert2";
import exclamation from "../../assets/icon/icons8-exclamation-96.png";
import "./cart.css";
import { Link, useNavigation } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import { Elements } from "@stripe/react-stripe-js";
import PaymentGate from "../Shared/PaymentGate/PaymentGate";
import { loadStripe } from "@stripe/stripe-js";
import { AiTwotoneTablet } from "react-icons/ai";
import successIcon from "../../assets/icon/icons8-verified-account-96.png";
import ScrolltoTop from "../Shared/ScroolltoTop/Scrolltotop";
import { Helmet } from "react-helmet-async";
import Title from "../Shared/title/title";
import { ToastContainer, toast } from "react-toastify";
const customId = "custom-id-yes";

import { PiStickerBold } from "react-icons/pi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { TiTickOutline } from "react-icons/ti";
import OutsideClickHandler from "react-outside-click-handler";
const Cart = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_PK);
  const { user } = useAuth();

  const [loading, setIsLoading] = useState(true);
  const [cartData, setCartData] = useState([]);
  const navigation = useNavigation();
  const [paymentId, setPaymentId] = useState(null);
  const [paymentLoading, setPamentLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://artogram-server.vercel.app/cart?email=${user?.email}`)
      .then((res) => {
        setCartData(res.data);
        setIsLoading(false);
      });
  }, [user]);
  const refetch = () => {
    fetch(`https://artogram-server.vercel.app/cart?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setCartData(data);
      });
  };
  console.log(cartData);
  const handleDeleteItem = (id) => {
    axios
      .delete(`https://artogram-server.vercel.app/cart/${id}`)
      .then((res) => {
        toast.info("Your product has been deleted", {
          toastId: customId,
        });
        refetch();
      });
  };
  const [checked, setChecked] = useState([]);
  const [checked2, setChecked2] = useState([]);
  const handleCheck = (event, datas) => {
    const newData2 = { ...datas };
    const newData1 = { ...datas };
    delete newData1._id;
    delete newData1.availableseats;
    delete newData1.bookedSets;
    const newData = {
      customerEmail: user.email,
      ...newData1,
    };

    var updatedList = [...checked];
    var updatedList2 = [...checked2];

    if (event.target.checked) {
      updatedList = [...checked, newData];
      updatedList2 = [...checked2, newData2];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
      updatedList2.splice(checked2.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
    setChecked2(updatedList2);
  };

  const total2 = checked.reduce((sum, item) => item.price + sum, 0);

  //   payment gate
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://artogram-server.vercel.app/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
      },
      body: JSON.stringify({ total2 }), // Convert the object to a JSON string
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [total2]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  if (paymentId) {
    const newData2 = {
      customerName: user?.name,
      customerEmail: user?.email,
      transictionId: paymentId,
      purchasedProducts: checked,
      purchaseDate: moment().format("MMM Do YY"),
      paidAmmount: total2,
    };
    axios
      .post("https://artogram-server.vercel.app/Purchased", newData2, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`ArtAccess`)}`,
        },
      })
      .then((res) => {});
    if (checked2.length > 1) {
      checked2.map((x) => {
        axios
          .post(
            "https://artogram-server.vercel.app/SinglepurchasedProducts",
            x,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem(`ArtAccess`)}`,
              },
            }
          )
          .then((res) => {});
      });
    } else if (checked2.length === 1) {
      checked2.map((x) => {
        axios
          .post(
            "https://artogram-server.vercel.app/SinglepurchasedProducts",
            x,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem(`ArtAccess`)}`,
              },
            }
          )
          .then((res) => {});
      });
    }
    checked2.map((y) => {
      if (checked2.length > 0) {
        const newData3 = {
          seats: y.seats - 1,
          bookedSets: y.bookedSets + 1,
        };
        fetch(`https://artogram-server.vercel.app/CourseUpdate/${y.courseId}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
          },
          body: JSON.stringify(newData3),
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
        fetch(`https://artogram-server.vercel.app/cart/${y._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {});
      }
    });
  }
  console.log(checked2);
  return (
    <div>
      <ScrolltoTop></ScrolltoTop>
      <ScrolltoTop></ScrolltoTop>
      <Helmet>
        <title>Cart | ARTOGRAM</title>
      </Helmet>
      {loading ? (
        <>
          <div className=" min-h-screen flex  justify-center items-center">
            <div className="w-full min-h-[100vh] flex justify-center items-center z-50 bg-transparent">
              <div className="loader32"></div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="hidden lg:block text-center text-4xl font-KaushanScript  my-5 ">
            <Title>{"Course Cart"}</Title>
          </h1>
          {cartData.length > 0 ? (
            <>
              <div className="grid lg:grid-cols-2 w-11/12 mx-auto">
                {cartData.map((x) => (
                  <>
                    <div className="my-3 relative rounded-3xl dark:bg-opacity-40 dark:bg-[#121212] border-2 border-blue-400 dark:border-opacity-25 lg:mx-2 mx-14 flex-col justify-center lg:justify-start lg:flex-row flex items-center gap-x-2  p-2">
                      <div className="flex items-center lg:flex-row theme-text w-full flex-col lg:col-span-2">
                        <div className="rounded-3xl my-1  ">
                          <img
                            loading="lazy"
                            className="w-16 lg:w-28"
                            src={x.courseImg}
                            alt=""
                          />
                        </div>
                        <div className="  flex lg:text-[16px] text-sm items-center flex-col lg:items-start justify-center font-bold font-VarelaRound">
                          <h1 className="flex items-center justify-start overflow-scroll">
                            <div>
                              <h1 className="flex">
                                <PiStickerBold className="text-xl" />
                                {x?.courseTitle}
                              </h1>
                            </div>{" "}
                          </h1>

                          <h1 className="flex">
                            <PiStickerBold className="text-xl" /> {x?.seats}
                            Seats{" "}
                          </h1>
                          <h1 className="flex">
                            <PiStickerBold className="text-xl" />
                            {x?.price}$
                          </h1>
                        </div>
                      </div>
                      <div className="rounded-3xl my-1  flex gap-x-6  w-full items-center gap-y-2 justify-center">
                        <div className=" flex">
                          <label className="checkbox-container2">
                            <input
                              className="custom-checkbox2"
                              onChange={() => handleCheck(event, x)}
                              value={x._id}
                              type="checkbox"
                            />
                            <span className="checkmark2 -mt-2"></span>
                          </label>
                        </div>
                        <div
                          onClick={() => handleDeleteItem(x._id)}
                          className=" text-red-600 text-4xl flex justify-center"
                        >
                          <IoCloseCircleOutline />
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <div className="justify-end w-11/12 mt-5 flex">
                <div
                  onClick={() => {
                    document.getElementById("my_modal_3").showModal();
                    setPaymentId(null);
                  }}
                >
                  <button className="btn focus:text-white w-[150px]  bg-white  border  font-Montserrat rounded-xl">
                    Pay Now
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className="theme-text min-h-[70vh] font-KaushanScript text-3xl flex justify-center items-center divider-vertical text-center">
                Cart Is Empty
              </h1>
            </>
          )}
        </>
      )}
      <dialog id="my_modal_3" className="modal backdrop-blur-md">
        <div className="modal-box dark:bg-black theme-color1 bg-opacity-5">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={refetch}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          {paymentId ? (
            <>
              <OutsideClickHandler
                onOutsideClick={() => {
                  document.getElementById("closeNow").click();
                }}
              >
                <div>
                  <div className="flex justify-center w-[100px] mx-auto">
                    <TiTickOutline className="text-4xl theme-text scale-100" />
                  </div>
                  <h1 className="text-2xl font-VarelaRound theme-text text-center">
                    Payment Was Successfull
                  </h1>
                  <h1 className="font-VarelaRound text-center dark:text-white my-[1.5rem]">
                    TransictionId :{" "}
                    <span className="bg-blue-100 p-2">{paymentId}</span>
                  </h1>
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button
                      id="closeNow"
                      className="btn btn-sm btn-circle btn-ghost  absolute right-2 top-2"
                    >
                      ✕
                    </button>
                  </form>
                </div>
              </OutsideClickHandler>
            </>
          ) : (
            <OutsideClickHandler
              onOutsideClick={() => {
                document.getElementById("closeNow").click();
              }}
            >
              <div>
                <h1 className="font-KaushanScript text-2xl text-pink-600 scale-75 text-center">
                  <Title>{"Billing Information"}</Title>
                </h1>
                <div>
                  <div className="form-control w-full ">
                    <label className="label">
                      <span className="label-text font-Montserrat text-base theme-text">
                        Name :
                      </span>
                    </label>
                    <input
                      type="text"
                      value={user?.name}
                      placeholder="Type here"
                      className="input input-bordered w-full border border-blue-500 disabled font-Montserrat theme-text bg-transparent input-disabled rounded-xl "
                    />
                  </div>
                </div>
                <div>
                  <div className="form-control w-full ">
                    <label className="label">
                      <span className="label-text font-Montserrat text-base theme-text">
                        Billing Email :
                      </span>
                    </label>
                    <input
                      type="text"
                      value={user?.email}
                      placeholder="Type here"
                      className="input input-bordered w-full border border-blue-500 font-Montserrat theme-text bg-transparent input-disabled disabled rounded-xl "
                    />
                  </div>
                </div>
                <div>
                  <div disabled className="mt-2">
                    <label className="label">
                      <span className="label-text font-Montserrat text-base theme-text">
                        Products :
                      </span>
                    </label>
                    <div className="form-control border border-blue-500  rounded-xl p-4 disabled  w-full ">
                      {checked.map((x) => (
                        <>
                          <div className="flex flex-col lg:flex-row my-2">
                            <h1 className="theme-text text-base lg:w-1/2 font-Montserrat">
                              Name: {x.courseTitle} , Price:{x.price} Category :{" "}
                              {x.category} Art
                            </h1>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="form-control mt-2 w-full ">
                    <label className="label">
                      <span className="label-text font-Montserrat text-base theme-text">
                        Total Ammount :
                      </span>
                    </label>
                    <input
                      type="text"
                      value={`${total2} $`}
                      className="input input-bordered w-full border border-blue-500 disabled font-Montserrat theme-text bg-transparent input-disabled rounded-xl "
                    />
                  </div>
                </div>
                {clientSecret && (
                  <Elements options={options} stripe={stripePromise}>
                    <PaymentGate
                      paymentId={paymentId}
                      setPaymentId={setPaymentId}
                    ></PaymentGate>
                  </Elements>
                )}
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button
                    id="closeNow"
                    className="btn btn-sm btn-circle btn-ghost  absolute right-2 top-2"
                  >
                    ✕
                  </button>
                </form>
              </div>
            </OutsideClickHandler>
          )}
        </div>
      </dialog>{" "}
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

export default Cart;
