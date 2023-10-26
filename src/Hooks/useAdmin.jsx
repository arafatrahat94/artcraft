import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useAdmin = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(null);
  useEffect(() => {
    axios
      .get(
        `https://artogram-server.vercel.app/ChecKAdmin?email=${user?.email}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
          },
        }
      )
      .then((res) => {
        setIsAdmin(res.data);
      });
  }, [user]);

  return isAdmin;
};

export default useAdmin;
