import { JSX } from "react";
import Sidebar from "../Layout/Sidebar";
import TrendingGenres from "../common/TrendingGenres";
import Trends from "../Trends";
import Carousel from "../common/Carrousel";

function Feed(): JSX.Element {
  return (
    <div className="container mx-auto flex flex-col bg-[#121212] px-0">
      {/* Carousel */}
      <Carousel />

      <div className="flex md:p-0 md:pr-2 p-2  md:gap-2 ">
        <div className="lg:w-1/5 w-0">
          <Sidebar />
        </div>
        {/* Tendencias */}
        <div className="w-full lg:w-4/5">
          <Trends />
        </div>
      </div>
      {/** Top Géneros*/}
      <TrendingGenres />
    </div>
  );
}

export default Feed;
