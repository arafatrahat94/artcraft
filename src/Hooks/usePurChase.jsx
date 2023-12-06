import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "./useAuth";

const usePurChase = () => {
  const { user } = useAuth();
  const [isPaid, setisPaid] = useState(null);
  useEffect(() => {
    axios
      .get(
        `https://artogram-server.vercel.app/CheckPaid?email=${user?.email}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
          },
        }
      )
      .then((res) => {
        setisPaid(res.data);
        console.log(res.data);
      });
  }, [user]);

  return isPaid;
};

export default usePurChase;
