import React from "react";
import "./.css";
const Spinner = () => {
  return (
    <div className="w-full min-h-[100vh] flex justify-center items-center z-50 bg-white">
      <div className="w-full min-h-[100vh] flex justify-center items-center z-50 bg-white">
        <div className="spinner">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </div>
  );
};

export default Spinner;
