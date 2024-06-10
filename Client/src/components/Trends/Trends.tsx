
import CardTend from "../common/CardTend";
import punk from "../../assets/img/punkmylife.png";
import brave from "../../assets/img/braveoldmen.png";
import prego from "../../assets/img/tiprego.png";
import ohiyo from "../../assets/img/ohiyo.png";
import mylove from "../../assets/img/itwasmylove.png";
import rome from "../../assets/img/rome.png";
import hungover from "../../assets/img/hungover.png";
import maria from "../../assets/img/maria.png";
import { TrendData, ImageMap } from "./Trends.types";
import trendData from "../../data/trendsData.json";

const imageMap: ImageMap = {
  punk,
  brave,
  prego,
  ohiyo,
  mylove,
  rome,
  hungover,
  maria,
};

export default function Trends() {
  const data: TrendData[] = trendData.map((item: TrendData) => ({
    ...item,
    image: imageMap[item.image],
  }));

  return (
    <div className="flex-col bg-[#000000]">
      <div className="flex justify-between items-baseline">
        <h3 className="font-medium text-4xl text-[#666666] mb-2 ml-2">Tendencias</h3>
        <p className="font-normal text-white cursor-pointer">
          <a href="">Ver Todo</a>
        </p>
      </div>
      <div className="gap-1 hidden md:flex flex-wrap">
        {data.map((item) => (
          <CardTend
            id={item.id}
            genre={item.genre}
            title={item.title}
            author={item.author}
            image={item.image}
          />
        ))}
      </div>
      <div className="flex md:hidden overflow-x-scroll">
        {data.map((item) => (
          <CardTend
            id={item.id}
            genre={item.genre}
            title={item.title}
            author={item.author}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}
