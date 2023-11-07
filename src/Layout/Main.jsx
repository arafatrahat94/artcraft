import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Nav from "../Pages/Shared/Nav/Nav";
import Footer from "../Pages/Shared/Footer/Footer";
import { Circles } from "react-loader-spinner";
import Spinner from "../Pages/Shared/Spinner/Spinner";
import bgImg from "../assets/bgimage.png";
import bgImgLandscape from "../assets/bglandscape.png";
const Main = () => {
  const location = useLocation();

  const navigation = useNavigation();

  const signUp =
    location.pathname === "/SignUp" || location.pathname === "/Login";
  const [load, setLoad] = useState(true);

  if (navigation.state !== "loading") {
    setTimeout(() => {
      setLoad(false);
    }, 2000);
  }
  return (
    <div>
      {signUp || (
        <>
          <img className="fixed -z-40 lg:hidden -mt-1 " src={bgImg} alt="" />
          <img
            className="fixed hidden lg:block -z-40 opacity-80 w-full  -mt-1 "
            src={bgImgLandscape}
            alt=""
          />
        </>
      )}
      {load ? (
        <>
          <div className="min-h-screen flex justify-center items-center">
            <Spinner></Spinner>
          </div>
        </>
      ) : (
        <>
          {signUp || <Nav></Nav>}
          <Outlet />
          {signUp || <Footer></Footer>}
        </>
      )}
    </div>
  );
};

export default Main;
