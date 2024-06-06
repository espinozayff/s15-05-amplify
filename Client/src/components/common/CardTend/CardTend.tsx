import playIcon from "../../../assets/img/playIcon.svg";
import { TrendData } from "../../Trends/Trends.types";

export default function CardTend({ genre, title, author, image }: TrendData) {
  return (
    <div className="flex-grow max-w-[250px] min-w-[150px] w-[calc(20%-1rem)] m-1">
      <div className="relative border-none group">
        <img className=" " src={image} alt="" />
        <div className="absolute top-3 right-3 bg-white py-1 px-3 rounded-full">
          <p>{genre}</p>
        </div>
        <div className="absolute bottom-3 right-4 w-12 h-12 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out flex justify-center items-center cursor-pointer bg-black border-2 border-white">
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
