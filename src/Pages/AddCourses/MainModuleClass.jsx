import React, { useRef, useState } from "react";
import ModuleCLasses from "./ModuleCLasses";

const MainModuleClass = ({
  modulesDataFUll,
  setmodulesDataFUll,
  i,
  Modules,
  setModulues,
}) => {
  const [moduleClasses, setModuleClasses] = useState([0]);
  const [nextModule, SetNextMOdule] = useState(false);
  const [nextModule2, SetNextMOdule2] = useState(false);
  const [moduleClassData, SetmoduleClassData] = useState([]);
  const moduleTitle = useRef("");
  const liveclassCount = useRef("");
  const testCountNumber = useRef("");
  const newData = () => {
    const check = modulesDataFUll.find((z) => z.moduleNo === i);

    if (check) {
      return;
    } else {
      const newData2 = {
        moduleNo: i,
        moduleTitle: moduleTitle.current.value,
        liveCLass: liveclassCount.current.value,
        testS: testCountNumber.current.value,
        classes: moduleClassData,
      };
      const newData3 = [...modulesDataFUll, newData2];
      setmodulesDataFUll(newData3);
    }
    console.log(modulesDataFUll);
  };

  return (
    <details className="collapse collapse-arrow join-item focus:border-opacity-40 duration-300 transform  border-opacity-20 border theme-text dark:bg-[#121212] dark:bg-opacity-60 dark:border-opacity-25 dark:border-blue-400 rounded-none border-base-300">
      <summary className="collapse-title  text-xl font-medium">
        <div className="flex">
          <div className="w-[80px] text-center bg-blue-500 text-white h-[80px] px-2 rounded-xl flex items-center justify-center font-semibold font-VarelaRound">
            <h1>Module {i}</h1>
          </div>
          <div className="ms-4">
            <h1 className="text-2xl font-sans uppercase font-semibold">
              <input
                ref={moduleTitle}
                className="w-[100%] rounded-xl bg-transparent border border-blue-300  px-4 transform duration-300 outline-none border-opacity-30   uppercase"
                placeholder="Course Title"
                type="text"
              />
            </h1>
            <div className="mt-2 flex gap-x-2">
              <div className="flex items-center font-VarelaRound font-semibold theme-text text-sm text-opacity-70 uppercase dark:text-white">
                <input
                  ref={liveclassCount}
                  className="w-[40px] rounded-md bg-transparent px-2 border border-blue-300   transform duration-300 outline-none border-opacity-30 mx-2  uppercase"
                  placeholder=""
                  type="number"
                />{" "}
                Live Class
              </div>
              <div className="flex items-center font-VarelaRound font-semibold theme-text text-sm text-opacity-70 uppercase dark:text-white">
                <input
                  ref={testCountNumber}
                  className="w-[40px] rounded-md bg-transparent px-2 border border-blue-300   transform duration-300  outline-none border-opacity-30 mx-2  uppercase"
                  placeholder=""
                  type="number"
                />{" "}
                Test
              </div>
            </div>
          </div>
        </div>
      </summary>
      <div>
        {moduleClasses.map((y, index) => (
          <>
            <ModuleCLasses
              moduleClasses={moduleClasses}
              setModuleClasses={setModuleClasses}
              index={index}
              key={index}
              moduleClassData={moduleClassData}
              SetmoduleClassData={SetmoduleClassData}
              nextModule={nextModule}
            ></ModuleCLasses>
          </>
        ))}
      </div>

      <button
        onClick={() => {
          SetNextMOdule(true);
          SetNextMOdule2(true);
          const newArray2 = [...Modules, i + 1];
          console.log(newArray2);
          setModulues(newArray2);

          newData();
        }}
        type="button"
        className={`${
          nextModule2 === true && "hidden"
        } btn font-Montserrat uppercase  outline-none bg-opacity-50 theme-color1 theme-text dark:text-white dark:bg-opacity-20 rounded-b-xl rounded-t-none w-full mx-auto `}
      >
        Next Module
      </button>
    </details>
  );
};

export default MainModuleClass;
