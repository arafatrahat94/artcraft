import React from "react";
import { Link } from "react-router-dom";
import Activelink from "../Activelink/Activelink";
import { NavLink, Navigate, useLocation } from "react-router-dom";
import Activelink2 from "../Activelink/Activelink2";

import useTeacher from "../../../Hooks/useTeacher";
import useAdmin from "../../../Hooks/useAdmin";

const SideNavOptions = ({
  newLocation,
  handleLogOut,
  user,
  scrollToElement,
}) => {
  console.log(newLocation);
  const location = useLocation();
  const isTeacher = useTeacher();
  const isAdmin = useAdmin();
  return (
    <div>
      <ul className="menu  w-[260px] min-h-screen  text-base-content bg-white">
        {/* Sidebar content here */}
        <div
          className="h-10 flex flex-col
justify-center mb-2 items-center "
        >
          <h1 className="text-center flex items-center  text-3xl font-KaushanScript text-pink-600">
            ArtoGram
          </h1>
        </div>

        {location.pathname === "/" ||
        location.pathname === "/AllTeachers" ||
        location.pathname === "/AllCourses" ||
        location.pathname === "/Category/Acrylic" ||
        location.pathname === "/Category/Water" ||
        location.pathname === "/Category/3D" ? (
          <>
            <div className="">
              <Activelink
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
              </Activelink>
              <Activelink
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
              </Activelink>
            </div>
            <div className="mb-2 border bg-white rounded-lg">
              <Link className="flex gap-x-2 font-Montserrat py-2 px-2 bg-pink-100 text-pink-600 font-medium">
                {" "}
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
                </svg>
                Course Category :
              </Link>

              <div className="px-2 mt-2">
                <Activelink to={`/Category/${"Water"}`}>
                  Water Painting
                </Activelink>
                <Activelink to={`/Category/${"Acrylic"}`}>
                  Acrylic Painting
                </Activelink>
                <Activelink to={`/Category/${"3D"}`}>3d Painting</Activelink>
              </div>
            </div>

            <div className="flex items-end justify-end flex-grow flex-col">
              {user ? (
                <>
                  <Link
                    to={newLocation}
                    className="btn mx-auto text-pink-600 my-1 font-Montserrat w-10/12 border-pink-600 border  rounded-3xl"
                  >
                    DashBoard
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="btn mx-auto text-pink-600 font-Montserrat w-10/12 border-pink-600 border  rounded-3xl"
                  >
                    SignOut
                  </button>
                </>
              ) : (
                <NavLink
                  to="/Login"
                  className="btn mx-auto text-pink-600 font-Montserrat w-10/12 border-pink-600 border  rounded-3xl"
                >
                  SignIn
                </NavLink>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="px-2 mt-2">
              {isTeacher ? (
                <>
                  <div className=" border bg-white rounded-lg">
                    <Link className="flex gap-x-2 font-Montserrat py-2 px-2 bg-pink-100 text-pink-600 font-medium">
                      {" "}
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
                      </svg>
                      Teacher Action :
                    </Link>

                    <div className="px-2 mt-2">
                      <Activelink to="/AddClasses">Add Course</Activelink>

                      <Activelink to="/DashBoard/ManageCourse">
                        Manage Course
                      </Activelink>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
              {isAdmin ? (
                <>
                  <div className=" border bg-white rounded-lg">
                    <Link className="flex gap-x-2 font-Montserrat py-2 px-2 bg-pink-100 text-pink-600 font-medium">
                      {" "}
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
                      </svg>
                      Admin Action :
                    </Link>

                    <div className="px-2 mt-2">
                      <Activelink to="/DashBoard/AllUsers">
                        All Users
                      </Activelink>
                      <Activelink to="/DashBoard/ManageCourses">
                        Manage Courses
                      </Activelink>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
              {user?.profiletype === "student" ? (
                <>
                  <Activelink to="/DashBoard/CourseCart">
                    Course Cart
                  </Activelink>
                  <Activelink to="/DashBoard/Favorites">Favorites</Activelink>
                  <Activelink to="/DashBoard/EnrolledCourse">
                    Enrolled Courses
                  </Activelink>{" "}
                  <Activelink to="/DashBoard/Transactions">
                    Transactions
                  </Activelink>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="h-[2px] my-5 bg-pink-100"></div>
            <div className="lg:hidden">
              <Link
                to="/"
                className="px-5 flex gap-x-1 text-base cursor-pointer font-Montserrat  font-semibold theme-text"
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
              </Link>
            </div>

            <div className="flex items-end justify-end flex-grow flex-col">
              <button
                onClick={handleLogOut}
                className="btn mx-auto text-pink-600 font-Montserrat w-10/12 border-pink-600 border  rounded-3xl"
              >
                SignOut
              </button>
            </div>
          </>
        )}
      </ul>
    </div>
  );
};

export default SideNavOptions;
