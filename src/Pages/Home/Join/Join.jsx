import React from "react";

const Join = () => {
  return (
    <div className="my-16 h-[160px] theme-color1 bg-opacity-20 grid grid-cols-2 ">
      <div className="flex items-center relative">
        <h1 className="text-3xl font font-serif font-medium text-black ms-20 flex">
          Daily Art tips and Methods to your inbox!
        </h1>
      </div>
      <div className="flex items-center w-full">
        <div className="join w-full">
          <input
            className="input input-bordered w-[420px] ps-4 rounded-lg  h-16 "
            placeholder="Email"
          />
          <button className="btn absolute mt-2 rounded-lg right-[99px] theme-color1 text-white font-Montserrat">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Join;
