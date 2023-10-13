import React from "react";
import { FaPaintBrush } from "react-icons/fa";
import { PiChalkboardTeacherLight, PiStudentDuotone } from "react-icons/pi";
import "./support.css";
import AnimatedNumbers from "react-animated-numbers";
const Support = () => {
  return (
    <div className="h-40 ">
      <div className="grid  grid-cols-3 h-full">
        <div className=" flex gap-x-3 font-VarelaRound items-center theme-color1 bg-opacity-5 justify-center theme-text font-semibold">
          <h1>
            <FaPaintBrush className="theme-text text-4xl" />
          </h1>
          <h1 className="w-[200px]">
            Best Quality Products Free For New Students
          </h1>
        </div>
        <div className=" flex gap-x-3 font-VarelaRound items-center theme-color1 bg-opacity-5 justify-center theme-text font-semibold">
          <h1>
            <PiChalkboardTeacherLight className="theme-text text-5xl" />
          </h1>
          <AnimatedNumbers
            includeComma
            className=" bg-blue-400"
            animateToNumber={55}
            fontStyle={{
              fontSize: 40,
              width: "25px",
              color: "#ee5b54",
              textDecorationColor: "#ee5b54",
            }}
            locale="en-US"
            configs={[
              { mass: 1, tension: 220, friction: 100 },
              { mass: 1, tension: 180, friction: 130 },
              { mass: 1, tension: 280, friction: 90 },
              { mass: 1, tension: 180, friction: 135 },
              { mass: 1, tension: 260, friction: 100 },
              { mass: 1, tension: 210, friction: 180 },
            ]}
          ></AnimatedNumbers>

          <h1 className=" text-2xl"> Teachers</h1>
        </div>
        <div className=" flex gap-x-3 bg-i font-VarelaRound items-center flex-col rounded-tl-3xl absolute  right-0 w-[334px] rounded-br-3xl h-[270px]   gap-y-2 bg-opacity-20 top-[520px] z-10 justify-center theme-text font-semibold">
          <h1>
            <PiStudentDuotone className="theme-text text-7xl" />
          </h1>
          <h1 className="text-4xl flex font-KaushanScript theme-text">
            <AnimatedNumbers
              includeComma
              className=" bg-blue-400"
              animateToNumber={640}
              fontStyle={{
                fontSize: 40,
                width: "30px",
                color: "#ee5b54",
                textDecorationColor: "#ee5b54",
              }}
              locale="en-US"
              configs={[
                { mass: 1, tension: 220, friction: 100 },
                { mass: 1, tension: 180, friction: 130 },
                { mass: 1, tension: 280, friction: 90 },
                { mass: 1, tension: 180, friction: 135 },
                { mass: 1, tension: 260, friction: 100 },
                { mass: 1, tension: 210, friction: 180 },
              ]}
            ></AnimatedNumbers>
            +
          </h1>
          <h1 className="text-2xl font-Montserrat">Students</h1>
        </div>
      </div>
    </div>
  );
};

export default Support;
