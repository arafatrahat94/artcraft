import React, { Children } from "react";
import "./activelink.css";
import { NavLink } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
const Activelink = ({ to, children }) => {
  const { themeN } = useAuth();
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? `${
              themeN !== "true"
                ? "darkthemetext font-RussoOne uppercase  flex items-center justify-center transform duration-300"
                : "active1"
            }`
          : `${
              themeN !== "false"
                ? " font-RussoOne   flex items-center justify-center theme-text  dark:text-white   duration-300 transform"
                : "font-RussoOne  theme-text duration-300 transform"
            }`
      }
    >
      {children}
    </NavLink>
  );
};

export default Activelink;

// rounded-md lg:mx-5 text-base font-VarelaRound bg-pink-600 text-white px-2 transform lg:bg-white font-bold lg:text-pink-600 duration-500 flex lg:py-0 gap-x-1 lg:my-0 my-1 py-2 lg:uppercase
