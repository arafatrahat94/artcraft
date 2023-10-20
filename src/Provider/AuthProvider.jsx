import React, { createContext, useEffect, useState } from "react";
import app from "../Firebase/Firebase.config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import axios from "axios";

const auth = getAuth(app);
export const AuthCOntext = createContext(null);
const AuthProvider = ({ children }) => {
  // states
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(true);
  // new user
  const createN = (email, pass) => {
    setloading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };
  // user login with email and pass
  const logIn = (email, pass) => {
    setloading(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };
  const glogin = () => {
    setloading(true);
    return signInWithPopup(auth, new GoogleAuthProvider());
  };
  const logOUT = () => {
    return signOut(auth);
  };
  // onauth State CHanges
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (currentUser) => {
      setloading(false);
      console.log(currentUser);
      if (currentUser && currentUser.email) {
        const loggedUser = {
          email: currentUser.email,
        };
        console.log(loggedUser);
        axios
          .post("https://artogram-server.vercel.app/jwt", loggedUser)
          .then(function (response) {
            console.log(response.data);
            localStorage.setItem("ArtAccess", response.data);
          });

        setTimeout(() => {
          axios
            .get(
              `https://artogram-server.vercel.app/users?email=${currentUser.email}`
            )
            .then(function (response) {
              console.log(response.data);
              setUser(response.data);
            });
        }, 1000);
      } else {
        localStorage.removeItem("ArtAccess");
        setUser(null);
      }
    });

    return () => unSub();
  }, []);
  //   authData
  const authData = {
    user,
    glogin,
    createN,
    logIn,
    logOUT,
  };

  return (
    <AuthCOntext.Provider value={authData}>{children}</AuthCOntext.Provider>
  );
};

export default AuthProvider;
