import axios from "axios";
import { createRef, useEffect, useState } from "react";
import deletes from "../../../assets/icon/icons8-delete-96.png";
import success from "../../../assets/icon/icons8-verified-account-96.png";
import exclamation from "../../../assets/icon/icons8-exclamation-96.png";
import reload from "../../../assets/icon/icons8-reload-96.png";
import Swal from "sweetalert2";
import "../../Admin/AllUsers/AllUser.css";
import { useForm } from "react-hook-form";
import { Circles } from "react-loader-spinner";
import ScrolltoTop from "../../Shared/ScroolltoTop/Scrolltotop";
// import useAuth from "../../../Hooks/useAuth";
const ManageCourses = () => {
  const [users, setUsers] = useState([]);
  const [reloads, setReload] = useState(false);
  //   const { user } = useAuth();
  useEffect(() => {
    axios
      .get(`https://artogram-server.vercel.app/Allcourses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
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
    axios
      .get(`https://artogram-server.vercel.app/Allcourses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
      });
  };
  const approve = (id) => {
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

      confirmButtonText: "Yes , Approve Now",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://artogram-server.vercel.app/ApproveCourses/${id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            Swal.fire({
              title: "Sweet!",
              iconHtml: `<img src=${success} alt="" />`,
              text: "Course Is Approved",
            });
            refetch();
          });
      }
    });
  };

  const handleDelete = async (id) => {
    const { value: text } = await Swal.fire({
      input: "textarea",
      inputLabel: "Type Decline Message",
      inputPlaceholder: "Type your message here...",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      customClass: {
        confirmButton: "sweet_confirmbuttonImportant",
        cancelButton: "cancelButton",
        isConfirmed: "isConfirmed",
        popup: "textArea",
      },
      showCancelButton: true,
    });

    if (text) {
      const newData = { msg: text };

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
          Swal.fire({
            title: "Sweet!",
            iconHtml: `<img src=${success} alt="" />`,
            text: "Course Have been Declined",
          });
          refetch();
        });
    }
  };

  return (
    <div>
      <ScrolltoTop></ScrolltoTop>
      <ScrolltoTop></ScrolltoTop>
      <h1 className="text-pink-600 font-KaushanScript text-4xl text-center hidden lg:block mt-10">
        Manage Courses
      </h1>
      <div className="w-full lg:static fixed justify-end flex">
        <button
          onClick={reloading}
          className="btn scale-90 lg:scale-100 btn-circle shadow-md shadow-pink-400 bg-white me-10 my-4"
        >
          <img className="w-8" src={reload} alt="" />
        </button>
      </div>
      {reloads ? (
        <>
          <div className="w-full min-h-[80vh] flex justify-center items-center">
            <Circles
              height="80"
              width="80"
              color="#D81B60"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="min-h-[2px] bg-slate-100  mx-5">
            {users.map((x) => (
              <>
                <div className="my-3  rounded-3xl pt-5 bg-gradient-to-r from-pink-50 to-pink-100  mx-2 flex-col justify-center lg:justify-start lg:flex-row flex items-center gap-x-2  p-2">
                  <div className="flex lg:flex-row flex-col items-center gap-y-2 gap-x-2  lg:w-[400px] ">
                    <div className="w-24 h-24">
                      <img
                        src={x.courseImg}
                        className="w-full h-full object-cover rounded-2xl"
                        alt=""
                      />
                    </div>
                    <div className=" font-bold font-VarelaRound tracking-wide  text-pink-600 lg:text-left text-center">
                      <h1>Name :{x.name}</h1>
                      <h1 className="w-[250px] overflow-scroll">
                        email : {x.email}
                      </h1>
                      <h1>Availableseats : {x.availableseats}</h1>
                      <h1>bookedSets : {x.bookedSets}</h1>
                    </div>
                  </div>
                  <div className="flex w-[180px] lg:w-[150px]  gap-y-1 flex-col lg:me-5">
                    {x.status === `declined` ? (
                      <>
                        <button
                          disabled
                          className="btn font-Montserrat bg-pink-600 rounded-xl scale-90 text-white"
                        >
                          Declined
                        </button>
                      </>
                    ) : (
                      <>
                        {x.status === "pending" ? (
                          <>
                            <button className="btn font-Montserrat border btn-disabled  shadow-xl shadow-pink-200 rounded-xl scale-90 bg-white text-pink-600">
                              Pending
                            </button>
                            <button
                              onClick={() => {
                                approve(x._id);
                              }}
                              className="btn font-Montserrat bg-pink-600 rounded-xl scale-90 text-white"
                            >
                              Approve
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              disabled
                              className="btn font-Montserrat bg-pink-600 rounded-xl scale-90 text-white"
                            >
                              Approved
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                  <div>
                    {x.status === `declined` ? (
                      <></>
                    ) : (
                      <>
                        <button
                          onClick={() => handleDelete(x._id)}
                          className="btn p-0 m-0"
                        >
                          <img className="w-12 lg:me-4" src={deletes} alt="" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ManageCourses;
