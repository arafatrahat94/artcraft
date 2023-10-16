import water from "../../../assets/category/water.png";
import acrylic from "../../../assets/category/acrylic.png";
import threed from "../../../assets/category/3d.png";
const Categories = () => {
  return (
    <div id="Category" className="my-32">
      <h1 className="text-5xl font-KaushanScript theme-text text-center">
        Categories
      </h1>
      <div className="theme-color1 h-[2px] mx-auto opacity-25 mt-7 w-5/12"></div>
      <div className="grid grid-cols-3 mt-10 w-10/12 mx-auto">
        <div className="w-[250px] relative bg-black rounded-[3.5rem]">
          <img
            className="w-full h-full object-cover rounded-[3.5rem] opacity-40"
            src={water}
            alt=""
          />
          <h1 className="bottom-6 left-6 theme-text text-3xl font-KaushanScript absolute">
            Water Painting
          </h1>
        </div>
        <div className="w-[250px] relative bg-black rounded-[3.5rem]">
          <img
            className="w-full h-full object-cover rounded-[3.5rem] opacity-60"
            src={acrylic}
            alt=""
          />
          <h1 className="bottom-6 left-6 theme-text text-3xl font-KaushanScript absolute">
            Acrylic Painting
          </h1>
        </div>
        <div className="w-[250px] relative bg-black rounded-[3.5rem]">
          <img
            className="w-full h-full object-cover rounded-[3.5rem] opacity-60"
            src={threed}
            alt=""
          />
          <h1 className="bottom-6 left-6 theme-text text-3xl font-KaushanScript absolute">
            3D Painting
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Categories;
