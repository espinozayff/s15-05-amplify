import { JSX } from "react";
import TrendingData from "../../../data/trendingGenresData.json";
import { Link } from "react-router-dom";
import ImageCard from "../ImageCard";
import Title from "../Title";

function TrendingGenres(): JSX.Element {
  return (
    <div className="w-full my-5">
      <div className="flex justify-between items-end">
        <Title text="Top Géneros" type="secondary" as="h2" />
        <Link to={"/#"}>
          <button className="text-white">Ver todo</button>
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 w-full my-3 text-white">
        {TrendingData.map((image) => (
          <ImageCard key={image.id} src={image.src} alt={image.alt} href={image.href} />
        ))}
      </div>
    </div>
  );
}

export default TrendingGenres;
