import React, { useEffect, useRef, useState } from "react";
import Logo from "../../../components/common/Logo/Logo";

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (menuOpen && !isHovering) {
      timer = setTimeout(() => {
        setMenuOpen(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [menuOpen, isHovering]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex items-center justify-between text-white px-5 py-2 bg-[#121212] border-none">
      <div className="sm:block hidden">
        <a href="/">
          <Logo />
        </a>
      </div>
      <div>
        <ul className="flex gap-5">
          <li>
            <a href="/">Explorar</a>
          </li>
          <li>
            <a href="">Sube tu música</a>
          </li>
          <li>
            <a href="">Tendencias</a>
          </li>
        </ul>
      </div>
      <div className="relative" ref={menuRef}>
        <button
          onClick={toggleMenu}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200"
        >
          <img
            className="w-10 rounded-full"
            src="https://static.vecteezy.com/system/resources/previews/002/275/847/non_2x/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg"
            alt=""
          />
        </button>
        {menuOpen && (
          <ul
            className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <a href="">Perfil</a>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <a href="">Mi Música</a>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <a href="">Opciones</a>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default NavBar;
