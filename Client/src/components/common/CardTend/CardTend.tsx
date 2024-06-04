import punkIMG from "../../../assets/img/punkmylife.png";
import playIcon from "../../../assets/img/playIcon.svg";
import { TrendData } from "../../Trends/Trends.types";

export default function CardTend({ genre, title, author }: TrendData) {
  return (
    <div className="flex-grow max-w-[250px] min-w-[150px] w-[calc(20%-1rem)] m-1">
      <div className="relative border-none ">
        <img className=" " src={punkIMG} alt="" />
        <div className="absolute top-3 right-3 bg-white py-1 px-3 rounded-full">
          <p>{genre}</p>
        </div>
        <div className="absolute bottom-3 cursor-pointer flex justify-center items-center right-4 bg-black border-2 border-white w-12 h-12 rounded-full">
          <img className="ml-1" src={playIcon} alt="" />
        </div>
      </div>
      <div>
        <p className="font-bold mt-2 ml-3 text-white max-w-[150px]">{title}</p>
        <p className="font-bold text-[#BDBDBD] ml-3">{author}</p>
      </div>
    </div>
  );
}
