import React from "react";
import { SelectProps } from "./OptionSelect.types";

const OptionSelect: React.FC<SelectProps> = ({ options, onChange }) => {
  return (
    <div className="relative inline-block w-full">
      <select
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full bg-[#09090B] text-white
         py-2 px-3 leading-tight focus:outline-none border-0"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-white bg-[#09090B]">
            {option.label}
          </option>
        ))}
      </select>
      <div
        className="pointer-events-none absolute inset-y-0 right-0 
      flex items-center px-2 text-white"
      >
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
};

export default OptionSelect;
