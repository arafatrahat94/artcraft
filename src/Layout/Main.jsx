import React, { useState } from "react";
import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Nav from "../Pages/Shared/Nav/Nav";
import Footer from "../Pages/Shared/Footer/Footer";
import { Circles } from "react-loader-spinner";

const Main = () => {
  const location = useLocation();

  const navigation = useNavigation();

  const signUp =
    location.pathname === "/SignUp" || location.pathname === "/Login";

  return (
    <div>
      {signUp || <Nav></Nav>}
      {navigation.state === "loading" ? (
        <>
          <div className="min-h-screen flex justify-center items-center">
            <Circles
              height="80"
              width="80"
              method="dialog"
              color="#D81B60"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        </>
      ) : (
        <>
          <Outlet />
        </>
      )}
      {signUp || <Footer></Footer>}
    </div>
  );
};

export default Main;
