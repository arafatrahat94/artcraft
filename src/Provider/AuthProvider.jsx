import React, { createContext, useState } from "react";
import app from "../Firebase/Firebase.config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
} from "firebase/auth";

const auth = getAuth(app);
export const AuthCOntext = createContext(null);
const AuthProvider = ({ children }) => {
  // states
  const [user, setUser] = useState([]);
  const [loading, setloading] = useState(true);
  // new user
  const createN = (email, pass) => {
    setloading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };
  const glogin = () => {
    setloading(true);
    return signInWithPopup(auth, new GoogleAuthProvider());
  };
  //   authData
  const authData = {
    user,
    glogin,
    createN,
  };

  return (
    <AuthCOntext.Provider value={authData}>{children}</AuthCOntext.Provider>
  );
};

export default AuthProvider;
