import Banner from "../Banner/Banner";
import BestCourse from "../BestCourse/BestCourse";
import Categories from "../Categories/Categories";
import Join from "../Join/Join";
import OurBestTeacher from "../OurBestTeacher/OurBestTeacher";
import Support from "../Supports/Support";
import WhyChoseUs from "../WhyChoseUs/WhyChoseUs";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Banner></Banner>
      <Support></Support>
      <WhyChoseUs></WhyChoseUs>
      <OurBestTeacher></OurBestTeacher>
      <Join></Join>
      <BestCourse></BestCourse>
      <Categories></Categories>
    </div>
  );
};

export default Home;
