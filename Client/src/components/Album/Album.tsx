import { useLocation } from "react-router-dom";
import Sidebar from "components/Layout/Sidebar";
import playIcon from "../../assets/img/playIcon.svg";
import heartIcon from "../../assets/img/Heart Filled.svg";
import CommentSection from "components/common/CommentSection";
import OptionSelect from "components/common/OptionSelect";
import { useState } from "react";
import Button from "components/common/Button/Button";

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: "top", label: "Top Comentarios" },
  { value: "new", label: "Más Reciente" },
  { value: "ancient", label: "Más Antiguo" },
];

export default function Album() {
  const location = useLocation();
  const { title, author, image } = location.state;

  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <div className="container relative mx-auto">
      <div className="w-full relative h-[197px] overflow-hidden">
        <div className="absolute inset-0 bg-[#9D174D] mix-blend-multiply"></div>
        <img className="object-cover w-full" src={image} alt={title} />
      </div>
      <div className="absolute top-0 hidden md:w-1/4 lg:block">
        <img className="w-full" src={image} alt={title} />
        <div className="w-full h-full bg-black pb-20">
          <Sidebar />
        </div>
      </div>
      <div className="lg:w-8/12 text-white lg:ml-auto min-h-screen">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-bold">{title}</h2>
            <p className="text-[#BDBDBD] font-bold text-2xl mb-2">{author}</p>
          </div>
          <div className="flex gap-5">
            <button className="text-xl flex justify-center items-center w-12 h-12 border border-white bg-black rounded-full">
              <img className="" src={heartIcon} alt="Heart icon" />
            </button>
            <button className="text-xl flex justify-center items-center w-12 h-12 border border-white bg-[#9D174D] rounded-full">
              <img className="ml-1" src={playIcon} alt="Play icon" />
            </button>
          </div>
          <hr className="border-[#333]" />
        </div>

        <div className="mt-4">
          {["TEMA 1", "TEMA 2", "TEMA 3"].map((tema, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b border-[#333] py-2"
            >
              <div className="flex items-center">
                <button className="text-xl w-9 h-9 flex pb-1 justify-center items-center border border-white rounded-full">
                  +
                </button>
                <span className="ml-4">{tema}</span>
              </div>
              <button className="text-xl flex justify-center items-center w-9 h-9 border border-white bg-black rounded-full">
                <img className="ml-1" src={playIcon} alt="Play icon" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Comentarios</h1>
            <div className="w-44">
              <OptionSelect options={options} onChange={handleSelectChange} />
            </div>
          </div>
          <div className="flex items-center justify-between mb-4 w-full">
            <div className="flex w-full pr-2">
              <div className="flex mr-2">
                <div
                  className="w-12 h-12 rounded-full overflow-hidden
                 bg-gray-200 border-2 border-b-gray-300 flex items-center justify-center"
                >
                  <img
                    className="w-full h-full object-cover rounded-full"
                    src="https://static.vecteezy.com/system/resources/previews/002/275/847/non_2x/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg"
                    alt="Profile Fernando"
                  />
                </div>
              </div>
              <input
                type="text"
                placeholder="¡Dile al artista lo que piensas!"
                className="w-full bg-transparent text-white border
                 border-gray-300 rounded-md py-2 px-3 leading-tight 
                 focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
            </div>
            <Button variant="secondary">Comentar</Button>
          </div>

          <CommentSection />
        </div>
      </div>
    </div>
  );
}
