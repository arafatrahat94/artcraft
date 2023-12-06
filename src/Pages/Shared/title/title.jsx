import React from "react";
import "./title.css";
const Title = ({ children }) => {
  return (
    <div className=" flex justify-center ">
      <h1 className="fancy ">
        <span className="top-key"></span>
        <span className="text">{children}</span>
        <span className="bottom-key-1"></span>
        <span className="bottom-key-2"></span>
      </h1>
    </div>
  );
};

export default Title;
