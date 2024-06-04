import { JSX } from "react";
import Sidebar from "../Layout/Sidebar";
import TrendingGenres from "../common/TrendingGenres";

function Feed(): JSX.Element {
  return (
    <div className="container mx-auto flex flex-col bg-[#121212]">
      {/** Carousel */}

      <div className="flex">
        <Sidebar />
        <div className="flex flex-col">
          {/** Tendencias */}
          {/** Top Géneros */}
          <TrendingGenres />
        </div>
      </div>
    </div>
  );
}

export default Feed;
