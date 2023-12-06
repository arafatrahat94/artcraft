import { useState } from "react";
import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Nav from "../Pages/Shared/Nav/Nav";
import Footer from "../Pages/Shared/Footer/Footer";
import bgImg from "../assets/bg.png";
import Spinner from "../Pages/Shared/Spinner/Spinner";

import svgw from "../assets/svfd.svg";

const Main = () => {
  const location = useLocation();

  const navigation = useNavigation();

  const signUp =
    location.pathname === "/SignUp" || location.pathname === "/Login";
  const [load, setLoad] = useState(true);

  if (navigation.state !== "loading") {
    setTimeout(() => {
      setLoad(false);
    }, 2000);
  }

  return (
    <div>
      {signUp || (
        <>
          <img
            className="fixed blur-[3px] lg:blur-[2px]  h-full top-0 pt-[1px] min-h-[110vh] pb-[1px] object-cover bg-no-repeat bg-center dark:bg-[#121212] bg-white -z-10  w-full "
            src={bgImg}
            alt=""
          />
        </>
      )}
      {load ? (
        <>
          <div className="min-h-screen flex justify-center items-center">
            <Spinner></Spinner>
          </div>
        </>
      ) : (
        <>
          <div className="">
            {signUp || <Nav></Nav>}
            <Outlet />
            {signUp || (
              <div>
                <Footer></Footer>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
