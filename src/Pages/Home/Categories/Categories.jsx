import water from "../../../assets/category/water.png";
import acrylic from "../../../assets/category/acrylic.png";
import threed from "../../../assets/category/3d.png";
const Categories = () => {
  return (
    <div id="Category" className="lg:my-32 my-20">
      <h1 className="lg:text-5xl text-4xl font-KaushanScript theme-text text-center">
        Categories
      </h1>
      <div className="theme-color1 h-[2px] mx-auto opacity-25 lg:mt-7 mt-3 w-5/12"></div>
      <div className="grid gap-x-3 gap-y-3 justify-center items-center grid-cols-3 mt-10 w-10/12 mx-auto">
        <div className="lg:w-[250px] hover:ring hover:scale-105 ring-red-500 transform duration-300 h-[250px] relative bg-black rounded-[3.5rem]">
          <img
            className="w-full h-full object-cover rounded-[3.5rem] opacity-40"
            src={water}
            alt=""
          />
          <h1 className="lg:bottom-6 bottom-24 w-[190px] -left-[65px] lg:rotate-0 lg:left-6 theme-text text-3xl rotate-90  font-KaushanScript absolute">
            Water Painting
          </h1>
        </div>
        <div className="lg:w-[250px] hover:ring hover:scale-105 ring-red-500 transform duration-300 h-[250px] relative bg-black rounded-[3.5rem]">
          <img
            className="w-full h-full object-cover rounded-[3.5rem] opacity-60"
            src={acrylic}
            alt=""
          />
          <h1 className="lg:bottom-6 bottom-24 w-[200px] -left-[65px] lg:rotate-0 lg:left-6 theme-text text-3xl rotate-90  font-KaushanScript absolute">
            Acrylic Painting
          </h1>
        </div>
        <div className="lg:w-[250px] hover:ring hover:scale-105 ring-red-500 transform duration-300 h-[250px] relative bg-black rounded-[3.5rem]">
          <img
            className="w-full h-full object-cover rounded-[3.5rem] opacity-60"
            src={threed}
            alt=""
          />
          <h1 className="lg:bottom-6 bottom-24 w-[160px] -left-12 lg:rotate-0 lg:left-6 theme-text text-3xl rotate-90  font-KaushanScript absolute">
            3D Painting
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Categories;
