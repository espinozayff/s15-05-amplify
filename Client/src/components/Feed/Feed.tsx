import { JSX } from "react";
import Sidebar from "../Layout/Sidebar";
import TrendingGenres from "../common/TrendingGenres";

function Feed(): JSX.Element {
  return (
    <div className="container mx-auto flex flex-col bg-[#121212] px-0">
      {/** Carousel */}

      <div className="flex">
        <Sidebar />
        <div className="flex flex-col">{/** Tendencias */}</div>
      </div>
      {/** Top Géneros */}
      <TrendingGenres />
    </div>
  );
}

export default Feed;
