import React, { useEffect, useState } from "react";
import PhotoAlbum from "react-photo-album";

import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import "./Photo.css";
import axios from "axios";
import Title from "../../Shared/title/title";
import { Link } from "react-router-dom";
const PhotoALbum = () => {
  const [pictures, setPictures] = useState([]);
  const home = location.pathname === "/";
  // const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!home) {
      setLoading(true);
    }
    axios.get("https://artogram-server.vercel.app/PicturesSt").then((res) => {
      if (home) {
        setPictures(res.data.slice(0, 6));
      } else {
        setPictures(res.data);
      }
      if (!home) {
        setLoading(false);
      }
    });
    if (!home) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [home]);

  return (
    <div>
      {loading === true ? (
        <>
          <div className="w-full min-h-[100vh] flex justify-center items-center z-50 ">
            <div className="loader32"></div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div
            className="w-10/12 p-10 bg-opacity-10 mx-auto gap-2 theme-color1 dark:bg-opacity-40 dark:bg-[#121212] rounded-[3rem] mb-10 shadow-lg
       "
          >
            <Title>{"Students Art Work"}</Title>{" "}
            <div className=" mt-14 gap-2 grid grid-cols-2 lg:grid-cols-3 w-full h-full">
              {" "}
              <PhotoProvider
                className="backdrop-blur-sm"
                maskOpacity={0.5}
                speed={() => 800}
                easing={(type) =>
                  type === 2
                    ? "cubic-bezier(0.36, 0, 0.66, -0.56)"
                    : "cubic-bezier(0.34, 1.56, 0.64, 1)"
                }
                toolbarRender={({ onScale, scale, rotate, onRotate }) => {
                  return (
                    <>
                      <div
                        className="mt-2 w-20 PhotoView-Slider__toolbarIcon"
                        onClick={() => onScale(scale + 1)}
                      >
                        <img
                          src="https://i.ibb.co/0KXpXc5/icons8-plus-80.png"
                          alt=""
                        />
                      </div>
                      <div
                        className="mt-2 w-20 PhotoView-Slider__toolbarIcon"
                        onClick={() => onScale(scale - 1)}
                      >
                        <img
                          src="https://i.ibb.co/MfymMkc/icons8-minus-80.png"
                          alt=""
                        />
                      </div>
                      <div
                        className="mt-2 w-20 PhotoView-Slider__toolbarIcon"
                        onClick={() => onRotate(rotate + 90)}
                      >
                        <img
                          src="https://i.ibb.co/svsGZnM/icons8-rotate-96-1.png"
                          alt=""
                        />
                      </div>
                    </>
                  );
                }}
              >
                {pictures.map((x) => (
                  <>
                    <PhotoView src={x.src}>
                      <img
                        src={x.src}
                        // style={{ objectFit: "cover" }}
                        className="h-full rounded-3xl border-blue-300 border-opacity-30 border-2  backdrop-blur p-3 object-cover w-full"
                        alt=""
                      />
                    </PhotoView>
                  </>
                ))}
              </PhotoProvider>
            </div>
          </div>
          {/* Gallery */}
          {home && (
            <div className="flex items-center justify-center mt-3 w-full">
              <Link
                to="/Gallery"
                className="flex backdrop-blur lg:backdrop-blur-none lg:bg-opacity-100 lg:text-black bg-blue-400 bg-opacity-10 btn px-10 text-white font-VarelaRound"
              >
                View All
                <svg
                  className="iconView"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PhotoALbum;
