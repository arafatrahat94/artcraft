import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import useAdmin from "../Hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const isAdmin = useAdmin();

  const { user, loading } = useAuth();
  if (loading) {
    return (
      <>
        <div className="min-h-screen justify-center items-center flex">
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
    );
  }
  if (user.profiletype === "admin" && isAdmin === true) {
    return children;
  } else if (user.profiletype !== "admin" && isAdmin === false) {
    return (
      <Navigate
        to="/Login"
        state={{ from: location }}
        replace={true}
      ></Navigate>
    );
  }
};

export default AdminRoute;
