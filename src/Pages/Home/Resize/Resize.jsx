import React from "react";

const Resize = () => {
  let inputID = document.getElementById("inputResize");
  const resizeFu = (event) => {
    console.log(event);
  };
  return (
    <div>
      <input
        onChange={() => resizeFu(event)}
        type="file"
        id="inputResize"
        accept=".jpg,.png,.jpeg"
      />
    </div>
  );
};

export default Resize;
