import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import { useContext } from "react";
import { AuthCOntext } from "../Provider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthCOntext);
  console.log(user);
  if (loading) {
    return (
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
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/Login" state={{ from: location }} replace={true} />;
};

export default PrivateRoute;
