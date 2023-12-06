import axios from "axios";
import { createRef, useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import deletes from "../../assets/icon/icons8-info-96.png";
import delete2 from "../../assets/icon/icons8-delete-96.png";
import success from "../../assets/icon/icons8-reject-96.png";
import "./Decline.css";
import Swal from "sweetalert2";
import { FcCancel } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import exclamation from "../../assets/icon/icons8-exclamation-96.png";
import success2 from "../../assets/icon/icons8-verified-account-96.png";
import { Circles } from "react-loader-spinner";
import ScrolltoTop from "../Shared/ScroolltoTop/Scrolltotop";
import { Helmet } from "react-helmet-async";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Title from "../Shared/title/title";
import AddCourses from "../AddCourses/AddCourses";

const DeclinedCourse = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    setCategoryLoading(true);
    axios
      .get(
        `https://artogram-server.vercel.app/AllCoursesTeacher?email=${user?.email}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
          },
        }
      )
      .then((res) => {
        setUsers(res.data);
        setCategoryLoading(false);
      });
  }, [user]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Course Declined",
      iconHtml: `<img src=${success} alt="" />`,
      text: `${id}`,
    });
  };
  const allCOurses = () => {
    setCategoryLoading(true);
    axios
      .get(
        `https://artogram-server.vercel.app/AllCoursesTeacher?email=${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
          },
        }
      )
      .then((res) => {
        setUsers(res.data);
        setCategoryLoading(false);
      });
  };
  const [categoryLoading, setCategoryLoading] = useState(false);
  const categoryLoad = (Category) => {
    setCategoryLoading(true);
    axios
      .get(
        `https://artogram-server.vercel.app/AllCoursesTeacherCategory?category=${Category}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
          },
        }
      )
      .then((res) => {
        setUsers(res.data);
        setCategoryLoading(false);
      });
  };
  const pending = users.filter((x) => x.status === "pending");
  const removePending = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "",
      iconHtml: `<img src=${exclamation} alt="" />`,
      customClass: {
        confirmButton: "sweet_confirmbuttonImportant",
        cancelButton: "cancelButton",
        isConfirmed: "isConfirmed",
      },

      showCancelButton: true,

      confirmButtonText: "Yes, Remove Course",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://artogram-server.vercel.app/AllCoursesTeacherDelete/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
            },
          }
        ).then((res) => {
          Swal.fire({
            title: "Sweet!",
            iconHtml: `<img src=${success2} alt="" />`,
            text: "Course is deleted",
          });
          allCOurses();
        });
      }
    });
  };
  return (
    <div>
      <>
        {" "}
        <Helmet>
          <title>DeclinedCourses | ARTOGRAM</title>
        </Helmet>
        <ScrolltoTop></ScrolltoTop>
        <ScrolltoTop></ScrolltoTop>
      </>
      <h1 className="text-pink-600 font-KaushanScript text-3xl hidden  lg:block lg:text-4xl text-center my-6">
        <Title>{"Course Manage"}</Title>
      </h1>
      <Tabs>
        <TabList>
          <Tab onClick={allCOurses}>All</Tab>

          <Tab onClick={() => categoryLoad("approved")}>Approved</Tab>
          <Tab onClick={() => categoryLoad("declined")}>Declined</Tab>
          <Tab>Add Courses</Tab>
        </TabList>

        {categoryLoading ? (
          <>
            <div className="w-full min-h-[70vh] flex justify-center items-center z-50 bg-transparent">
              <div className="loader32"></div>
            </div>
          </>
        ) : (
          <>
            <TabPanel>
              <div className="grid lg:grid-cols-2">
                {users.map((x) => (
                  <>
                    <div className="my-3 w-[70%] mx-auto rounded-3xl py-2 lg:p-0 lg:w-[90%]  flex-col bg-white border dark:border-none border-blue-200 dark:bg-[#121212] theme-text justify-center lg:justify-start lg:flex-row flex items-center gap-x-2  p-2">
                      <div className="flex lg:flex-row flex-col items-center gap-y-2 gap-x-2  lg:w-[400px] ">
                        <div className="w-24 h-24">
                          <img
                            loading="lazy"
                            src={x.courseImg}
                            className="w-full h-full object-cover rounded-2xl"
                            alt=""
                          />
                        </div>
                        <div className=" font-bold font-VarelaRound tracking-wide   lg:text-left text-center">
                          <h1>Name :{x.name}</h1>

                          <h1>Availableseats : {x.availableseats}</h1>
                          <h1>bookedSets : {x.bookedSets}</h1>
                        </div>
                      </div>
                      <div className="flex w-[180px] lg:w-[150px]  gap-y-1 flex-col lg:me-5">
                        {x.status === "pending" ? (
                          <>
                            <button className="btn font-Montserrat bg-pink-600 rounded-xl scale-90 text-white">
                              {x.status}
                            </button>
                          </>
                        ) : (
                          <></>
                        )}
                        {x.status === "approved" ? (
                          <>
                            <button className="btn font-Montserrat cursor-not-allowed rounded-xl btn-success scale-90 text-white">
                              {x.status}
                            </button>
                          </>
                        ) : (
                          <></>
                        )}
                        {x.status === "declined" ? (
                          <>
                            <button className="btn font-Montserrat cursor-not-allowed rounded-none  scale-90 bg-pink-400 text-white">
                              {x.status}
                            </button>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div>
                        {x.status === "pending" ? (
                          <>
                            {/* <button
                              onClick={() => removePending(x._id)}
                              className="btn bg-transparent p-0 m-0"
                            >
                              <img
                                loading="lazy"
                                className="w-12 lg:me-4"
                                src={delete2}
                                alt=""
                              />
                            </button> */}
                          </>
                        ) : (
                          <></>
                        )}
                        {x.status === "declined" ? (
                          <>
                            <button
                              onClick={() => handleDelete(x.declinedMsg)}
                              className="btn p-0 m-0"
                            >
                              <IoMdInformationCircleOutline />
                            </button>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </TabPanel>

            <TabPanel>
              <div className="grid lg:grid-cols-2">
                {users.map((x) => (
                  <>
                    <div className="my-3 w-[70%] mx-auto rounded-3xl py-2 lg:p-0 lg:w-[90%]  flex-col bg-white border dark:border-none border-blue-200 dark:bg-[#121212] theme-text justify-center lg:justify-start lg:flex-row flex items-center gap-x-2  p-2">
                      <div className="flex lg:flex-row flex-col items-center gap-y-2 gap-x-2  lg:w-[400px] ">
                        <div className="w-24 h-24">
                          <img
                            loading="lazy"
                            src={x.courseImg}
                            className="w-full h-full object-cover rounded-2xl"
                            alt=""
                          />
                        </div>
                        <div className=" font-bold font-VarelaRound tracking-wide   lg:text-left text-center">
                          <h1>Name :{x.name}</h1>

                          <h1>Availableseats : {x.availableseats}</h1>
                          <h1>bookedSets : {x.bookedSets}</h1>
                        </div>
                      </div>
                      <div className="flex w-[180px] lg:w-[150px]  gap-y-1 flex-col lg:me-5">
                        {x.status === "pending" ? (
                          <>
                            <button className="btn font-Montserrat rounded-xl scale-90 text-white">
                              {x.status}
                            </button>
                          </>
                        ) : (
                          <></>
                        )}
                        {x.status === "approved" ? (
                          <>
                            <button className="btn font-Montserrat cursor-not-allowed rounded-xl btn-success scale-90 text-white">
                              {x.status}
                            </button>
                          </>
                        ) : (
                          <></>
                        )}
                        {x.status === "declined" ? (
                          <>
                            <button className="btn font-Montserrat cursor-not-allowed rounded-none  scale-90 bg-pink-400 text-white">
                              {x.status}
                            </button>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div>
                        {x.status === "approved" ? (
                          <>
                            <button
                              onClick={() => removePending(x._id)}
                              className="btn  border-none  p-0 me-2"
                            >
                              <FcCancel />
                            </button>
                          </>
                        ) : (
                          <></>
                        )}
                        {x.status === "declined" ? (
                          <>
                            <button
                              onClick={() => handleDelete(x.declinedMsg)}
                              className="btn bg-transparent p-0 m-0"
                            ></button>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="grid lg:grid-cols-2">
                {users.map((x) => (
                  <>
                    <div className="my-3 w-[70%] mx-auto rounded-3xl py-2 lg:p-0 lg:w-[90%]  flex-col bg-white border dark:border-none border-blue-200 dark:bg-[#121212] theme-text justify-center lg:justify-start lg:flex-row flex items-center gap-x-2  p-2">
                      <div className="flex lg:flex-row flex-col items-center gap-y-2 gap-x-2  lg:w-[400px] ">
                        <div className="w-24 h-24">
                          <img
                            loading="lazy"
                            src={x.courseImg}
                            className="w-full h-full object-cover rounded-2xl"
                            alt=""
                          />
                        </div>
                        <div className=" font-bold font-VarelaRound tracking-wide  lg:text-left  text-center">
                          <h1 className="">Name :{x.name}</h1>

                          <h1>Availableseats : {x.availableseats}</h1>
                          <h1>bookedSets : {x.bookedSets}</h1>
                          <h1>Decline Reason: {x.declinedMsg}</h1>
                        </div>
                      </div>
                      <div className="flex w-[180px] lg:w-[150px]  gap-y-1 flex-col lg:me-5">
                        {x.status === "declined" ? (
                          <>
                            <button className="btn font-Montserrat cursor-not-allowed rounded-none  scale-90 bg-pink-400 text-white">
                              {x.status}
                            </button>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div>
                        <button
                          onClick={() => handleDelete(x.declinedMsg)}
                          className="btn bg-white border-none p-0 m-0"
                        >
                          <IoMdInformationCircleOutline />
                        </button>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </TabPanel>
            <TabPanel>
              <AddCourses></AddCourses>
            </TabPanel>
          </>
        )}
      </Tabs>
    </div>
  );
};

export default DeclinedCourse;
