import axios from "axios";
import React, { useEffect, useState } from "react";
import deletes from "../../../assets/icon/icons8-delete-96.png";
import success from "../../../assets/icon/icons8-verified-account-96.png";
import exclamation from "../../../assets/icon/icons8-exclamation-96.png";
import Swal from "sweetalert2";
import "./AllUser.css";
import useAuth from "../../../Hooks/useAuth";
import ScrolltoTop from "../../Shared/ScroolltoTop/Scrolltotop";
const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    axios
      .get(`https://artogram-server.vercel.app/AllUsers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
      });
  }, []);
  const refetch = () => {
    axios
      .get(`https://artogram-server.vercel.app/AllUsers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
      });
  };
  const makeAdmin = (id) => {
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

      confirmButtonText: "Yes , Make Admin",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://artogram-server.vercel.app/AllUsersMakeAdmin/${id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
          },
        }).then((res) => {
          Swal.fire({
            title: "Sweet!",
            iconHtml: `<img src=${success} alt="" />`,
            text: "Profiletype Is Now Admin",
          });
          refetch();
        });
      }
    });
  };
  const makeTeacher = (id) => {
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

      confirmButtonText: "Yes , Make Teacher",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://artogram-server.vercel.app/AllUsersMakeTeacher/${id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
          },
        }).then((res) => {
          Swal.fire({
            title: "Sweet!",
            iconHtml: `<img src=${success} alt="" />`,
            text: "Profiletype Is Now Teacher",
          });
          refetch();
        });
      }
    });
  };

  const handleDelete = (id) => {
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

      confirmButtonText: "Yes , Remove User",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://artogram-server.vercel.app/AllUsersRemoveMember/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
          },
        }).then((res) => {
          Swal.fire({
            title: "Sweet!",
            iconHtml: `<img src=${success} alt="" />`,
            text: "User Have been Removed",
          });
          refetch();
        });
      }
    });
  };

  const makeStudent = (id) => {
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

      confirmButtonText: "Yes, Remove Admin",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://artogram-server.vercel.app/AllUsersMakeStudent/${id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
          },
        }).then((res) => {
          Swal.fire({
            title: "Sweet!",
            iconHtml: `<img src=${success} alt="" />`,
            text: "Profiletype Is Now Student",
          });
          refetch();
        });
      }
    });
  };
  const makeStudent2 = (id) => {
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

      confirmButtonText: "Yes, Remove Teacher",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://artogram-server.vercel.app/AllUsersMakeStudent/${id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
          },
        }).then((res) => {
          Swal.fire({
            title: "Sweet!",
            iconHtml: `<img src=${success} alt="" />`,
            text: "Profiletype Is Now Student",
          });
          refetch();
        });
      }
    });
  };

  return (
    <div>
      <>
        <ScrolltoTop></ScrolltoTop>
        <ScrolltoTop></ScrolltoTop>
      </>
      <h1 className="text-pink-600 font-KaushanScript text-4xl text-center my-10">
        All Users
      </h1>
      <div className="min-h-[2px] bg-slate-100  mx-5">
        {users.map((x) => (
          <>
            <div className="my-3  rounded-3xl pt-5 bg-gradient-to-r from-pink-50 to-pink-100  mx-2 flex-col justify-center lg:justify-start lg:flex-row flex items-center gap-x-2  p-2">
              <div className="flex lg:flex-row flex-col items-center gap-y-2 gap-x-2  lg:w-[400px] ">
                <div className="w-24 h-24">
                  <img
                    src={x.img}
                    className="w-full h-full object-cover rounded-2xl"
                    alt=""
                  />
                </div>
                <div className=" font-bold font-VarelaRound tracking-wide  text-pink-600 lg:text-left text-center">
                  <h1>Name :{x.name}</h1>
                  <h1 className="w-[250px] overflow-scroll">
                    email : {x.email}
                  </h1>
                  <h1>Profile : {x.profiletype}</h1>
                </div>
              </div>
              <div className="flex w-[180px]  gap-y-1 flex-col lg:me-5">
                {x.profiletype === "admin" ? (
                  <>
                    <button
                      onClick={() => {
                        makeStudent(x._id);
                      }}
                      className="btn font-Montserrat border  shadow-xl shadow-pink-200 rounded-xl scale-90 bg-white text-pink-600"
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
                      className="btn font-Montserrat bg-pink-600 rounded-xl scale-90 text-white"
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
                      className="btn font-Montserrat border shadow-xl shadow-pink-200 rounded-xl scale-90 bg-white text-pink-600"
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
                      className="btn font-Montserrat bg-pink-600 rounded-xl scale-90 text-white"
                    >
                      Make Teacher
                    </button>
                  </>
                )}
              </div>
              <div onClick={() => handleDelete(x._id)}>
                <button className="btn p-0 m-0">
                  <img className="w-12 lg:me-4" src={deletes} alt="" />
                </button>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
