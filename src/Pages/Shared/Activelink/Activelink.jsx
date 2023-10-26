import React, { Children } from "react";

import { NavLink } from "react-router-dom";
const Activelink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "rounded-md lg:mx-5 text-base font-VarelaRound bg-pink-600 text-white px-2 transform lg:bg-white font-bold lg:text-pink-600 duration-500 flex lg:py-0 gap-x-1 lg:my-0 my-1 py-2 lg:uppercase"
          : " lg:mx-5 transform duration-500 text-pink-600 px-2 font-semibold lg:text-black lg:my-0 my-1 flex gap-x-1 py-2 lg:py-0 text-base font-VarelaRound lg:uppercase"
      }
    >
      {children}
    </NavLink>
  );
};

export default Activelink;
