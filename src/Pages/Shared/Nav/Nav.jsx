import React from "react";

import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";

const Nav = () => {
  // scroller

  const scrollToElement = (element) => {
    scroller.scrollTo(element, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  //navoptions
  const NavOptions = (
    <>
      <li className="px-5 text-base cursor-pointer font-Montserrat  font-semibold theme-text">
        Home
      </li>
      <li
        onClick={() => scrollToElement("instructors")}
        className="px-5 text-base cursor-pointer font-Montserrat font-semibold"
      >
        Instructors
      </li>
      <li
        onClick={() => scrollToElement("Courses")}
        className="px-5 text-base cursor-pointer font-Montserrat font-semibold"
      >
        Classes
      </li>
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
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <h1 className="text-4xl ms-3 font-KaushanScript text-center text-black">
            <span>ArtoGram</span>
          </h1>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal uppercase  px-1">{NavOptions}</ul>
        </div>
        <div className="navbar-end me-2">
          <a className="btn theme-text rounded-2xl px-6  theme-border">Login</a>
        </div>
      </div>
      <div className="theme-color1 opacity-5 mt-1  mx-a h-[2px]"></div>
    </div>
  );
};

export default Nav;
