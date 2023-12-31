import React, { useContext, useEffect } from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import useAdmin from "../Hooks/useAdmin";
import { AuthCOntext } from "../Provider/AuthProvider";

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const isAdmin = useAdmin();

  const { user, loading } = useContext(AuthCOntext);
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
  if (user) {
    if (user?.profiletype === "admin") {
      return children;
    } else if (
      user.profiletype === "teacher" ||
      user.profiletype === "student"
    ) {
      return <Navigate to="/"></Navigate>;
    }
  }
};

export default AdminRoute;
