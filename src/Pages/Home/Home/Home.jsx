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
import PhotoALbum from "../ReactPhotoAlbum/PhotoALbum";
import usePurChase from "../../../Hooks/usePurChase";
import Resize from "../Resize/Resize";
import SpinnerAnother from "../../Shared/SpinnerAnother/SpinnerAnother";
import WhatAre from "../../WhatAreYouGetting/WhatAre";

import Rating2 from "../Rating/Rating";

const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  const isPurchase = usePurChase();
  console.log(isPurchase);
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Home | ARTOGRAM</title>
      </Helmet>
      <Banner></Banner>

      <ScrolltoTop></ScrolltoTop>
      {/* <ScrolltoTop></ScrolltoTop> */}
      <Support></Support>
      <BestCourse></BestCourse>
      <WhyChoseUs></WhyChoseUs>
      <OurBestTeacher></OurBestTeacher>
      <Join></Join>

      <Categories></Categories>
      <PhotoALbum></PhotoALbum>
      <WhatAre></WhatAre>
      {/* <WhatourCLientSay></WhatourCLientSay> */}
      <Rating2></Rating2>
    </div>
  );
};

export default Home;
