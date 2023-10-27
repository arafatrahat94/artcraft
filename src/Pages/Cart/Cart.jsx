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

  const handleDeleteItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "",
      iconHtml: `<img src=${exclamation} alt="" />`,
      showCancelButton: true,
      customClass: {
        confirmButton: "sweet_confirmbuttonImportant",
        cancelButton: "cancelButton",
      },
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://artogram-server.vercel.app/cart/${id}`)
          .then((res) => {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");

            refetch();
          });
      }
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
          .post("https://artogram-server.vercel.app/purchasedProducts", x, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(`ArtAccess`)}`,
            },
          })
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
          availableseats: y.availableseats - 1,
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
            Course Cart
          </h1>
          {cartData.length > 0 ? (
            <>
              <div>
                {cartData.map((x) => (
                  <>
                    <div className="grid gap-x-2 gap-y-2 grid-cols-2 lg:grid-cols-3 w-11/12 mx-auto theme-color1 bg-opacity-5 border my-1 rounded-[2rem]">
                      <div className="flex items-center lg:flex-row flex-col lg:col-span-2">
                        <div className="rounded-3xl my-1  ">
                          <img
                            className="w-16 lg:w-28"
                            src={x.courseImg}
                            alt=""
                          />
                        </div>
                        <div className="text-pink-600  flex lg:text-[16px] text-sm items-center flex-col lg:items-start justify-center font-bold font-VarelaRound">
                          <h1>Name:{x?.name}</h1>
                          <h1>Available: {x?.availableseats} sits</h1>
                          <h1>Price:{x?.price} $</h1>
                        </div>
                      </div>
                      <div className="rounded-3xl my-1  flex gap-x-6 items-center gap-y-2 justify-center">
                        <div className=" flex">
                          <input
                            onChange={() => handleCheck(event, x)}
                            value={x._id}
                            type="checkbox"
                            className="checkbox checkbox-lg  checkbox-secondary"
                          />
                        </div>
                        <div
                          onClick={() => handleDeleteItem(x._id)}
                          className="  flex justify-center"
                        >
                          <img className="w-14 -mt-1" src={deleteicon} alt="" />
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
                  <button className="btn focus:text-white w-[150px] focus:bg-pink-600 bg-white text-pink-600 border border-pink-600 font-Montserrat rounded-xl">
                    Pay Now
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-pink-600 min-h-[70vh] font-KaushanScript text-xl flex justify-center items-center divider-vertical text-center">
                Cart Is Empty
              </h1>
            </>
          )}
        </>
      )}

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
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
              <div>
                <div className="flex justify-center ">
                  <img className="lg:w-32" src={successIcon} alt="" />
                </div>
                <h1 className="text-2xl font-VarelaRound text-pink-600 text-center">
                  Payment Was Successfull
                </h1>
                <h1 className="font-VarelaRound text-center my-2">
                  TransictionId :{" "}
                  <span className="bg-pink-100 p-2">{paymentId}</span>
                </h1>
              </div>
            </>
          ) : (
            <div>
              <h1 className="font-KaushanScript text-2xl text-pink-600 text-center">
                Provide Information
              </h1>
              <div>
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text font-Montserrat text-base text-pink-600">
                      Name :
                    </span>
                  </label>
                  <input
                    type="text"
                    value={user?.name}
                    placeholder="Type here"
                    className="input input-bordered w-full border border-pink-200 disabled font-Montserrat text-pink-600 bg-white input-disabled rounded-xl "
                  />
                </div>
              </div>
              <div>
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text font-Montserrat text-base text-pink-600">
                      Billing Email :
                    </span>
                  </label>
                  <input
                    type="text"
                    value={user?.email}
                    placeholder="Type here"
                    className="input input-bordered w-full border border-pink-200 font-Montserrat text-pink-600 bg-white input-disabled disabled rounded-xl "
                  />
                </div>
              </div>
              <div>
                <div disabled className="mt-2">
                  <label className="label">
                    <span className="label-text font-Montserrat text-base text-pink-600">
                      Products :
                    </span>
                  </label>
                  <div className="form-control border border-pink-200  rounded-xl p-4 disabled  w-full ">
                    {checked.map((x) => (
                      <>
                        <div className="flex flex-col lg:flex-row my-2">
                          <h1 className="text-pink-600 text-base lg:w-1/2 font-Montserrat">
                            Name: {x.name} , Price:{x.price}
                          </h1>
                          <h1 className="text-pink-600 text-base lg:w-1/2 font-Montserrat">
                            {" "}
                            Category : {x.category} Art
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
                    <span className="label-text font-Montserrat text-base text-pink-600">
                      Total Ammount :
                    </span>
                  </label>
                  <input
                    type="text"
                    value={`${total2} $`}
                    className="input input-bordered w-full border border-pink-200 disabled font-Montserrat text-pink-600 bg-white input-disabled rounded-xl "
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
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default Cart;
