import CardTend from "../common/CardTend";
import trendData from "../../data/amplifyDataBack.json";

export default function Trends() {
  const data = trendData.tracks.map((item) => ({
    id: item.track_id,
    genre: item.genre,
    title: item.title,
    author: item.author,
    image: item.cover_image,
    songs: item.songs,
  }));

  return (
    <div className="flex-col bg-[#000000]">
      <div className="flex justify-between items-baseline mx-3">
        <h3 className="font-medium text-4xl text-[#666666] mb-2 ml-2">Tendencias</h3>
        <p className="font-normal text-white cursor-pointer">
          <a href="">Ver Todo</a>
        </p>
      </div>
      <div className="gap-1 hidden md:flex flex-wrap">
        {data.map((item) => (
          <CardTend
            key={item.id}
            id={item.id}
            genre={item.genre}
            title={item.title}
            author={item.author}
            image={item.image}
            songs={item.songs}
          />
        ))}
      </div>
      <div className="flex md:hidden overflow-x-scroll">
        {data.map((item) => (
          <CardTend
            key={item.id}
            id={item.id}
            genre={item.genre}
            title={item.title}
            author={item.author}
            image={item.image}
            songs={item.songs}
          />
        ))}
      </div>
    </div>
  );
}
