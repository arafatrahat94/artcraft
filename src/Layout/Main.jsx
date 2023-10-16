import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "../Pages/Shared/Nav/Nav";
import Footer from "../Pages/Shared/Footer/Footer";

const Main = () => {
  const location = useLocation();
  console.log(location);
  const signUp =
    location.pathname === "/SignUp" || location.pathname === "/Login";
  return (
    <div>
      {signUp || <Nav></Nav>}

      <Outlet></Outlet>
      {signUp || <Footer></Footer>}
    </div>
  );
};

export default Main;
