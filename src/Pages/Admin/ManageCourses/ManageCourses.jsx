import axios from "axios";
import { createRef, useEffect, useRef, useState } from "react";
import deletes from "../../../assets/icon/icons8-delete-96.png";
import success from "../../../assets/icon/icons8-verified-account-96.png";
import exclamation from "../../../assets/icon/icons8-exclamation-96.png";
import reload from "../../../assets/icon/icons8-reload-96.png";
import { MdOutlineCancel } from "react-icons/md";

import { useForm } from "react-hook-form";
import { Circles } from "react-loader-spinner";
import ScrolltoTop from "../../Shared/ScroolltoTop/Scrolltotop";
import { Helmet } from "react-helmet-async";
// import useAuth from "../../../Hooks/useAuth";
import "./manageCourse.css";
import Title from "../../Shared/title/title";
import { PiStickerBold } from "react-icons/pi";
import { IoReloadCircleOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
const customId = "custom-id-yes";
const ManageCourses = () => {
  const [users, setUsers] = useState([]);
  const [reloads, setReload] = useState(false);
  const [load, setLoad] = useState(null);
  //   const { user } = useAuth();
  useEffect(() => {
    setLoad(true);
    axios
      .get(`https://artogram-server.vercel.app/Allcourses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
        setLoad(false);
      });
  }, []);
  const reloading = () => {
    setReload(true);
    axios
      .get(`https://artogram-server.vercel.app/Allcourses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
        },
      })
      .then((res) => {
        setReload(false);

        setUsers(res.data);
      });
  };
  const refetch = () => {
    setLoad(true);
    axios
      .get(`https://artogram-server.vercel.app/Allcourses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
        setLoad(false);
      });
  };
  const approve = (id) => {
    fetch(`https://artogram-server.vercel.app/ApproveCourses/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.info("Course is approved", {
          toastId: customId,
        });
        refetch();
        refetch();
      });
  };
  const maPState = users.filter((x) => x.status === "approved");
  const Declined = users.filter((x) => x.status === "declined");
  console.log(maPState);
  const [declineText, setDeclineText] = useState(null);
  const textAreaRef = useRef(null);
  const handleDelete = async (id) => {
    const newData = { msg: declineText };
    fetch(`https://artogram-server.vercel.app/DeclineCourse/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.info("Course Declined With Feed Back!", {
          toastId: customId,
        });
        refetch();
        document.getElementById("close").click();
        document.getElementById("cleartext").value = "";
      });
  };

  return (
    <div>
      <Helmet>
        <title>ManageCourses | ARTOGRAM</title>
      </Helmet>
      <ScrolltoTop></ScrolltoTop>
      <ScrolltoTop></ScrolltoTop>
      {/* modal section why refusing */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_1" className="modal backdrop-blur">
        <div className="modal-box p-0 bg-transparent font-VarelaRound">
          <div className="bg-blue-300 border-slate-200 border-opacity-25 bg-opacity-20 dark:bg-[#121212] rounded-xl  p-2 text-sm">
            <h1 className="text-center my-3 dark:text-slate-200 text-xl font-bold col-span-6">
              Type Decline Reason
            </h1>
            <textarea
              onChange={() => {
                setDeclineText(textAreaRef.current.value);
                console.log(declineText);
              }}
              ref={textAreaRef}
              id="cleartext"
              placeholder="Your feedback..."
              className="bg-slate-100 bg-opacity-40 dark:bg-[#121212] text-slate-900 h-28 placeholder:text-slate-600 placeholder:opacity-50 border border-slate-200 w-full resize-none outline-none rounded-lg p-2 theme-text duration-300 focus:border-slate-600"
            ></textarea>{" "}
            <div className="w-full flex  gap-x-1">
              <form method="dialog">
                <button
                  id="close"
                  className="fill-slate-600 col-span-1 flex justify-center items-center rounded-lg  duration-300 bg-slate-100 hover:border-slate-600 focus:fill-blue-200 focus:bg-blue-400 border border-slate-200"
                >
                  <MdOutlineCancel className="text-4xl" />
                </button>
              </form>

              <button
                onClick={() => {
                  document.getElementById("deleteNow").click();
                }}
                className="bg-slate-100 stroke-slate-600 border border-slate-200 col-span-2 flex justify-center rounded-lg p-2 duration-300 dark:bg-[#121212] hover:border-slate-600 hover:text-white focus:stroke-blue-200 dark:focus:bg-blue-400"
              >
                <svg
                  className="dark:fill-white "
                  viewBox="0 0 24 24"
                  height="20px"
                  width="20px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="1.5"
                    d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z"
                  ></path>
                  <path
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="1.5"
                    d="M10.11 13.6501L13.69 10.0601"
                  ></path>
                </svg>
              </button>
            </div>
          </div>{" "}
        </div>
      </dialog>
      {load === true ? (
        <div className="w-full min-h-[80vh] flex justify-center items-center">
          <div className="w-full min-h-[100vh] flex justify-center items-center z-50 bg-transparent">
            <div className="loader32"></div>
          </div>
        </div>
      ) : (
        <>
          {reloads ? (
            <>
              <div className="w-full min-h-[80vh] flex justify-center items-center">
                <div className="w-full min-h-[100vh] flex justify-center items-center z-50 bg-transparent">
                  <div className="loader32"></div>
                </div>
              </div>
            </>
          ) : (
            <>
              {" "}
              <div className="mt-10">
                <Title>{"Manage Course"}</Title>
              </div>
              <div className="w-full lg:static fixed justify-end flex z-10">
                <button
                  onClick={reloading}
                  className="btn scale-90 lg:scale-100 btn-circle shadow-md bg-white dark:bg-[#121212] duration-300 theme-text dark:border-opacity-25 border-blue-300  lg:me-10 my-4"
                >
                  <IoReloadCircleOutline
                    className={`${reloads === true && "animate-spin"}`}
                  />
                </button>
              </div>
              <div className="min-h-[2px] max-w-6xl  mx-auto mt-5 ">
                <Tabs>
                  <TabList className="rounded-xl bg-opacity-20 bg-blue-300 p-1 mx-2 lg:w-[50%] sticky top-0 z-10 flex">
                    <Tab>All </Tab>
                    <Tab>Approved</Tab>
                    <Tab>Declined</Tab>
                  </TabList>

                  <TabPanel className="w-full ">
                    {" "}
                    <div className="grid lg:grid-cols-2">
                      {users.map((x) => (
                        <>
                          <div className="my-3 w-[70%] mx-auto rounded-3xl py-2 lg:p-0 lg:w-[90%]  flex-col bg-white border dark:border-none border-blue-200 dark:bg-[#121212] theme-text justify-center lg:justify-start lg:flex-row flex items-center gap-x-2  p-2">
                            <div className="flex lg:flex-row flex-col items-center w-full  gap-y-2 gap-x-2  lg:w-[400px] ">
                              <div className="w-full lg:w-24 h-24">
                                <img
                                  src={x.courseImg}
                                  className="w-full h-full object-cover rounded-2xl"
                                  alt=""
                                />
                              </div>
                              <div className="flex items-center w-full">
                                <div className="w-[200px] overflow-clip font-bold font-Montserrat tracking-wide theme-text lg:text-left ">
                                  {x.name && (
                                    <h1 className="flex items-center justify-start">
                                      <div>
                                        <PiStickerBold className="text-xl" />
                                      </div>{" "}
                                      {x.name}
                                    </h1>
                                  )}
                                  <h1 className="  flex">
                                    {x.email && (
                                      <>
                                        <div className="text">
                                          <PiStickerBold className="text-xl" />
                                        </div>{" "}
                                        <div className="overflow-scroll w-[250px]">
                                          {x.email}
                                        </div>
                                      </>
                                    )}
                                  </h1>
                                  <h1 className="flex">
                                    <div className="text-xs">
                                      <PiStickerBold className="text-xl" />
                                    </div>
                                    Availableseats : {x.seats}
                                  </h1>
                                  <h1 className="flex">
                                    <div className="text-xs">
                                      <PiStickerBold className="text-xl" />
                                    </div>
                                    bookedSets : {x.bookedSets}
                                  </h1>
                                </div>
                              </div>
                            </div>
                            <div className="flex w-[180px] lg:w-[150px]  gap-y-1 flex-col lg:me-5">
                              {x.status === `declined` ? (
                                <>
                                  <button className="py-3 font-Montserrat border dark:border-blue-300 dark:border-opacity-30 bg-red-300 roundedsm scale-90 text-white">
                                    Declined
                                  </button>
                                </>
                              ) : (
                                <>
                                  {x.status === "pending" ? (
                                    <>
                                      <button className="py-3 font-Montserrat border dark:border-blue-300 dark:border-opacity-30 dark:bg-[#121212] bg-blue-300 roundedsm scale-90 text-white">
                                        Pending
                                      </button>
                                      <button
                                        onClick={() => {
                                          approve(x._id);
                                        }}
                                        className="btn font-Montserrat bg-green-600 rounded-xl scale-90 text-white"
                                      >
                                        Approve
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <button
                                        disabled
                                        className="py-3 font-Montserrat border border-black border-opacity-30 dark:border-blue-300 dark:border-opacity-30 dark:bg-green-300 theme-text bg-green-300 roundedsm scale-90 dark:text-black"
                                      >
                                        Approved
                                      </button>
                                    </>
                                  )}
                                </>
                              )}
                            </div>
                            <div className="">
                              {x.status === `declined` ? (
                                <>
                                  <button className="btn bg-transparent border-none p-0 hidden lg:block m-0 text-transparent text-red-500">
                                    <MdOutlineCancel />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => {
                                      document
                                        .getElementById("my_modal_1")
                                        .showModal();
                                    }}
                                    className="btn bg-transparent border-none relative lg:right-5 p-0 m-0 text-red-500"
                                  >
                                    <MdOutlineCancel />
                                  </button>
                                  <button
                                    id="deleteNow"
                                    onClick={() => handleDelete(x._id)}
                                  ></button>
                                </>
                              )}
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </TabPanel>
                  <TabPanel>
                    {" "}
                    <div className="grid lg:grid-cols-2">
                      {maPState.map((x) => (
                        <>
                          <div className="my-3 w-[70%] mx-auto rounded-3xl py-2 lg:p-0 lg:w-[90%]  flex-col bg-white border dark:border-none border-blue-200 dark:bg-[#121212] theme-text justify-center lg:justify-start lg:flex-row flex items-center gap-x-2  p-2">
                            <div className="flex lg:flex-row flex-col items-center w-full  gap-y-2 gap-x-2  lg:w-[400px] ">
                              <div className="w-full lg:w-24 h-24">
                                <img
                                  src={x.courseImg}
                                  className="w-full h-full object-cover rounded-2xl"
                                  alt=""
                                />
                              </div>
                              <div className="flex items-center w-full">
                                <div className="w-[200px] overflow-clip font-bold font-Montserrat tracking-wide theme-text lg:text-left ">
                                  {x.name && (
                                    <h1 className="flex items-center justify-start">
                                      <div>
                                        <PiStickerBold className="text-xl" />
                                      </div>{" "}
                                      {x.name}
                                    </h1>
                                  )}
                                  <h1 className="  flex">
                                    {x.email && (
                                      <>
                                        <div className="text">
                                          <PiStickerBold className="text-xl" />
                                        </div>{" "}
                                        <div className="overflow-scroll w-[250px]">
                                          {x.email}
                                        </div>
                                      </>
                                    )}
                                  </h1>
                                  <h1 className="flex">
                                    <div className="text-xs">
                                      <PiStickerBold className="text-xl" />
                                    </div>
                                    Availableseats : {x.seats}
                                  </h1>
                                  <h1 className="flex">
                                    <div className="text-xs">
                                      <PiStickerBold className="text-xl" />
                                    </div>
                                    bookedSets : {x.bookedSets}
                                  </h1>
                                </div>
                              </div>
                            </div>
                            <div className="flex w-[180px] lg:w-[150px] gap-y-1 flex-col lg:me-5">
                              {x.status === `declined` ? (
                                <>
                                  <button className="py-3 font-Montserrat border dark:border-blue-300 dark:border-opacity-30 bg-red-300 roundedsm scale-90 text-white">
                                    Declined
                                  </button>
                                </>
                              ) : (
                                <>
                                  {x.status === "pending" ? (
                                    <>
                                      <button className="py-3 font-Montserrat border dark:border-blue-300 dark:border-opacity-30 dark:bg-[#121212] bg-blue-300 roundedsm scale-90 text-white">
                                        Pending
                                      </button>
                                      <button
                                        onClick={() => {
                                          approve(x._id);
                                        }}
                                        className="btn font-Montserrat bg-green-600 rounded-xl scale-90 text-white"
                                      >
                                        Approve
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <button
                                        disabled
                                        className="py-3 font-Montserrat border border-black border-opacity-30 dark:border-blue-300 dark:border-opacity-30 dark:bg-green-300 theme-text bg-green-300 roundedsm scale-90 dark:text-black"
                                      >
                                        Approved
                                      </button>
                                    </>
                                  )}
                                </>
                              )}
                            </div>
                            <div className="">
                              {x.status === `declined` ? (
                                <>
                                  <button className="btn bg-transparent border-none p-0 m-0 relative lg:right-5 text-transparent text-red-500">
                                    <MdOutlineCancel />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => {
                                      document
                                        .getElementById("my_modal_1")
                                        .showModal();
                                    }}
                                    className="btn bg-transparent border-none p-0 m-0 text-red-500"
                                  >
                                    <MdOutlineCancel />
                                  </button>
                                  <button
                                    id="deleteNow"
                                    onClick={() => handleDelete(x._id)}
                                  ></button>
                                </>
                              )}
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </TabPanel>
                  <TabPanel>
                    {" "}
                    <div className="grid lg:grid-cols-2">
                      {Declined.map((x) => (
                        <>
                          <div className="my-3 w-[70%] mx-auto rounded-3xl py-2 lg:p-0 lg:w-[90%]  flex-col bg-white border dark:border-none border-blue-200 dark:bg-[#121212] theme-text justify-center lg:justify-start lg:flex-row flex items-center gap-x-2  p-2">
                            <div className="flex lg:flex-row flex-col items-center w-full  gap-y-2 gap-x-2 h-[150px] lg:h-full lg:w-[400px] ">
                              <div className="w-full lg:w-24 h-24">
                                <img
                                  src={x.courseImg}
                                  className="w-full h-full object-cover rounded-2xl"
                                  alt=""
                                />
                              </div>
                              <div className="flex items-center w-full">
                                <div className="w-[200px] overflow-clip font-bold font-Montserrat tracking-wide theme-text lg:text-left ">
                                  {x.name && (
                                    <h1 className="flex items-center justify-start">
                                      <div>
                                        <PiStickerBold className="text-xl" />
                                      </div>{" "}
                                      {x.name}
                                    </h1>
                                  )}
                                  <h1 className="  flex">
                                    {x.email && (
                                      <>
                                        <div className="text">
                                          <PiStickerBold className="text-xl" />
                                        </div>{" "}
                                        <div className="overflow-scroll w-[250px]">
                                          {x.email}
                                        </div>
                                      </>
                                    )}
                                  </h1>
                                  <h1 className="flex">
                                    <div className="text-xs">
                                      <PiStickerBold className="text-xl" />
                                    </div>
                                    Availableseats : {x.seats}
                                  </h1>
                                  <h1 className="flex">
                                    <div className="text-xs">
                                      <PiStickerBold className="text-xl" />
                                    </div>
                                    bookedSets : {x.bookedSets}
                                  </h1>
                                </div>
                              </div>
                            </div>
                            <div className="flex w-[180px] lg:w-[150px]  gap-y-1 flex-col lg:me-5">
                              {x.status === `declined` ? (
                                <>
                                  <button className="py-3 font-Montserrat border dark:border-blue-300 dark:border-opacity-30  bg-red-300  roundedsm scale-90 text-white">
                                    Declined
                                  </button>
                                </>
                              ) : (
                                <>
                                  {x.status === "pending" ? (
                                    <>
                                      <button className="py-3 font-Montserrat border dark:border-blue-300 dark:border-opacity-30 dark:bg-[#121212] bg-blue-300 roundedsm scale-90 text-white">
                                        Pending
                                      </button>
                                      <button
                                        onClick={() => {
                                          approve(x._id);
                                        }}
                                        className="btn font-Montserrat bg-green-600 rounded-xl scale-90 text-white"
                                      >
                                        Approve
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <button
                                        disabled
                                        className="py-3 font-Montserrat border border-black border-opacity-30 dark:border-blue-300 dark:border-opacity-30 dark:bg-green-300 theme-text bg-green-300 roundedsm scale-90 dark:text-black"
                                      >
                                        Approved
                                      </button>
                                    </>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </TabPanel>
                </Tabs>
              </div>
            </>
          )}
        </>
      )}

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

export default ManageCourses;
