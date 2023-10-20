import React from "react";

import {
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
import useAuth from "../../../Hooks/useAuth";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
const Nav = () => {
  const { user, logOUT } = useAuth();
  console.log(user?.img);
  // scroller

  const scrollToElement = (element) => {
    scroller.scrollTo(element, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };
  // nav open
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  // mui nav
  const handleLogOut = () => {
    logOUT().then(() => {});
  };
  //navoptions
  const NavOptions = (
    <>
      <Link
        to="/"
        className="px-5 text-base cursor-pointer font-Montserrat  font-semibold theme-text"
      >
        Home
      </Link>
      <li
        onClick={() => scrollToElement("instructors")}
        className="px-5 text-base cursor-pointer font-Montserrat font-semibold"
      >
        Instructors
      </li>
      {user ? (
        <>
          <div className="rounded-full flex justify-end  ">
            <div className="dropdown  dropdown-hover dropdown-bottom text-black">
              <li
                tabIndex={0}
                className="px-10 text-base cursor-pointer font-Montserrat font-semibold"
              >
                Classes
              </li>
              <ul
                tabIndex={0}
                className="hidden mt-2 lg:block dropdown-content z-10 menu p-2 relative  shadow me-10 rounded-box w-[170px] bg-white ring-opacity-60 theme-text ring ring-pink-600"
              >
                <button className="w-full btn rounded-lg text-pink-600 focus:text-white  bg-white normal-case font-VarelaRound text-base focus:bg-pink-600">
                  <Link
                    to="/AddClasses"
                    className=" w-full h-full flex items-center"
                  >
                    <a className="flex items-center gap-x-2">
                      <AiOutlinePlusCircle className="text-xl" />
                      Add Class
                    </a>
                  </Link>
                </button>
                <button className="w-full btn rounded-lg text-pink-600 focus:text-white  bg-white normal-case font-VarelaRound text-base focus:bg-pink-600">
                  <Link className="">
                    <a className="flex items-center gap-x-2">All Classes</a>
                  </Link>
                </button>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          <li
            onClick={() => scrollToElement("Courses")}
            className="px-5 text-base cursor-pointer font-Montserrat font-semibold"
          >
            Classes
          </li>
        </>
      )}

      <li
        onClick={() => scrollToElement("Category")}
        className="px-5 font-semibold text-base cursor-pointer font-Montserrat "
      >
        Category
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar  h-20 mt-1">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            ></ul>
          </div>
          <h1 className="text-4xl ms-3 font-KaushanScript text-center text-black">
            <span>ArtoGram</span>
          </h1>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal uppercase  px-1">{NavOptions}</ul>
        </div>
        {user ? (
          <>
            <div className="rounded-full flex justify-end w-[250px] ">
              <div className="dropdown  dropdown-hover dropdown-bottom text-black">
                <button tabIndex={0} className=" m-1">
                  <img
                    className=" w-14 ring ring-red-500  rounded-full"
                    src={user?.img}
                  />
                </button>
                <ul
                  tabIndex={0}
                  className="hidden lg:block dropdown-content z-10 menu p-2 relative left-[-150px] shadow me-10 rounded-box w-[200px] bg-white ring-opacity-60 theme-text ring ring-pink-600"
                >
                  <button className="w-full btn rounded-lg text-pink-600 focus:text-white  bg-white normal-case font-VarelaRound text-base focus:bg-pink-600">
                    <Link className="">
                      <a>DashBoard</a>
                    </Link>
                  </button>
                  <button
                    onClick={handleLogOut}
                    className="w-full mt-1 btn rounded-lg text-pink-600 focus:text-white  bg-white normal-case font-VarelaRound text-base focus:bg-pink-600"
                  >
                    <Link className="">
                      <a>Logout</a>
                    </Link>
                  </button>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link to="/Login" className="navbar-end me-2">
              <a className="btn theme-text rounded-2xl px-6  theme-border">
                Login
              </a>
            </Link>
          </>
        )}
      </div>
      <div className="theme-color1 opacity-5 mt-1  mx-a h-[2px]"></div>
    </div>
  );
};

export default Nav;
