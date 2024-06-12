import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import FilterList from "../FilterList";

const SearchBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setOpen(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-20 mx-2" ref={inputRef}>
      <input
        type="text"
        placeholder="Buscar"
        className="w-full px-3 py-2 pl-10 rounded-md bg-[#27272A]
         text-white xl:w-[400px] md:w-[300px]"
        onClick={handleClick}
        onChange={handleChange}
      />
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
      {open && <FilterList searchText={searchText} />}
    </div>
  );
};

export default SearchBar;
