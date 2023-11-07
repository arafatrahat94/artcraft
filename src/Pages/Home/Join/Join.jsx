import React from "react";

const Join = () => {
  return (
    <div className="my-20 h-[150px] py-2 lg:h-[200px] theme-color1 bg-opacity-20 grid grid-cols-1 lg:grid-cols-2 ">
      <div className="flex items-center relative">
        <h1 className="lg:text-3xl text-xl font font-RussoOne mx-6 lg:mx-2 font-medium lg:text-center justify-center theme-text lg:ms-20 flex">
          Daily Art tips and Methods to your inbox!
        </h1>
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="join  relative w-full">
          <input
            style={{ boxShadow: "7px 7px 0 0 #0b2447" }}
            className="border-[#0b2447] border-none focus:border-none ring-transparent mx-auto lg:w-[420px]  join-item font-VarelaRound lg:text-2xl lg:ps-4 px-5 w-[287px] rounded-lg  lg:h-16 h-12"
            placeholder="@mail.com"
          />
          <button className="btn absolute mt-2 rounded-lg join-item -top-2 scale-90 lg:scale-100 lg:top-0 right-[42px] lg:right-[55px] theme-color1 text-white font-Montserrat">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Join;
