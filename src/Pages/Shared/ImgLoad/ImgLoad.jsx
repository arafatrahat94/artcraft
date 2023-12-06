import React, { useState } from "react";
import "./img.css";
const ImgLoad = ({ imgs, roundedd }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div>
      {loaded ? <></> : <div className="loader2"></div>}
      <img
        className={`${
          loaded ? "opacity-100" : "opacity-0"
        } h-full object-cover w-full transform duration-300 ${roundedd}`}
        onLoad={() => setLoaded(true)}
        loading="lazy"
        src={imgs}
        alt="Shoes"
      />
    </div>
  );
};

export default ImgLoad;
