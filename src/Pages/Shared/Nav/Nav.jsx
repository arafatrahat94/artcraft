import { useEffect, useState } from "react";

import { animateScroll as scroll, scroller } from "react-scroll";
import useAuth from "../../../Hooks/useAuth";
import icon from "../../../assets/icon/icons8-exclamation-96.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Activelink from "../Activelink/Activelink";
import lightlogo from "../../../assets/lightlogo.png";
import darklogo from "../../../assets/darklogo.png";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
const customId = "custom-id-yes";

import "./Nav.css";
import { Transition } from "@headlessui/react";
import usePurChase from "../../../Hooks/usePurChase";
import OutsideClickHandler from "react-outside-click-handler";
import useAdmin from "../../../Hooks/useAdmin";
import useTeacher from "../../../Hooks/useTeacher";
import { IoCloseCircleOutline } from "react-icons/io5";
const Nav = () => {
  const { user, logOUT, setThemeN, themeN } = useAuth();

  const location = useLocation();

  const isAdmin = useAdmin();
  const navigate = useNavigate();
  // mui nav
  const isPurchase = usePurChase();
  const handleLogOut = () => {
    logOUT()
      .then(() => {
        document.getElementById("closeButton").click();
        if (location.pathname !== "/") {
          navigate("/", { replace: true });
        }
        toast.info("user logged out", {
          toastId: customId,
        });
      })
      .catch(() => {});
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");

    if (savedMode !== null) {
      setIsDarkMode(JSON.parse(savedMode));
      setThemeN(JSON.parse(savedMode));
      document.documentElement.classList.toggle("dark", JSON.parse(savedMode));
    } else {
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(prefersDarkMode);
      setThemeN(prefersDarkMode);
      localStorage.setItem("darkMode", JSON.stringify(prefersDarkMode));
      document.documentElement.classList.toggle("dark", prefersDarkMode);
    }
  }, []);

  const toggleMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    setThemeN(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
    document.documentElement.classList.toggle("dark", newMode);
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative min-h-[70px]">
      {" "}
      <OutsideClickHandler
        onOutsideClick={() => {
          if (isOpen === true) {
            setIsOpen(false);
          }
        }}
      >
        <nav
          className={`${
            isOpen
              ? " bg-white dark:bg-[#121212] dark:bg-opacity-20 rounded-b-3xl pb-4  bg-opacity-20 backdrop-blur-md duration-300 top-0 fixed transform "
              : "absolute"
          }   z-50 w-full  `}
        >
          {" "}
          {/* Put this part before </body> tag */}
          <dialog id="my_modal_9" className="modal backdrop-blur-sm scale-125 ">
            <div className="modal-box  w-[300px] rounded-[3rem] bg-white bg-opacity-60  dark:bg-[#121212] p-0">
              <div className="cardu  font-VarelaRound">
                <div className="cardu-content">
                  <div className="cardu-top">
                    <span className="cardu-title ms-6 relative top-3 theme-text dark:text-white text-xs">
                      {user?.name}
                    </span>
                    <p className="me-6 relative top-2 theme-text tracking-wider dark:text-white font-sans uppercase">
                      {user?.profiletype}
                    </p>
                  </div>
                  <div className="cardu-bottom">
                    <p
                      onClick={handleLogOut}
                      className="btn theme-text btn-link ms-2 dark:text-white bg-transparent border-none"
                    >
                      Signout?
                    </p>
                    <div className="w-[100px]  flex h-[45px] ">
                      <svg
                        viewBox="0 -960 960 960"
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-[#0b2447] dark:fill-white"
                      >
                        <path d="M226-160q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19ZM226-414q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19ZM226-668q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <label className="switcho bottom-20 -right-52 scale-75 relative">
                  <span className="suno">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <g fill="#ffd43b">
                        <circle r={5} cy={12} cx={12} />
                        <path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z" />
                      </g>
                    </svg>
                  </span>
                  <span className="moono">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
                    </svg>
                  </span>
                  <input
                    onClick={toggleMode}
                    checked={themeN == true ? true : false}
                    type="checkbox"
                    className="inputo "
                  />
                  <span className="slidero" />
                </label>
                <div className="cardu-image">
                  {" "}
                  <img
                    loading="lazy"
                    className=" w-14   rounded-2xl"
                    src={user?.img}
                  />
                </div>
              </div>{" "}
              <form
                method="dialog"
                className="absolute left-6 bottom-1 px-2 text-xl theme-text font-VarelaRound"
              >
                {/* if there is a button in form, it will close the modal */}
                <button id="closeButton" className="uppercase text-3xl">
                  <IoCloseCircleOutline />
                </button>
              </form>
              {/* <div className="modal-action"></div> */}
            </div>
          </dialog>
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <div className="cardu scale-110 flex font-VarelaRound">
                <div className="cardu-content">
                  <div className="cardu-top">
                    <span className="cardu-title ms-6 relative top-3 theme-text text-xs">
                      {user?.name}
                    </span>
                    <p className="me-6 relative top-2 theme-text font-RussoOne uppercase">
                      {user?.profiletype}
                    </p>
                  </div>
                  <div className="cardu-bottom">
                    <p
                      onClick={handleLogOut}
                      className="btn theme-text btn-link ms-2 bg-transparent border-none"
                    >
                      Signout?
                    </p>
                    <svg
                      width="22"
                      viewBox="0 -960 960 960"
                      height="22"
                      xmlns="http://www.w3.org/2000/svg"
                      className="scale-75"
                      fill="#0b2447"
                    >
                      <path d="M226-160q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19ZM226-414q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19ZM226-668q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Z"></path>
                    </svg>
                  </div>
                </div>

                <div className="cardu-image">
                  {" "}
                  <img
                    loading="lazy"
                    className=" w-14   rounded-2xl"
                    src={user?.img}
                  />
                </div>
              </div>
            </div>
          </dialog>
          <div className={`mx-auto px-4   sm:px-6 lg:px-8`}>
            <div className="flex items-center  h-20 ">
              <div className="flex  justify-between  w-full">
                <div className="flex  items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="w-32 hidden dark:block"
                      src={darklogo}
                      alt=""
                    />
                    <img className="w-32  dark:hidden" src={lightlogo} alt="" />
                  </div>
                  <div className="hidden md:block">
                    <div className="mx-10  flex  space-x-10 justify-center  items-center">
                      <Activelink to="/">Home</Activelink>
                      <Activelink to="/AllTeachers">Teachers</Activelink>
                      <Activelink to="/AllCourses">Courses</Activelink>{" "}
                      {isPurchase === true && (
                        <Activelink to="/ShareArt">ShareArt</Activelink>
                      )}
                      {isAdmin === true && (
                        <Activelink to="/ShareArt">ShareArt</Activelink>
                      )}
                      {user ? (
                        <>
                          <Activelink
                            to="/DashBoard"
                            className="px-5 text-base cursor-pointer font-Montserrat font-semibold"
                          >
                            DashBoard
                          </Activelink>
                        </>
                      ) : (
                        <></>
                      )}
                      <Activelink to="/Gallery">Gallery</Activelink>{" "}
                      <label className="switcho  scale-75 relative">
                        <span className="suno">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <g fill="#ffd43b">
                              <circle r={5} cy={12} cx={12} />
                              <path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z" />
                            </g>
                          </svg>
                        </span>
                        <span className="moono">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                          >
                            <path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
                          </svg>
                        </span>
                        <input
                          onClick={toggleMode}
                          checked={themeN == true ? true : false}
                          type="checkbox"
                          className="inputo "
                        />
                        <span className="slidero" />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="hidden flex-grow    items-end md:block">
                  {user ? (
                    <>
                      <div className="rounded-full flex justify-end  ">
                        <div
                          onClick={() =>
                            document.getElementById("my_modal_9").showModal()
                          }
                          data-tip={`${user?.name}`}
                          className="dropdown  dropdown-hover dropdown-bottom tooltip-left tooltip text-black"
                        >
                          <button tabIndex={0} className=" m-1">
                            <img
                              loading="lazy"
                              className=" w-14 h-full object-center object-cover ring ring-blue-500  rounded-full"
                              src={user?.img}
                            />
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link className="  flex justify-end items-center h-full">
                        <Link to="/Login" className="cursor-pointer">
                          <svg
                            fill="#2d8cf0"
                            viewBox="0 0 512 512"
                            style={{ width: "30px" }}
                          >
                            <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"></path>
                          </svg>
                        </Link>
                      </Link>
                    </>
                  )}
                </div>
              </div>
              <div className="-mr-2  w-full justify-end flex md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className=" inline-flex items-center justify-center p-2 rounded-md  focus:outline-none focus:ring-offset-2 "
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {!isOpen ? (
                    <img
                      loading="lazy"
                      className=" justify-end relative items-end -mt-1 left-1 dark:bg-transparent  rounded-lg "
                      width="36"
                      height="36"
                      src="https://i.ibb.co/pJ03KBL/icons8-circled-menu-96-1.png"
                      alt="menu-2"
                    />
                  ) : (
                    <img
                      loading="lazy"
                      className="left-1 justify-end relative items-end -mt-1 "
                      width="34"
                      height="34"
                      src="https://i.ibb.co/8P3kvfB/icons8-cross-96-1.png"
                      alt="arrow-pointing-left"
                    />
                  )}
                </button>
              </div>
            </div>
            <Transition
              show={isOpen}
              onChange={() => console.log("hi")}
              enter="transition ease-out duration-100 transform"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-300 transform"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
              className="transform  duration-300 "
            >
              {(ref) => (
                <div className="md:hidden    w-full" id="mobile-menu">
                  <div
                    ref={ref}
                    className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex-col flex  items-center gap-y-1"
                  >
                    <Activelink to="/">Home</Activelink>
                    <Activelink to="/AllTeachers">Teachers</Activelink>
                    <Activelink to="/AllCourses">Courses</Activelink>
                    {isAdmin === true && (
                      <Activelink to="/ShareArt">ShareArt</Activelink>
                    )}
                    {user ? (
                      <>
                        <Activelink
                          to="/DashBoard"
                          className="px-5 text-base cursor-pointer font-Montserrat font-semibold"
                        >
                          DashBoard
                        </Activelink>
                      </>
                    ) : (
                      <></>
                    )}
                    <Activelink to="/Gallery">Gallery</Activelink>
                    {user ? (
                      <></>
                    ) : (
                      <>
                        <label className="switcho scale-75 relative">
                          <span className="suno">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <g fill="#ffd43b">
                                <circle r={5} cy={12} cx={12} />
                                <path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z" />
                              </g>
                            </svg>
                          </span>
                          <span className="moono">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 384 512"
                            >
                              <path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
                            </svg>
                          </span>
                          <input
                            onClick={toggleMode}
                            checked={themeN == true ? true : false}
                            type="checkbox"
                            className="inputo "
                          />
                          <span className="slidero" />
                        </label>
                      </>
                    )}
                    {isPurchase === true && (
                      <Activelink to="/ShareArt">Share Art</Activelink>
                    )}{" "}
                    {user ? (
                      <>
                        <div>
                          <div className="cardu  font-VarelaRound">
                            <div className="cardu-content">
                              <div className="cardu-top">
                                <span className="cardu-title ms-6 relative top-3 theme-text dark:text-white text-xs">
                                  {user.name}
                                </span>
                                <p className="me-6 relative top-2 theme-text tracking-wider dark:text-white font-sans uppercase">
                                  {user.profiletype}
                                </p>
                              </div>
                              <div className="cardu-bottom">
                                <p
                                  onClick={handleLogOut}
                                  className="btn theme-text btn-link ms-2 dark:text-white bg-transparent border-none"
                                >
                                  Signout?
                                </p>
                                <div className="w-[100px]  flex h-[45px] ">
                                  <svg
                                    viewBox="0 -960 960 960"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="fill-[#0b2447] dark:fill-white"
                                  >
                                    <path d="M226-160q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19ZM226-414q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19ZM226-668q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Z"></path>
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <label className="switcho bottom-20 -right-52 scale-75 relative">
                              <span className="suno">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <g fill="#ffd43b">
                                    <circle r={5} cy={12} cx={12} />
                                    <path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z" />
                                  </g>
                                </svg>
                              </span>
                              <span className="moono">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 384 512"
                                >
                                  <path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
                                </svg>
                              </span>
                              <input
                                onClick={toggleMode}
                                checked={themeN == true ? true : false}
                                type="checkbox"
                                className="inputo "
                              />
                              <span className="slidero" />
                            </label>
                            <div className="cardu-image">
                              {" "}
                              <img
                                loading="lazy"
                                className=" w-14 object-cover  rounded-2xl"
                                src={user?.img}
                              />{" "}
                            </div>
                          </div>
                        </div>
                        <div className="rounded-full flex justify-end  ">
                          <div className="dropdown  dropdown-hover dropdown-bottom text-black">
                            <button
                              tabIndex={0}
                              className=" flex items-center font-RussoOne text-[#0b2447] py-1 rounded-xl  gap-x-2"
                            >
                              {/* {user.name} */}
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
                                  <a>SignOut</a>
                                </Link>
                              </button>
                            </ul>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <Link to="/Login" className="  flex justify-end w-full">
                          <button className="flex items-center justify-center gap-x-1 ">
                            <svg
                              fill="#2d8cf0"
                              viewBox="0 0 512 512"
                              style={{ width: "30px" }}
                            >
                              <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"></path>
                            </svg>
                          </button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </Transition>
          </div>
        </nav>
      </OutsideClickHandler>{" "}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Nav;
