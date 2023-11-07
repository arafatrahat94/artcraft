import { Helmet } from "react-helmet-async";
import ScrolltoTop from "../../Shared/ScroolltoTop/Scrolltotop";
import Banner from "../Banner/Banner";
import BestCourse from "../BestCourse/BestCourse";
import Categories from "../Categories/Categories";

import OurBestTeacher from "../OurBestTeacher/OurBestTeacher";
import Support from "../Supports/Support";

import WhyChoseUs from "../WhyChoseUs/WhyChoseUs";
import Join from "../Join/Join";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Home | ARTOGRAM</title>
      </Helmet>
      <Banner></Banner>

      <ScrolltoTop></ScrolltoTop>
      <ScrolltoTop></ScrolltoTop>
      <Support></Support>

      <WhyChoseUs></WhyChoseUs>
      <OurBestTeacher></OurBestTeacher>
      <Join></Join>
      <BestCourse></BestCourse>
      <Categories></Categories>

      {/* <WhatourCLientSay></WhatourCLientSay> */}
    </div>
  );
};

export default Home;
