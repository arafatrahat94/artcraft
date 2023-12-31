import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { Circles } from "react-loader-spinner";

import useTeacher from "../Hooks/useTeacher";

const TeacherRoute = ({ children }) => {
  const location = useLocation();
  const isTecher = useTeacher();

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
  if (user.profiletype === "teacher" && isTecher === true) {
    return children;
  }
  if (user) {
    if (user?.profiletype === "teacher") {
      return children;
    } else if (user.profiletype === "admin" || user.profiletype === "student") {
      return <Navigate to="/"></Navigate>;
    }
  }
};

export default TeacherRoute;
