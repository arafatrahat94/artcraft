import { useContext } from "react";
import { AuthCOntext } from "../Provider/AuthProvider";

const useAuth = () => {
  const auth = useContext(AuthCOntext);
  return auth;
};

export default useAuth;
