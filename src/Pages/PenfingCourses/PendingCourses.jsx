import axios from "axios";
import { createRef, useEffect, useState } from "react";
import deletes from "../../assets/icon/icons8-info-96.png";
import success from "../../assets/icon/icons8-reject-96.png";

import Swal from "sweetalert2";
import "../Admin/AllUsers/AllUser.css";
import useAuth from "../../Hooks/useAuth";

const DeclinedCourse = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  //   const { user } = useAuth();
  useEffect(() => {
    axios
      .get(
        `https://artogram-server.vercel.app/DeclinedCourses?email=${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
          },
        }
      )
      .then((res) => {
        setUsers(res.data);
      });
  }, [user]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Course Declined",
      iconHtml: `<img src=${success} alt="" />`,
      text: `${id}`,
    });
  };

  return (
    <div>
      <h1 className="text-pink-600 font-KaushanScript text-4xl text-center my-10">
        Declined
      </h1>

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

                  <h1>Availableseats : {x.availableseats}</h1>
                  <h1>bookedSets : {x.bookedSets}</h1>
                  <h1>Decline Reason: {x.declinedMsg}</h1>
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
                  <></>
                )}
              </div>
              <div>
                <button
                  onClick={() => handleDelete(x.declinedMsg)}
                  className="btn p-0 m-0"
                >
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

export default DeclinedCourse;
