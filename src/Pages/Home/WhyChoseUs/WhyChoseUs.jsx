import React from "react";
import img from "../../../assets/bannerEl/1.png";
import img1 from "../../../assets/whychoseUs/icons8-geometric-flowers-48.png";
import "./why.css";
import men from "../../../assets/bannerEl/men.png";
import Title from "../../Shared/title/title";
const WhyChoseUs = () => {
  return (
    <div className="my-[100px]">
      <Title>{"Why Chose us"}</Title>
      <div>
        <div
          className="flex lg:flex-row mt-4 flex-col items-center justify-center theme-color1 bg-opacity-5 px-5 lg:px-2 lg:py-2 py-10 lg:p-2 lg:h-[450px] 
      "
        >
          <div className="relative h-full  flex items-center  lg:left-0 lg:w-1/2">
            <img
              style={{ boxShadow: "-10px -10px 0 0 #0b2447" }}
              className="s lg:w-[400px] w-[250px] lg:h-[390px]  z-10 mx-auto bg-white rounded-[3rem]   "
              src={men}
              alt=""
            />
          </div>
          <div className="card4 py-8 lg:p-4">
            <h2>
              <p className="text-xl lg:text-2xl mx-4 text-center font-VarelaRound text-[#0b2447] font-extrabold mb-5">
                &ldquo;Artistry Unveiled: Your Portal to Original
                Masterpieces&ldquo;
              </p>
              <div className="  mx-5 w-11/12">
                <div className="p-2 my-2 lg:bg-opacity-70  rounded-2xl ">
                  <h1 className="theme-text font-RussoOne text-[18px] font-bold text-center my-2">
                    Original Artwork
                  </h1>

                  <p className="text-left font-VarelaRound font-bold theme-text2 ms-3">
                    We exclusively feature original art pieces tutorial,
                    allowing learners to get better taste.
                  </p>
                </div>
                <div className="p-2 lg:bg-opacity-70 rounded-2xl  ">
                  <h1 className=" font-RussoOne text-[18px] text-[#0b2447] my-2 text-center font-bold">
                    24/7 Support
                  </h1>

                  <p className="text-left font-VarelaRound font-bold text-[#2d8cf0]  ms-3">
                    We Provide support to the student 24/7 so that the Students
                    who are in problems can solve their problem.
                  </p>
                </div>
              </div>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoseUs;
