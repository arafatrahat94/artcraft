import React from "react";
import img from "../../../assets/bannerEl/1.png";
import img1 from "../../../assets/whychoseUs/icons8-geometric-flowers-48.png";
import men from "../../../assets/bannerEl/men.png";
const WhyChoseUs = () => {
  return (
    <div className="my-20">
      <div
        className="flex lg:flex-row flex-col items-center justify-center theme-color1 bg-opacity-5 lg:h-[550px] 
      "
      >
        <div className="relative h-full  flex items-center -left-3 lg:left-0 lg:w-1/2">
          <img
            className="theme-color1 bg-opacity-40 rounded-[3rem] lg:w-[400px] w-[310px]  lg:h-[390px]  mx-auto mt-4 "
            src={img}
            alt=""
          />
          <img
            className="s lg:w-[400px] w-[310px] lg:h-[390px] absolute z-10 mx-auto bg-white rounded-[3rem] lg:left-24 left-4 lg:top-[10px] lg:right-5 theme-border shadow-2xl shadow-black mt-10"
            src={men}
            alt=""
          />
        </div>
        <div
          className="relative  bg-i
 h-full flex items-center mt-6 mb-10 theme-text lg:w-1/2 flex-col"
        >
          <h1 className=" my-5 text-3xl lg:text-5xl  font-KaushanScript text-center">
            Why Choose Us
          </h1>
          <p className="text-xl mx-4 text-center font-VarelaRound font-bold mb-5">
            &ldquo;Artistry Unveiled: Your Portal to Original
            Masterpieces&ldquo;
          </p>
          <div className="  mx-5 w-11/12">
            <div className="p-2 my-2 lg:bg-opacity-70 bg-white rounded-2xl shadow">
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
            <div className="p-2 lg:bg-opacity-70 bg-white rounded-2xl  shadow">
              <div className="py-1 px-1 rounded-xl  flex items-center gap-x-2 ">
                <img src={img1} alt="" />
                <h1 className="theme-text font-VarelaRound text-[18px] font-bold">
                  24/7 Support
                </h1>
              </div>

              <p className="text-left font-VarelaRound font-bold theme-text ms-3">
                We Provide support to the student 24/7 so that the Students who
                are in problems can solve their problem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoseUs;
