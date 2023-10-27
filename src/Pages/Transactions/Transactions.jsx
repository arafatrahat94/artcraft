import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";

import { Circles } from "react-loader-spinner";

import ScrolltoTop from "../Shared/ScroolltoTop/Scrolltotop";
import { Helmet } from "react-helmet-async";
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
    <div>
      <ScrolltoTop></ScrolltoTop>
      <ScrolltoTop></ScrolltoTop>
      <Helmet>
        <title>Transactions | ARTOGRAM</title>
      </Helmet>
      {loading ? (
        <>
          <div className=" min-h-screen flex  justify-center items-center">
            <Circles
              height="80"
              width="80"
              method="dialog"
              color="#D81B60"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        </>
      ) : (
        <>
          <h1 className="hidden lg:block text-center text-4xl font-KaushanScript  my-5 text-pink-600">
            Course Transactions
          </h1>
          {data.length > 0 ? (
            <>
              <div>
                {data.map((x, i) => (
                  <>
                    <div className="flex lg:flex-row flex-col  gap-x-2  p-3 w-9/12 lg:w-11/12 mx-auto theme-color1 bg-opacity-5 border my-1 rounded-[2rem]">
                      <div className="flex items-center lg:flex-row flex-col text-center lg:w-[500px] lg:col-span-2">
                        <div className="rounded-3xl my-1  ">
                          <button className="btn-circle text-pink-600 btn">
                            {i + 1}
                          </button>
                        </div>
                        <div className="text-pink-600  flex lg:text-[16px] text-sm items-center flex-col lg:items-start justify-center  font-VarelaRound">
                          <h1>email:{x?.customerEmail}</h1>
                          <h1 className="my-2">
                            Transiction Id :{" "}
                            <span className="bg-pink-200 p-[2px] ">
                              {x?.transictionId}
                            </span>{" "}
                          </h1>
                          <h1 className="my-2">
                            PaidAmmount :{" "}
                            <span className="bg-pink-200 p-[2px] ">
                              {x?.paidAmmount} $
                            </span>{" "}
                          </h1>
                        </div>
                      </div>
                      <div className=" text-pink-600 flex items-center justify-center">
                        {x.purchaseDate}
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </>
          ) : (
            <>
              <h1 className="text-pink-600 min-h-[70vh] font-KaushanScript text-xl flex justify-center items-center divider-vertical text-center">
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
