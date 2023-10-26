import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useTeacher = () => {
  const { user } = useAuth();
  const [isTeacher, setIsTeacher] = useState(null);
  useEffect(() => {
    axios
      .get(
        `https://artogram-server.vercel.app/ChecKTeacher?email=${user?.email}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
          },
        }
      )
      .then((res) => {
        setIsTeacher(res.data);
      });
  }, [user]);

  return isTeacher;
};

export default useTeacher;
