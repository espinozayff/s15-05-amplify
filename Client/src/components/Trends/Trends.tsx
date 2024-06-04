import CardTend from "../common/CardTend";
import punk from "../../assets/img/punkmylife.png";
import brave from "../../assets/img/braveoldmen.png";
import prego from "../../assets/img/tiprego.png";
import ohiyo from "../../assets/img/ohiyo.png";
import mylove from "../../assets/img/itwasmylove.png";
import { TrendData } from "./Trends.types";

export default function Trends() {
  const data: TrendData[] = [
    {
      genre: "Punk Rock",
      title: "Punk my life",
      author: "Mixamino",
      image: punk,
    },
    {
      genre: "Punk Rock",
      title: "COUNTY’S BRAVE OLD MEN",
      author: "Buck Rogers",
      image: brave,
    },
    {
      genre: "Punk Rock",
      title: "TI PREGO",
      author: "Valeria Massa",
      image: prego,
    },
    {
      genre: "Punk Rock",
      title: "OHIYO!",
      author: "Kimo Kawamura",
      image: ohiyo,
    },
    {
      genre: "Punk Rock",
      title: "IT WAS LOVE",
      author: "Amanpour",
      image: mylove,
    },
  ];

  return (
    <div className="flex-col">
      <div className="flex justify-between items-baseline">
        <h3 className="font-medium text-4xl text-[#666666] mb-2">Tendencias</h3>
        <p className="font-normal text-white cursor-pointer ">
          <a href="">Ver Todo</a>
        </p>
      </div>
      <div className=" gap-1 hidden md:flex">
        {data.slice(0, 5).map((item, index) => (
          <CardTend
            key={index}
            genre={item.genre}
            title={item.title}
            author={item.author}
            image={item.image}
          />
        ))}
      </div>
      <div className="flex gap-1 md:hidden overflow-x-scroll">
        {data.map((item, index) => (
          <CardTend
            key={index}
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
