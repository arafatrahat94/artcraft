import Banner from "../Banner/Banner";
import BestCourse from "../BestCourse/BestCourse";
import Join from "../Join/Join";
import OurBestTeacher from "../OurBestTeacher/OurBestTeacher";
import Support from "../Supports/Support";
import WhyChoseUs from "../WhyChoseUs/WhyChoseUs";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Support></Support>
      <WhyChoseUs></WhyChoseUs>
      <OurBestTeacher></OurBestTeacher>
      <Join></Join>
      <BestCourse></BestCourse>
    </div>
  );
};

export default Home;
