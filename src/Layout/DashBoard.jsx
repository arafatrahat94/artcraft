import React from "react";
import Nav from "../Pages/Shared/Nav/Nav";
import { Link } from "react-scroll";

import useAuth from "../Hooks/useAuth";
import { NavLink, Outlet } from "react-router-dom";
import Activelink2 from "../Pages/Shared/Activelink/Activelink2";
import useAdmin from "../Hooks/useAdmin";
import useTeacher from "../Hooks/useTeacher";
import ScrolltoTop from "../Pages/Shared/ScroolltoTop/Scrolltotop";

const DashBoard = () => {
  const { user, logOUT } = useAuth();

  const handleLogOut = () => {
    logOUT().then(() => {});
  };
  const isAdmin = useAdmin();

  const isTeacher = useTeacher();
  return (
    <div>
      <Nav></Nav>
      <ScrolltoTop></ScrolltoTop>
      <ScrolltoTop></ScrolltoTop>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col ">
          {/* Page content here */}
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu  w-[300px] min-h-[90vh]  text-base-content bg-white">
            {/* Sidebar content here */}
            <div
              className="h-10 flex flex-col
justify-center mb-2 items-center "
            >
              <h1 className="text-center flex items-center  text-3xl font-KaushanScript text-pink-600">
                DashBoard
              </h1>
            </div>

            <div className="px-2 mt-2">
              {isTeacher ? (
                <>
                  <Activelink2 to="/AddClasses">Add Course</Activelink2>

                  <Activelink2 to="/DashBoard/ManageCourse">
                    Manage Course
                  </Activelink2>
                </>
              ) : (
                <></>
              )}
              {isAdmin ? (
                <>
                  <Activelink2 to="/DashBoard/AllUsers">All Users</Activelink2>
                  <Activelink2 to="/DashBoard/ManageCourses">
                    Manage Courses
                  </Activelink2>
                </>
              ) : (
                <></>
              )}
              {user.profiletype === "student" ? (
                <>
                  <Activelink2 to="/DashBoard/CourseCart">
                    Course Cart
                  </Activelink2>
                  <Activelink2 to="/DashBoard/Favorites">Favorites</Activelink2>
                  <Activelink2 to="/DashBoard/EnrolledCourse">
                    Enrolled Courses
                  </Activelink2>
                  <Activelink2 to="/DashBoard/Transactions">
                    Transactions
                  </Activelink2>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="h-[2px] bg-pink-100"></div>
            <div className="lg:hidden">
              <Activelink2
                to="/"
                className="px-5  text-base cursor-pointer font-Montserrat  font-semibold theme-text"
              >
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>{" "}
                Home
              </Activelink2>
              <Activelink2
                to="/AllTeachers"
                className="px-5 text-base cursor-pointer font-Montserrat font-semibold"
              >
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>{" "}
                Teachers
              </Activelink2>
            </div>

            <div className="flex items-end justify-end flex-grow flex-col">
              <button
                onClick={handleLogOut}
                className="btn mx-auto text-pink-600 font-Montserrat w-10/12 border-pink-600 border  rounded-3xl"
              >
                SignOut
              </button>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
