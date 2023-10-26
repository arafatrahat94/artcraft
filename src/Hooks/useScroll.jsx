import React from "react";

const useScroll = () => {
  const scrollTop = () => {
    window.scrollTo({ top: 225, left: 0, behavior: "smooth" });
  };
  return scrollTop;
};

export default useScroll;
