import { useEffect, useState } from "react";

import { animateScroll as scroll, scroller } from "react-scroll";
import useAuth from "../../../Hooks/useAuth";
import icon from "../../../assets/icon/icons8-exclamation-96.png";
import { Link, useLocation } from "react-router-dom";
import Activelink from "../Activelink/Activelink";
import SideNavOptions from "../SideNavOptions/SideNavOptions";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
const Nav = () => {
  const { user, logOUT } = useAuth();
  console.log(user?.img);
  const location = useLocation();

  // scroller

  const scrollToElement = (element) => {
    scroller.scrollTo(element, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  const [newLocation, setNewLocation] = useState("");

  useEffect(() => {
    if (user?.profiletype === "student") {
      setNewLocation("/DashBoard/CourseCart");
    } else if (user?.profiletype === "teacher") {
      setNewLocation("/DashBoard/ManageCourse");
    } else if (user?.profiletype === "admin") {
      setNewLocation("/DashBoard/ManageCourses");
    }
  }, [location, user]);
  // mui nav

  const handleLogOut = () => {
    Swal.fire({
      title: "Sign Out Now?",

      icon: `warning`,
      iconHtml: `<img src=${icon} alt="" />`,
      allowOutsideClick: false,
      showCancelButton: true,
      customClass: {
        confirmButton: "sweet_confirmbuttonImportant",
        cancelButton: "cancelButton",
        isConfirmed: "isConfirmed",
      },
      background: "white",
      backdrop: "blur",

      width: "300px",
      color: "#07332F",
      confirmButtonText: "Yes,Sign Out",
    }).then((result) => {
      if (result.isConfirmed) {
        logOUT()
          .then(() => {
            toast.fire({
              icon: "success",
              position: "top",

              title: "User Signed Out",
            });
          })
          .catch(() => {});
      }
    });
  };
  //navoptions

  const NavOptions = (
    <>
      <Activelink
        to="/"
        className="px-5 text-base cursor-pointer font-Montserrat  font-semibold theme-text"
      >
        Home
      </Activelink>
      {location.pathname === "/" ? (
        <>
          <Link
            onClick={() => scrollToElement("instructors")}
            className="px-5 text-base cursor-pointer font-Montserrat font-semibold"
          >
            Teachers
          </Link>
        </>
      ) : (
        <>
          <Activelink
            to="/AllTeachers"
            className="px-5 text-base cursor-pointer font-Montserrat font-semibold"
          >
            Teachers
          </Activelink>
        </>
      )}
      <Link
        to="/AllCourses"
        className="px-5 text-base cursor-pointer font-Montserrat font-semibold"
      >
        Courses
      </Link>

      <Activelink>
        <Link
          onClick={() => {
            setTimeout(() => {
              scrollToElement("Category");
            }, 1000);
          }}
          className=" font-semibold text-base cursor-pointer font-Montserrat "
        >
          Category
        </Link>
      </Activelink>
      {user ? (
        <>
          <Activelink
            to={newLocation}
            className="px-5 text-base cursor-pointer font-Montserrat font-semibold"
          >
            DashBoard
          </Activelink>
        </>
      ) : (
        <></>
      )}
    </>
  );
  return (
    <div className=" w-full ">
      <div className="navbar mx-auto lg:w-11/12 h-20 mt-1">
        <div className="navbar-center">
          <div className="dropdown w-full">
            <div className="drawer-content lg:hidden">
              {/* Page content here */}
              <label
                htmlFor="my-drawer"
                className="btn bg-white border-none drawer-button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#D81B60"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
            </div>
          </div>
          <h1 className="text-4xl ms-3 font-KaushanScript  lg:flex hidden text-center text-pink-600">
            <span>ArtoGram</span>
          </h1>
          <h1 className="text-3xl ms-3 font-KaushanScript lg:hidden text-center text-pink-600">
            {location.pathname === "/" ? (
              <>
                <span>ArtoGram</span>
              </>
            ) : (
              <>
                <span>{location.pathname.split("/DashBoard/")}</span>
              </>
            )}
          </h1>
        </div>
        <div className="navbar-center justify-center w-[700px] hidden lg:flex">
          <ul className="menu menu-horizontal uppercase  px-1">{NavOptions}</ul>
        </div>
        {user ? (
          <>
            <div className="rounded-full flex justify-end w-[200px] ">
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
                    <Link to="/DashBoard" className="">
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
      <div className="drawer z-20">
        <input id="my-drawer" type="checkbox" className="drawer-toggle " />

        <div className="drawer-side ">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <SideNavOptions
            newLocation={newLocation}
            scrollToElement={scrollToElement}
            handleLogOut={handleLogOut}
            user={user}
          ></SideNavOptions>
        </div>
      </div>
    </div>
  );
};

export default Nav;
