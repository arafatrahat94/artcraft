import React from "react";
import img from "../../../assets/bannerEl/1.png";
import img1 from "../../../assets/whychoseUs/icons8-geometric-flowers-48.png";
import men from "../../../assets/bannerEl/men.png";
const WhyChoseUs = () => {
  return (
    <div className="my-20">
      <div
        className="grid grid-cols-2 theme-color1 bg-opacity-5 h-[550px] 
      "
      >
        <div className="relative h-full  flex items-center">
          <img
            className="theme-color1 bg-opacity-40 rounded-[3rem] h-[390px]  mx-auto mt-4 "
            src={img}
            alt=""
          />
          <img
            className="s h-[390px] absolute z-10 mx-auto bg-white rounded-[3rem] top-[10px] right-5 theme-border shadow-2xl shadow-black mt-10"
            src={men}
            alt=""
          />
        </div>
        <div className="relative h-full flex items-center theme-text  flex-col">
          <h1 className=" my-5 text-5xl  font-KaushanScript text-center">
            Why Choose Us
          </h1>
          <p className="text-xl mx-4 text-center font-VarelaRound font-bold mb-5">
            &ldquo;Artistry Unveiled: Your Portal to Original
            Masterpieces&ldquo;
          </p>
          <div className="grid gap-4 grid-cols-2 mx-5 w-11/12">
            <div className="p-2 bg-i rounded-2xl h-[165px] shadow">
              <div className="py-1 px-1 rounded-xl  flex items-center gap-x-2 ">
                <img src={img1} alt="" />
                <h1 className="theme-text font-VarelaRound text-[18px] font-bold">
                  Original Artwork
                </h1>
              </div>

              <p className="text-left font-VarelaRound font-bold theme-text ms-3">
                We exclusively feature original art pieces tutorial, allowing
                learners to get better taste.
              </p>
            </div>
            <div className="p-2 bg-i rounded-2xl h-[165px] shadow">
              <div className="py-1 px-1 rounded-xl  flex items-center gap-x-2 ">
                <img src={img1} alt="" />
                <h1 className="theme-text font-VarelaRound text-[18px] font-bold">
                  Original Artwork
                </h1>
              </div>

              <p className="text-left font-VarelaRound font-bold theme-text ms-3">
                We exclusively feature original art pieces tutorial, allowing
                learners to get better taste.
              </p>
            </div>
            <div className="p-2 bg-i rounded-2xl h-[165px] shadow">
              <div className="py-1 px-1 rounded-xl  flex items-center gap-x-2 ">
                <img src={img1} alt="" />
                <h1 className="theme-text font-VarelaRound text-[18px] font-bold">
                  Original Artwork
                </h1>
              </div>

              <p className="text-left font-VarelaRound font-bold theme-text ms-3">
                We exclusively feature original art pieces tutorial, allowing
                learners to get better taste.
              </p>
            </div>
            <div className="p-2 bg-i rounded-2xl h-[165px] shadow">
              <div className="py-1 px-1 rounded-xl  flex items-center gap-x-2 ">
                <img src={img1} alt="" />
                <h1 className="theme-text font-VarelaRound text-[18px] font-bold">
                  Original Artwork
                </h1>
              </div>

              <p className="text-left font-VarelaRound font-bold theme-text ms-3">
                We exclusively feature original art pieces tutorial, allowing
                learners to get better taste.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoseUs;
