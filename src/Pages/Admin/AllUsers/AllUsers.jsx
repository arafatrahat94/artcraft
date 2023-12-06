import axios from "axios";
import React, { useEffect, useState } from "react";

import useAuth from "../../../Hooks/useAuth";
import ScrolltoTop from "../../Shared/ScroolltoTop/Scrolltotop";
import { Helmet } from "react-helmet-async";
import { MdOutlineCancel } from "react-icons/md";
import { PiStickerBold } from "react-icons/pi";
import Title from "../../Shared/title/title";
const customId = "custom-id-yes";

import { ToastContainer, toast } from "react-toastify";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  const [load, setLoad] = useState(null);
  useEffect(() => {
    setLoad(true);
    axios
      .get(`https://artogram-server.vercel.app/AllUsers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
        setLoad(false);
      });
  }, []);
  const refetch = () => {
    setLoad(true);
    axios
      .get(`https://artogram-server.vercel.app/AllUsers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
        setLoad(false);
      });
  };
  const makeAdmin = (id) => {
    fetch(`https://artogram-server.vercel.app/AllUsersMakeAdmin/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
      },
    }).then((res) => {
      toast.info("new admin assigned", {
        toastId: customId,
      });
      refetch();
    });
  };
  const makeTeacher = (id) => {
    fetch(`https://artogram-server.vercel.app/AllUsersMakeTeacher/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
      },
    }).then((res) => {
      toast.info("new teacher assigned", {
        toastId: customId,
      });
      refetch();
    });
  };

  const handleDelete = (id) => {
    fetch(`https://artogram-server.vercel.app/AllUsersRemoveMember/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
      },
    }).then((res) => {
      toast.info("user have been removed", {
        toastId: customId,
      });
      refetch();
    });
  };

  const makeStudent = (id) => {
    fetch(`https://artogram-server.vercel.app/AllUsersMakeStudent/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
      },
    }).then((res) => {
      toast.info("user is now an student", {
        toastId: customId,
      });
      refetch();
    });
  };
  const makeStudent2 = (id) => {
    fetch(`https://artogram-server.vercel.app/AllUsersMakeStudent/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
      },
    }).then((res) => {
      toast.info("user is now an student", {
        toastId: customId,
      });
      refetch();
    });
  };

  return (
    <div>
      <>
        <Helmet>
          <title>AllUser | ARTOGRAM</title>
        </Helmet>
        <ScrolltoTop></ScrolltoTop>
        <ScrolltoTop></ScrolltoTop>
      </>
      <div className="my-3">
        <Title>{"All Users"}</Title>
      </div>
      <div className="min-h-[2px] max-w-6xl  mx-auto grid lg:grid-cols-2    ">
        {users.map((x) => (
          <>
            <div className="my-3 relative rounded-3xl dark:bg-opacity-40 dark:bg-[#121212] border-2 border-blue-400 dark:border-opacity-25 mx-2 flex-col justify-center lg:justify-start lg:flex-row flex items-center gap-x-2  p-2">
              <div className="flex lg:flex-row flex-col items-center w-full gap-y-2 gap-x-2  lg:w-[400px] xl:w-[500px]">
                <div className="w-full items-center gap-x-2 theme-text flex lg:w-24 h-24">
                  <img
                    src={x.img}
                    className="w-24 h-full object-cover rounded-2xl"
                    alt=""
                  />
                  <div className="md:hidden">
                    {x.name && (
                      <h1 className="flex items-center justify-start overflow-scroll">
                        <div>
                          <PiStickerBold className="text-xl" />
                        </div>{" "}
                        {x.name.slice(0, 19)}
                      </h1>
                    )}
                    <h1 className="  flex">
                      {x.email && (
                        <>
                          <div className="text">
                            <PiStickerBold className="text-xl" />
                          </div>{" "}
                          <div className="overflow-scroll w-[170px]">
                            {x.email}
                          </div>
                        </>
                      )}
                    </h1>
                    <h1 className="flex">
                      <div className="text-xs">
                        <PiStickerBold className="text-xl" />
                      </div>
                      {x.profiletype}
                    </h1>
                  </div>
                </div>
                <div className="flex items-center w-full">
                  <div className="w-[200px] xl:w-[300px] overflow-clip font-bold font-Montserrat tracking-wide theme-text lg:text-left hidden md:block">
                    {x.name && (
                      <h1 className="flex items-center justify-start overflow-scroll">
                        <div>
                          <PiStickerBold className="text-xl" />
                        </div>{" "}
                        {x.name.slice(0, 19)}
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
                      {x.profiletype}
                    </h1>
                  </div>
                  <div className="flex lg:w-[100px]  gap-y-1 lg:flex-col  w-full lg:me-5">
                    {x.profiletype === "admin" ? (
                      <>
                        <button
                          onClick={() => {
                            makeStudent(x._id);
                          }}
                          className="py-3 font-Montserrat border dark:border-blue-300 dark:border-opacity-30 md:w-full w-1/2  bg-red-300 roundedsm scale-90 text-white"
                        >
                          Remove Admin
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            makeAdmin(x._id);
                          }}
                          className="btn font-Montserrat bg-green-600 w-1/2 rounded-xl scale-90 md:w-full text-white"
                        >
                          Make Admin
                        </button>
                      </>
                    )}
                    {x.profiletype === "teacher" ? (
                      <>
                        <button
                          onClick={() => {
                            makeStudent2(x._id);
                          }}
                          className="py-3 font-Montserrat border dark:border-blue-300 dark:border-opacity-30 dark:bg-[#121212] w-1/2 md:w-full bg-blue-300 roundedsm scale-90 text-white"
                        >
                          Remove Teacher
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            makeTeacher(x._id);
                          }}
                          className="py-3 font-Montserrat border dark:border-blue-300 dark:border-opacity-30 dark:bg-[#121212] md:w-full w-1/2 bg-blue-300 roundedsm scale-90 text-white"
                        >
                          Make Teacher
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDelete(x._id)}
                className="btn bg-transparent border-none p-0 m-0 relative lg:right-5  text-red-500"
              >
                <MdOutlineCancel />
              </button>
            </div>
          </>
        ))}
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
    </div>
  );
};

export default AllUsers;
