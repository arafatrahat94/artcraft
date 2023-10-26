import React, { useEffect, useState } from "react";
import { BsFillCaretUpFill } from "react-icons/bs";

const ScrolltoTop = () => {
  const [buttonShow, setButton] = useState(false);
  const changeBackground = () => {
    // console.log(window.scrollY);
    if (window.scrollY >= 300) {
      setButton(true);
    } else {
      setButton(false);
    }
  };
  useEffect(() => {
    changeBackground();
    // console.log(buttonShow);
    // adding the event when scroll change background
    window.addEventListener("scroll", changeBackground);
  });
  const HandleScroll = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  return (
    <div>
      {" "}
      <div
        className={`${
          buttonShow === true
            ? "fixed bottom-14 right-2 transform opacity-100 duration-500"
            : "opacity-0 fixed bottom-14 right-0 transform duration-500"
        } z-20 animate-bounce duration-300 delay-300`}
      >
        <button
          onClick={HandleScroll}
          className="btn p-2 lg:w-14 rounded-full cursor-pointer border-2 border-pink-600  "
        >
          <span className="text-pink-600 ">
            <BsFillCaretUpFill />
          </span>
        </button>
      </div>
    </div>
  );
};

export default ScrolltoTop;
