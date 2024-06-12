import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar: React.FC = () => {
  return (
    <div className="relative w-80">
      <input
        type="text"
        placeholder="Buscar"
        className="w-full px-3 py-2 pl-10 rounded-md bg-[#27272A] text-white"
        style={{ width: "400px" }}
      />
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
    </div>
  );
};

export default SearchBar;
