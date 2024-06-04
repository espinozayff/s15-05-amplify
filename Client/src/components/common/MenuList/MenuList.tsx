import React from "react";
import { MenuProps } from "./MenuList.types";
import { Link } from "react-router-dom";

const MenuList: React.FC<MenuProps> = ({ menus }) => {
  return (
    <ul className="flex flex-col justify-start">
      {menus.map((menu, index) => (
        <>
          <li key={index} className="my-4 ml-4">
            <div className="p-2 text-white font-bold text-lg">{menu.title}</div>
            <ul className="pl-4">
              {menu.submenus.map((submenu, subIndex) => (
                <li key={subIndex} className="p-2">
                  <Link
                    to={submenu.href}
                    className="hover:text-white hover:font-bold text-[#D4D4D8] 
              font-medium text-sm"
                  >
                    {submenu.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <div className="border border-b border-solid border-[#ffffff1a]"></div>
        </>
      ))}
    </ul>
  );
};

export default MenuList;
