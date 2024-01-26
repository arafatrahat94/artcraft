import React, { useEffect, useState } from "react";
import { FaPaintBrush } from "react-icons/fa";
import { PiChalkboardTeacherLight, PiStudentDuotone } from "react-icons/pi";
import "./support.css";
import AnimatedNumbers from "react-animated-numbers";
import axios from "axios";
const Support = () => {
  const [teacherCount, setTeacherCount] = useState("");
  const [studenCount, setStudentCount] = useState("");
  useEffect(() => {
    axios.get("https://artogram-server.vercel.app/teacherCount").then((res) => {
      setTeacherCount(res.data.num);
    });
    axios.get("https://artogram-server.vercel.app/studentCount").then((res) => {
      setStudentCount(res.data.num);
    });
  }, []);
  return (
    <div className="lg:h-40 mb-14">
      <div className="grid mt-[250px] lg:mt-0 grid-cols-1 lg:grid-cols-3 h-full w-11/12 mx-auto rounded-2xl gap-y-5">
        <div className="Burshcard-id567 bg-white dark:bg-black">
          <div className="Burshcardprompt-id567 ">
            <div className="Burshcardtoken-container">
              <img
                loading="lazy"
                className="mx-auto"
                width={96}
                height={96}
                src="https://img.icons8.com/fluency/96/000000/illustrator.png"
                alt="illustrator"
              />
            </div>
            <div className="Burshcardblurry-splash theme-text" />
            <p className="text-accen ">
              Best Quality Items
              <br />
              <span className="Burshcardbold-567 text-accen">
                Free For New Comers
              </span>{" "}
            </p>
          </div>
        </div>
        <div className="Burshcard-id567 bg-white dark:bg-black">
          <div className="Burshcardprompt-id567">
            <div className="Burshcardtoken-container">
              <img
                loading="lazy"
                width="100"
                height="100"
                src="https://img.icons8.com/stickers/100/000000/training-skin-type-1.png"
                alt="training-skin-type-1"
              />
            </div>
            <div className="Burshcardblurry-splash" />
            <p className="flex items-center theme-text">
              We Have &nbsp;
              <AnimatedNumbers
                includeComma
                className=" bg-blue-400"
                animateToNumber={teacherCount}
                fontStyle={{
                  fontSize: 40,
                  width: "25px",
                  color: "#D81B60",
                  textDecorationColor: "#D81B60",
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
              ></AnimatedNumbers>{" "}
              + Teachers
            </p>
          </div>
        </div>

        <div className="-z-10 lg:z-10 flex gap-x-3 bg-i font-VarelaRound items-center flex-col rounded-tl-3xl absolute  right-2 lg:right-0 w-[250px] lg:w-[334px] rounded-br-3xl h-[300px] lg:h-[270px] rounded-md  gap-y-2 bg-opacity-20 top-[650px] lg:top-[520px]  justify-center theme-text font-semibold">
          {" "}
          <div className="Burshcard-id5672 ">
            <div className="Burshcardprompt-id5672">
              <h1 className="mt-10 Burshcardtoken-container">
                <img
                  loading="lazy"
                  className="mx-auto"
                  width="96"
                  height="96"
                  src="https://img.icons8.com/fluency/96/000000/student-male.png"
                  alt="student-male"
                />
              </h1>
              <h1 className="text-4xl flex font-RussoOne ms-4 theme-text">
                <AnimatedNumbers
                  includeComma
                  className=" bg-blue-400 dark:text-white"
                  animateToNumber={studenCount}
                  fontStyle={{
                    fontSize: 40,
                    width: "30px",

                    textDecorationColor: "#D81B60",
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
              <h1 className="text-2xl font-KaushanScript theme-text uppercase">
                Students
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
