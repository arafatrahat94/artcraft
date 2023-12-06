import React, { useEffect, useState } from "react";
import Nav from "../Pages/Shared/Nav/Nav";
import { Link } from "react-scroll";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import useAuth from "../Hooks/useAuth";
import {
  NavLink,
  Navigate,
  Outlet,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import useAdmin from "../Hooks/useAdmin";
import useTeacher from "../Hooks/useTeacher";
import ScrolltoTop from "../Pages/Shared/ScroolltoTop/Scrolltotop";
import { Helmet } from "react-helmet-async";
import bgImg from "../assets/bg.png";
import ManageCourses from "../Pages/Admin/ManageCourses/ManageCourses";
import AllUsers from "../Pages/Admin/AllUsers/AllUsers";
import DeclinedCourse from "../Pages/DeclinedCourse/DeclinedCourse";
import Cart from "../Pages/Cart/Cart";
import Transactions from "../Pages/Transactions/Transactions";
import EnrolledCourse from "../Pages/EnrolledCourse/EnrolledCourse";
const DashBoard = () => {
  const { user, logOUT } = useAuth();
  const navigate = useNavigate();
  const isAdmin = useAdmin();

  const navigation = useNavigation();
  const [isloading, setLoading] = useState(true);
  setTimeout(() => {
    if (navigation.state !== "loading") {
      setLoading(false);
    }
  }, 2000);
  const isTeacher = useTeacher();
  return (
    <div className="flex flex-col gap-y-3">
      <img
        className="fixed blur-[3px] lg:blur-[2px]  h-full top-0 pt-[1px] pb-[1px] min-h-[110vh] object-cover bg-no-repeat bg-center dark:bg-[#121212] bg-white -z-10  w-full "
        src={bgImg}
        alt=""
      />
      {isloading === false ? (
        <>
          <Nav></Nav>
          <Helmet>
            <title>DashBoard | ARTOGRAM</title>
          </Helmet>
          <ScrolltoTop></ScrolltoTop>
          <ScrolltoTop></ScrolltoTop>
          {user ? (
            <>
              {isAdmin && (
                <>
                  <Tabs>
                    <TabList>
                      <Tab>Manage Courses</Tab>
                      <Tab>All Users</Tab>
                    </TabList>

                    <TabPanel className="w-full">
                      <ManageCourses></ManageCourses>
                    </TabPanel>
                    <TabPanel>
                      <AllUsers></AllUsers>
                    </TabPanel>
                  </Tabs>
                </>
              )}
            </>
          ) : (
            <></>
          )}
          {user ? (
            <>
              {isTeacher === true ? (
                <>
                  <DeclinedCourse></DeclinedCourse>
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
          {user?.profiletype === "student" && (
            <Tabs>
              <TabList>
                <Tab>CourseCart</Tab>
                <Tab>Transactions</Tab>
                <Tab>Purchased</Tab>
              </TabList>

              <TabPanel className="w-full">
                <Cart></Cart>
              </TabPanel>
              <TabPanel>
                <Transactions></Transactions>
              </TabPanel>
              <TabPanel>
                <EnrolledCourse></EnrolledCourse>
              </TabPanel>
            </Tabs>
          )}
        </>
      ) : (
        <>
          <div className="w-full min-h-[100vh] flex justify-center items-center z-50 bg-transparent">
            <div className="loader32"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashBoard;
