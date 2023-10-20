import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import SignUp from "../Pages/LoginAndSignUp/SignUp";
import Login from "../Pages/LoginAndSignUp/Login";
import AddClasses from "../Pages/AddClasses/AddClasses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "SignUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "Login",
        element: <Login></Login>,
      },
      {
        path: "AddClasses",
        element: <AddClasses></AddClasses>,
      },
    ],
  },
]);

export default router;
