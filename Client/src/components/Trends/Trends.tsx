import CardTend from "../common/CardTend";

import { TrendData } from "./Trends.types";

export default function Trends() {
  const data: TrendData[] = [
    {
      genre: "Punk Rock",
      title: "Punk my life",
      author: "Mixamino",
    },
    {
      genre: "Punk Rock",
      title: "COUNTY’S BRAVE OLD MEN",
      author: "Buck Rogers",
    },
    {
      genre: "Punk Rock",
      title: "TI PREGO",
      author: "Valeria Massa",
    },
    {
      genre: "Punk Rock",
      title: "OHIYO!",
      author: "Kimo Kawamura",
    },
    {
      genre: "Punk Rock",
      title: "IT WAS LOVE",
      author: "Amanpour",
    },
  ];

  return (
    <>
      <div className="flex justify-between items-baseline">
        <h3 className="font-medium text-4xl text-[#666666] mb-2">Tendencias</h3>
        <p className="font-normal text-white cursor-pointer ">
          <a href="">Ver Todo</a>
        </p>
      </div>
      <div className=" gap-1 hidden md:flex">
        {data.slice(0, 5).map((item, index) => (
          <CardTend key={index} genre={item.genre} title={item.title} author={item.author} />
        ))}
      </div>
      <div className="flex gap-1 md:hidden overflow-x-scroll">
        {data.map((item, index) => (
          <CardTend key={index} genre={item.genre} title={item.title} author={item.author} />
        ))}
      </div>
    </>
  );
}
