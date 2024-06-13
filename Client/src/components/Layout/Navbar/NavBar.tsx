import React, { useEffect, useRef, useState } from "react";
import Logo from "../../../components/common/Logo/Logo";
import SearchBar from "../../../components/common/SearchBar/SearchBar";
import ButtonEdit from "../../../components/common/ButtonEdit/ButtonEdit";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  const [menuAbierto, setMenuAbierto] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    nombre: "User1", // Default name for demonstration
    apellido: "",
    numeroIdentidad: "",
    correo: "",
    contrasena: "",
    telefono: "",
    fechaNacimiento: "",
  });

  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickFuera = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuAbierto(false);
    }
  };

  useEffect(() => {
    if (menuAbierto) {
      document.addEventListener("mousedown", handleClickFuera);
      document.body.classList.add("overflow-hidden");
    } else {
      document.removeEventListener("mousedown", handleClickFuera);
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.removeEventListener("mousedown", handleClickFuera);
      document.body.classList.remove("overflow-hidden");
    };
  }, [menuAbierto]);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between text-white xl:px-5 px-2 py-2 bg-[#121212] border-none">
        <div className="flex items-center">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="flex items-center justify-center flex-1 relative">
          <SearchBar />
        </div>
        <div className="flex items-center gap-14 pr-3">
          <Link to="/" className="hidden lg:block">
            Descubrir
          </Link>
          <Link to="/" className="hidden lg:block">
            Playlists
          </Link>
          <Link
            to="/"
            className="bg-white text-black px-3 py-2 rounded-md hidden lg:block whitespace-nowrap"
          >
            Subir Música
          </Link>
          <div className="relative flex items-center gap-4" ref={menuRef}>
            <button
              onClick={toggleMenu}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200"
            >
              <img
                className="w-10 rounded-full"
                src="https://static.vecteezy.com/system/resources/previews/002/275/847/non_2x/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg"
                alt="Profile"
              />
            </button>
            <div className="flex flex-col text-white text-right">
              <p className="text-gray-400">Hola,</p>
              <span>Fernando</span>
            </div>
            {menuAbierto && (
              <>
                <div className="fixed inset-0 z-20 " onClick={toggleMenu}>
                  <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm mt-14"></div>
                </div>
                <ul className="absolute right-0 mt-[427px] w-96  bg-[#171717] border border-gray-700 rounded-md shadow-lg z-40 text-white perfil-menu">
                  <li className="px-4 py-2 flex items-center">
                    <div className="flex flex-col flex-1">
                      <h2 className="text-2xl mb-4">Perfil</h2>
                      <label className="text-white">Nombre</label>
                      <div className="flex items-center">
                        <input
                          type="text"
                          name="nombre"
                          placeholder="Tu Nombre"
                          value={formData.nombre}
                          className="bg-[#27272A] border rounded p-2 text-white flex-1"
                          onChange={handleInputChange}
                        />
                        <ButtonEdit />
                      </div>
                    </div>
                  </li>
                  <li className="px-4 py-2 flex items-center">
                    <div className="flex flex-col flex-1">
                      <label className="text-white">Apellido</label>
                      <div className="flex items-center">
                        <input
                          type="text"
                          name="apellido"
                          placeholder="Tu Apellido"
                          value={formData.apellido}
                          className="bg-[#27272A] border rounded p-2 text-white flex-1"
                          onChange={handleInputChange}
                        />
                        <ButtonEdit />
                      </div>
                    </div>
                  </li>
                  <li className="px-4 py-2 flex items-center">
                    <div className="flex flex-col flex-1">
                      <label className="text-white">Número de Identidad</label>
                      <div className="flex items-center">
                        <input
                          type="text"
                          name="numeroIdentidad"
                          placeholder="00.000.000"
                          value={formData.numeroIdentidad}
                          className="bg-[#27272A] border rounded p-2 text-white flex-1"
                          onChange={handleInputChange}
                        />
                        <ButtonEdit />
                      </div>
                    </div>
                  </li>
                  <li className="px-4 py-2 flex items-center">
                    <div className="flex flex-col flex-1">
                      <label className="text-white">Correo Electrónico</label>
                      <div className="flex items-center">
                        <input
                          type="email"
                          name="correo"
                          placeholder="correo@mail.com"
                          value={formData.correo}
                          className="bg-[#27272A] border rounded p-2 text-white flex-1"
                          onChange={handleInputChange}
                        />
                        <ButtonEdit />
                      </div>
                    </div>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
