import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";

import { Circles } from "react-loader-spinner";

import ScrolltoTop from "../Shared/ScroolltoTop/Scrolltotop";
import { Helmet } from "react-helmet-async";
import Title from "../Shared/title/title";
const Transactions = () => {
  const { user } = useAuth();

  const [loading, setIsLoading] = useState(true);
  const [data, setdata] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://artogram-server.vercel.app/Transactions?email=${user?.email}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(`ArtAccess`)}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setdata(res.data);
        setIsLoading(false);
      });
  }, [user]);

  return (
    <div className=" max-w-6xl mt-10 mx-auto">
      <ScrolltoTop></ScrolltoTop>
      <ScrolltoTop></ScrolltoTop>
      <Helmet>
        <title>Transactions | ARTOGRAM</title>
      </Helmet>
      <Title>{"Transictions"}</Title>
      {loading ? (
        <>
          <div className=" min-h-screen flex  justify-center items-center">
            <div className="loader32"></div>
          </div>
        </>
      ) : (
        <>
          {data.length > 0 ? (
            <>
              <div className="grid items-center justify-center lg:grid-cols-2 lg:mx-2">
                {data.map((x, i) => (
                  <>
                    <div className="my-3 relative rounded-3xl  dark:bg-[#121212] border-2 border-blue-400 dark:border-opacity-25 lg:mx-2  flex-col justify-center mx-3 lg:justify-start lg:flex-row flex items-center gap-x-2  p-2">
                      <div className="flex items-center lg:flex-row flex-col text-center lg:w-[370px] overflow-scroll lg:col-span-2">
                        <div className="rounded-3xl my-1  ">
                          <button className="btn-circle theme-text btn">
                            {i + 1}
                          </button>
                        </div>
                        <div className="theme-text  flex lg:text-[16px] text-sm items-center flex-col lg:items-start justify-center  font-VarelaRound">
                          <h1>email:{x?.customerEmail}</h1>
                          <h1 className="my-2">
                            Transiction Id :{" "}
                            <span className="bg-blue-200 p-[2px] ">
                              {x?.transictionId}
                            </span>{" "}
                          </h1>
                          <h1 className="my-2">
                            PaidAmmount :{" "}
                            <span className="bg-blue-200 p-[2px] ">
                              {x?.paidAmmount} $
                            </span>{" "}
                          </h1>
                        </div>
                      </div>
                      <div className=" text-blue-600 flex items-center justify-center">
                        {x.purchaseDate}
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </>
          ) : (
            <>
              <h1 className="theme-text min-h-[70vh] font-KaushanScript text-xl flex justify-center items-center divider-vertical text-center">
                Transactions Is Empty
              </h1>
            </>
          )}
        </>
      )}

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Transactions;
