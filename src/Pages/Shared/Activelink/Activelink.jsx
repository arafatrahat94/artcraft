import React, { Children } from "react";
import "./activelink.css";
import { NavLink } from "react-router-dom";
const Activelink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? "active1" : "inactive1")}
    >
      {children}
    </NavLink>
  );
};

export default Activelink;

// rounded-md lg:mx-5 text-base font-VarelaRound bg-pink-600 text-white px-2 transform lg:bg-white font-bold lg:text-pink-600 duration-500 flex lg:py-0 gap-x-1 lg:my-0 my-1 py-2 lg:uppercase
