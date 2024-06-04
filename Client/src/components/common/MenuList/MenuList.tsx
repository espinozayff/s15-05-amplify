import React from "react";
import { MenuProps } from "./MenuList.types";
import { Link } from "react-router-dom";

const MenuList: React.FC<MenuProps> = ({ menus }) => {
  return (
    <div className="flex flex-col justify-start">
      {menus.map((menu) => (
        <div key={menu.id}>
          <div className="my-4 ml-3 list-none">
            <div className="text-white font-bold text-lg">{menu.title}</div>
            <ul className="pl-3">
              {menu.submenus.map((submenu) => (
                <li key={submenu.id} className="p-2">
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
          </div>
          <div className="border border-b border-solid border-[#ffffff1a]"></div>
        </div>
      ))}
    </div>
  );
};

export default MenuList;
