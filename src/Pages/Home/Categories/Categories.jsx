import water from "../../../assets/category/water.png";
import acrylic from "../../../assets/category/acrylic.png";
import threed from "../../../assets/category/3d.png";
import { Link, useNavigate } from "react-router-dom";
import Title from "../../Shared/title/title";
import "./Categories.css";
const Categories = () => {
  const navigate = useNavigate();
  const goToWater = () => {
    setTimeout(() => {
      navigate(`/Category/${"Water"}`);
    }, 200);
  };
  const goToacrylic = () => {
    setTimeout(() => {
      navigate(`/Category/${"Acrylic"}`);
    }, 200);
  };
  const goToThree = () => {
    setTimeout(() => {
      navigate(`/Category/${"3D"}`);
    }, 200);
  };
  return (
    <div id="Category" className="lg:my-32 my-20">
      <Title>{"Categories"}</Title>

      <div>
        <div className="cardCategory">
          <p onClick={goToWater} className="">
            <img
              className="w-full h-full object-cover  opacity-40 "
              src={water}
              alt=""
            />
            <span className=" font-semibold font-RussoOne w-[190px] textCategory text-blue-300 text-xl rotate-90   absolute">
              Water Painting
            </span>
          </p>
          <p onClick={goToacrylic}>
            <img
              className="w-full h-full object-cover  opacity-40 "
              src={acrylic}
              alt=""
            />
            <span className="">acrylic Painting</span>
          </p>
          <p onClick={goToThree}>
            <img
              className="w-full h-full object-cover  opacity-40 "
              src={threed}
              alt=""
            />
            <span>3d ART</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Categories;
