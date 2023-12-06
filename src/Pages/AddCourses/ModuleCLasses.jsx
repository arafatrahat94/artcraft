import { data } from "autoprefixer";
import React, { useEffect, useRef, useState } from "react";
import "./f.css";
const ModuleCLasses = ({
  nextModule,
  index,
  setModuleClasses,
  moduleClasses,
  SetmoduleClassData,
  moduleClassData,
}) => {
  const [selectType, SetSelectType] = useState(null);
  const [hideButton, setHideButton] = useState(false);
  console.log(nextModule);
  const classTitle = useRef("");
  const urlClass = useRef("");
  const textAReaRef = useRef("");
  const data = () => {
    if (selectType === null) {
      return;
    } else {
      const check = moduleClassData.find((x) => x.classNo === index);
      console.log(check);
      if (check) {
        return;
      } else {
        const newData = {
          classNo: index,
          classTitle: classTitle?.current.value,
          type: selectType,
          urlClass: urlClass?.current.value,
          textClass: textAReaRef?.current.value,
        };
        const newData2 = [...moduleClassData, newData];
        SetmoduleClassData(newData2);
      }
    }
  };
  if (nextModule === true) {
    data();
  }
  const [textAreaHide, settextAreaHide] = useState(false);
  const [titleArea, setTitleAreA] = useState(false);
  console.log(moduleClassData);
  return (
    <div onBlur={() => data()} className="">
      <form className="flex flex-col  mx-auto">
        <div
          tabIndex={0}
          className="collapse collapse-arrow focus:border-opacity-40  border-opacity-20 dark:bg-[#121212] my-1 py-3 dark:border-opacity-25 "
        >
          <div className="flex flex-col p-3">
            <div className="flex">
              {" "}
              <div className="w-[120px] text-center bg-red-500 text-white h-10 px-2 rounded-xl flex items-center justify-center font-semibold font-VarelaRound">
                <h1>Class {index}</h1>
              </div>
              <div className="ms-4">
                <h1 className="text-2xl font-sans uppercase font-semibold">
                  <input
                    ref={classTitle}
                    className={`w-[100%] ${
                      titleArea === true ? " border-none " : ""
                    } rounded-xl bg-transparent border border-blue-300  px-4 transform duration-300 outline-none border-opacity-30   uppercase`}
                    placeholder="Class Title"
                    type="text"
                  />
                </h1>
              </div>
            </div>
            <div className="mt-2 flex gap-x-2 w-full">
              {selectType === null && (
                <div className="dropdown dropdown-right font-VarelaRound dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn bg-transparent theme-text border-blue-400 border-opacity-25 m-1"
                  >
                    Select Class Type
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-[#121212] border-2 border-opacity-25 font-VarelaRound dark:text-blue-200 border-blue-200 rounded-box w-52"
                  >
                    <li onClick={() => SetSelectType("textarea")}>
                      <a>Text Document</a>
                    </li>
                    <li onClick={() => SetSelectType("url")}>
                      <a>Video</a>
                    </li>
                  </ul>
                </div>
              )}
              {selectType !== null && (
                <>
                  <div
                    onBlur={() => {
                      setTimeout(() => {
                        data();
                      }, 1000);
                    }}
                    className="w-full"
                  >
                    {selectType === "textarea" ? (
                      <>
                        <div className="w-full">
                          <textarea
                            name=""
                            ref={textAReaRef}
                            placeholder="type you text document"
                            className="w-[100%] p-4 bg-transparent border border-opacity-20 border-blue-300 rounded-lg h-[240px] outline-none"
                          ></textarea>
                        </div>{" "}
                      </>
                    ) : (
                      <input
                        ref={urlClass}
                        className="w-[100%] rounded-md bg-transparent border border-blue-300  px-4 transform duration-300 outline-none border-opacity-30  py-2 "
                        placeholder="https://www.youtube.com/video"
                        type="url"
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex gap-x-2 mx-auto w-[90%]">
            {nextModule === false && (
              <button
                type="button"
                onClick={() => {
                  data();
                  setHideButton(true);

                  const newArray = [...moduleClasses, index + 1];

                  setModuleClasses(newArray);
                  setTitleAreA(true);
                  console.log(moduleClassData);
                }}
                className={`${
                  hideButton === true && "hidden"
                }  btn font-Montserrat uppercase  outline-none  theme-color1 text-white bg-opacity-40 w-1/2 mx-auto ${
                  selectType === null
                    ? "hidden transform duration-300"
                    : "transform duration-300"
                }`}
              >
                Next Class
              </button>
            )}
          </div>
        </div>
        {/* <input type="submit" /> */}
      </form>
    </div>
  );
};

export default ModuleCLasses;
