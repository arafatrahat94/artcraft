import React, { useEffect, useState } from "react";
import { BsFillCaretUpFill } from "react-icons/bs";
import "./scroll.css";
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
    <div className="">
      {" "}
      <div
        className={`${
          buttonShow === true
            ? "fixed opacity-90 bottom-14 right-4 transform  duration-500"
            : "opacity-0 fixed bottom-14 right-0 transform duration-500"
        } z-20 animate-bounce duration-300 delay-300`}
      >
        <button onClick={HandleScroll} className="learn-more">
          <a id="scroll-up" className="scroll-upBut">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                fill="rgba(255,255,255,1)"
                d="M11.9997 10.8284L7.04996 15.7782L5.63574 14.364L11.9997 8L18.3637 14.364L16.9495 15.7782L11.9997 10.8284Z"
              ></path>
            </svg>
          </a>
        </button>
      </div>
    </div>
  );
};

export default ScrolltoTop;
