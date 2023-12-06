import axios from "axios";
import plus from "../../assets/icon/icons8-plus-96.png";
import exclamation from "../../assets/icon/icons8-exclamation-96.png";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";

import { Circles } from "react-loader-spinner";
import Swal from "sweetalert2";

import success from "../../assets/icon/icons8-verified-account-96.png";
import ScrolltoTop from "../Shared/ScroolltoTop/Scrolltotop";
import { Helmet } from "react-helmet-async";
import { PiStickerBold } from "react-icons/pi";
import Title from "../Shared/title/title";
import { Link } from "react-router-dom";
const EnrolledCourse = () => {
  const { user } = useAuth();

  const [loading, setIsLoading] = useState(true);
  const [data, setdata] = useState([]);
  console.log(data);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://artogram-server.vercel.app/EnrolledCourse?email=${user?.email}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(`ArtAccess`)}`,
          },
        }
      )
      .then((res) => {
        setdata(res.data);
        setIsLoading(false);
      });
  }, [user]);

  return (
    <div>
      <ScrolltoTop></ScrolltoTop>
      <ScrolltoTop></ScrolltoTop>
      <Helmet>
        <title>EnrolledCourse | ARTOGRAM</title>
      </Helmet>
      <div className="my-5">
        <Title>{"EnrolledCourse"}</Title>
      </div>
      {loading ? (
        <>
          <div className=" min-h-screen flex  justify-center items-center">
            <div className="w-full min-h-[100vh] flex justify-center items-center z-50 bg-transparent">
              <div className="loader32"></div>
            </div>
          </div>
        </>
      ) : (
        <>
          {data.length > 0 ? (
            <>
              <div className="grid lg:grid-cols-2 w-11/12 mx-auto">
                {data.map((x, i) => (
                  <>
                    <div className="my-3 relative rounded-3xl dark:bg-opacity-40 dark:bg-[#121212] border-2 border-blue-400 dark:border-opacity-25 lg:mx-2 mx-14 flex-col justify-center lg:justify-start lg:flex-row flex items-center gap-x-2  p-2">
                      <div className="flex items-center lg:flex-row theme-text w-full flex-col lg:col-span-2">
                        <div className="rounded-3xl my-1  ">
                          <img
                            loading="lazy"
                            className="w-16 lg:w-28"
                            src={x.courseImg}
                            alt=""
                          />
                        </div>
                        <div className="  flex lg:text-[16px] text-sm items-center flex-col lg:items-start justify-center font-bold font-VarelaRound">
                          <h1 className="flex items-center justify-start overflow-scroll">
                            <div>
                              <h1 className="flex">
                                <PiStickerBold className="text-xl" />
                                {x?.courseTitle}
                              </h1>
                            </div>{" "}
                          </h1>

                          <h1 className="flex">
                            <PiStickerBold className="text-xl" /> {x?.seats}
                            Seats{" "}
                          </h1>
                          <h1 className="flex">
                            <PiStickerBold className="text-xl" />
                            {x?.price}$
                          </h1>
                        </div>
                      </div>
                      <Link
                        to={`/ViewClass/${x.courseId}`}
                        className="rounded-3xl my-1  flex gap-x-6  w-full items-center gap-y-2 justify-center"
                      >
                        <button className="btn font-Montserrat bg-transparent theme-text border-blue-300">
                          Continue Class
                        </button>
                      </Link>
                    </div>
                  </>
                ))}
              </div>
            </>
          ) : (
            <>
              <h1 className="theme-text min-h-[70vh] font-KaushanScript text-xl flex justify-center items-center divider-vertical text-center">
                Enrolled Course Is Empty
              </h1>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default EnrolledCourse;
