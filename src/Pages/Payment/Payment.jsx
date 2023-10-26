import React, { useState } from "react";

import {
  BanknotesIcon,
  CreditCardIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import ScrolltoTop from "../Shared/ScroolltoTop/Scrolltotop";
import { Helmet } from "react-helmet-async";

function formatCardNumber(value) {
  const val = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  const matches = val.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || "";
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(" ");
  } else {
    return value;
  }
}

function formatExpires(value) {
  return value
    .replace(/[^0-9]/g, "")
    .replace(/^([2-9])$/g, "0$1")
    .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2")
    .replace(/^0{1,}/g, "0")
    .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, "$1/$2");
}

export default function Payment() {
  //   const { countries } = useCountries();
  const [type, setType] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpires, setCardExpires] = useState("");

  return (
    <div className="w-full max-w-[24rem]">
      <ScrolltoTop></ScrolltoTop>
      <ScrolltoTop></ScrolltoTop>{" "}
      <Helmet>
        <title>Payment | ARTOGRAM</title>
      </Helmet>
      <div className="bg-gray-100 p-4 flex justify-center items-center text-center">
        <div className="mb-4 h-20 p-6 text-white">
          {type === "card" ? (
            <CreditCardIcon className="h-10 w-10 text-white" />
          ) : (
            <img alt="paypal " className="w-14 " src="/icons/paypall.png" />
          )}
        </div>
        <h5 className="text-white">Material Tailwind PRO</h5>
      </div>
      <div className="p-4">
        <div className="flex">
          <button
            className={`${
              type === "card" ? "bg-blue-500 text-white" : "bg-gray-300"
            } px-4 py-2 border border-blue-500 rounded-l-md`}
            onClick={() => setType("card")}
          >
            Pay with Card
          </button>
          <button
            className={`${
              type === "paypal" ? "bg-blue-500 text-white" : "bg-gray-300"
            } px-4 py-2 border border-blue-500 rounded-r-md`}
            onClick={() => setType("paypal")}
          >
            Pay with PayPal
          </button>
        </div>
        <div
          className={`${
            type === "card" ? "block" : "hidden"
          } mt-4 flex flex-col space-y-4`}
        >
          <div>
            <p className="text-blue-gray-400 font-medium mb-2">Your Email</p>
            <input
              type="email"
              placeholder="name@mail.com"
              className="border border-blue-gray-200 focus:border-gray-900 px-3 py-2"
            />
          </div>
          <div className="my-3">
            <p className="text-blue-gray-400 font-medium mb-2">Card Details</p>
            <input
              maxLength="19"
              value={formatCardNumber(cardNumber)}
              onChange={(event) => setCardNumber(event.target.value)}
              placeholder="0000 0000 0000 0000"
              className="border border-blue-gray-200 focus:border-gray-900 px-3 py-2 relative"
            />
            <div className="my-4 flex items-center space-x-4">
              <div>
                <p className="text-blue-gray-400 font-medium mb-2">Expires</p>
                <input
                  maxLength="5"
                  value={formatExpires(cardExpires)}
                  onChange={(event) => setCardExpires(event.target.value)}
                  placeholder="00/00"
                  className="border border-blue-gray-200 focus:border-gray-900 px-3 py-2 min-w-[72px] relative"
                />
              </div>
              <div>
                <p className="text-blue-gray-400 font-medium mb-2">CVC</p>
                <input
                  maxLength="4"
                  placeholder="000"
                  className="border border-blue-gray-200 focus:border-gray-900 min-w-[72px] relative px-3 py-2"
                />
              </div>
            </div>
            <p className="text-blue-gray-400 font-medium mb-2">Holder Name</p>
            <input
              placeholder="name@mail.com"
              className="border border-blue-gray-200 focus:border-gray-900 px-3 py-2"
            />
          </div>
          <button className="bg-blue-500 text-white px-4 py-2">Pay Now</button>
          <p className="mt-2 flex items-center justify-center space-x-2 text-gray-400 font-medium opacity-60">
            <LockClosedIcon className="h-4 w-4 -mt-0.5" /> Payments are secure
            and encrypted
          </p>
        </div>
        <div
          className={`${
            type === "paypal" ? "block" : "hidden"
          } mt-4 flex flex-col space-y-4`}
        >
          <div>
            <p className="text-blue-gray-400 font-medium mb-4">
              Personal Details
            </p>
            <p className="text-blue-gray-400 font-medium mb-2">Your Email</p>
            <input
              type="email"
              placeholder="name@mail.com"
              className="border border-blue-gray-200 focus:border-gray-900 px-3 py-2"
            />
          </div>
          <div className="my-6">
            <p className="text-blue-gray-400 font-medium mb-4">
              Billing Address
            </p>
            <p className="text-blue-gray-400 font-medium mb-2">Country</p>
            <select className="border border-blue-gray-200 focus:border-gray-900 px-3 py-2">
              {/* {countries.map(({ name, flags }) => (
                <option key={name} value={name}>
                  <div className="flex items-center space-x-2">
                    <img
                      src={flags.svg}
                      alt={name}
                      className="h-4 w-4 rounded-full object-cover"
                    />
                    {name}
                  </div>
                </option>
              ))} */}
            </select>
            <p className="mt-4 -mb-2 text-blue-gray-400 font-medium">
              Postal Code
            </p>
            <input
              placeholder="0000"
              className="border border-blue-gray-200 focus:border-gray-900 px-3 py-2 mt-4"
            />
          </div>
          <button className="bg-blue-500 text-white px-4 py-2">
            Pay with PayPal
          </button>
          <p className="flex items-center justify-center space-x-2 text-gray-400 font-medium">
            <LockClosedIcon className="h-4 w-4 -mt-0.5" /> Payments are secure
            and encrypted
          </p>
        </div>
      </div>
    </div>
  );
}
