import React, { Children } from "react";

import { NavLink } from "react-router-dom";
const Activelink2 = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "rounded-md lg:mx-5 text-xl font-VarelaRound bg-pink-600 text-white px-5 transform   duration-500 flex gap-x-1  my-2 py-2 "
          : " lg:mx-5 transform duration-500 text-pink-600 px-5   my-2 flex gap-x-1 py-2  text-xl font-VarelaRound "
      }
    >
      {children}
    </NavLink>
  );
};

export default Activelink2;
