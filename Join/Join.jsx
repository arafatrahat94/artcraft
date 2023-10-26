import React from "react";

const Join = () => {
  return (
    <div className="my-16 h-[150px] py-2 lg:h-[160px] theme-color1 bg-opacity-20 grid grid-cols-1 lg:grid-cols-2 ">
      <div className="flex items-center relative">
        <h1 className="lg:text-3xl text-2xl font font-serif mx-2 font-medium text-center justify-center text-black lg:ms-20 flex">
          Daily Art tips and Methods to your inbox!
        </h1>
      </div>
      <div className="flex items-center w-full">
        <div className="join relative w-full">
          <input
            className="input input-bordered mx-auto lg:w-[420px] font-VarelaRound lg:text-2xl lg:ps-4 w-[300px] rounded-lg  lg:h-16 h-12"
            placeholder="@mail.com"
          />
          <button className="btn absolute mt-2 rounded-lg right-[34px] -top-2 scale-90 lg:scale-100 lg:top-0 lg:right-[55px] theme-color1 text-white font-Montserrat">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Join;
