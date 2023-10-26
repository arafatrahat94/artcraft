import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import SignUp from "../Pages/LoginAndSignUp/SignUp";
import Login from "../Pages/LoginAndSignUp/Login";
import AddClasses from "../Pages/AddClasses/AddClasses";
import AllTeachers from "../Pages/Allteachers/AllTeachers";
import AllCourses from "../Pages/AllCourses/AllCourses";
import WaterPainting from "../Pages/Category/WaterPainting";
import DashBoard from "../Layout/DashBoard";
import Cart from "../Pages/Cart/Cart";
import Payment from "../Pages/Payment/Payment";
import AllUsers from "../Pages/Admin/AllUsers/AllUsers";
import PrivateRoute from "./PrivateRoute";
import ManageCourses from "../Pages/Admin/ManageCourses/ManageCourses";
import DeclinedCourse from "../Pages/DeclinedCourse/DeclinedCourse";

import Transactions from "../Pages/Transactions/Transactions";
import EnrolledCourse from "../Pages/EnrolledCourse/EnrolledCourse";
import Favorite from "../Pages/Favorite/Favorite";

import Error from "../Pages/Shared/Error.jsx/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
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
      {
        path: "AllTeachers",
        element: (
          <PrivateRoute>
            <AllTeachers></AllTeachers>
          </PrivateRoute>
        ),
      },
      {
        path: "AllCourses",
        element: (
          <PrivateRoute>
            <AllCourses></AllCourses>
          </PrivateRoute>
        ),
      },
      {
        path: "Category/:id",
        element: (
          <PrivateRoute>
            <WaterPainting></WaterPainting>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://artogram-server.vercel.app/courseCategory/${params.id}`
          ),
      },
    ],
  },
  {
    path: "DashBoard",
    element: <DashBoard></DashBoard>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "CourseCart",
        element: (
          <PrivateRoute>
            <Cart></Cart>
          </PrivateRoute>
        ),
      },
      {
        path: "Transactions",
        element: (
          <PrivateRoute>
            <Transactions></Transactions>
          </PrivateRoute>
        ),
      },
      {
        path: "Payment",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: "EnrolledCourse",
        element: (
          <PrivateRoute>
            <EnrolledCourse></EnrolledCourse>
          </PrivateRoute>
        ),
      },
      {
        path: "Favorites",
        element: (
          <PrivateRoute>
            <Favorite></Favorite>
          </PrivateRoute>
        ),
      },
      {
        path: "AllUsers",
        element: (
          <PrivateRoute>
            <AllUsers></AllUsers>
          </PrivateRoute>
        ),
      },
      {
        path: "ManageCourses",
        element: (
          <PrivateRoute>
            <ManageCourses></ManageCourses>
          </PrivateRoute>
        ),
      },
      {
        path: "AddClasses",
        element: (
          <PrivateRoute>
            <AddClasses></AddClasses>
          </PrivateRoute>
        ),
      },
      {
        path: "ManageCourse",
        element: (
          <PrivateRoute>
            <DeclinedCourse></DeclinedCourse>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
