import React, { useEffect, useRef, useState } from "react";
import Logo from "../../../components/common/Logo/Logo";
import SearchBar from "../../../components/common/SearchBar/SearchBar";
import ButtonEdit from "../../../components/common/ButtonEdit/ButtonEdit";

const NavBar: React.FC = () => {
  const [menuAbierto, setMenuAbierto] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    nombre: "",
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
      <div className="flex items-center justify-between text-white px-5 py-2 bg-[#121212] border-none">
        <div className="flex items-center">
          <a href="/">
            <Logo />
          </a>
        </div>
        <div className="flex items-center justify-center flex-1">
          <SearchBar />
        </div>
        <div className="flex items-center gap-14 pr-3">
          <a href="/">Descubrir</a>
          <a href="/">Playlists</a>
          <a href="/" className="bg-white text-black px-3 py-2 rounded-md">Subir Música</a>
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
            {menuAbierto && (
              <>
                <div className="fixed inset-0 z-20" onClick={toggleMenu}>
                  <div className="fixed inset-0 bg-black bg-opacity-50 mt-14 backdrop-blur-sm"></div>
                </div>
                <ul
                  className="absolute right-0 mt-2 w-96 bg-[#171717] border border-gray-700 rounded-md shadow-lg z-40 text-white perfil-menu"
                >
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
                  <li className="px-4 py-2 flex items-center">
                    <div className="flex flex-col flex-1">
                      <label className="text-white">Contraseña</label>
                      <div className="flex items-center">
                        <input
                          type="password"
                          name="contrasena"
                          placeholder="********"
                          value={formData.contrasena}
                          className="bg-[#27272A] border rounded p-2 text-white flex-1"
                          onChange={handleInputChange}
                        />
                        <ButtonEdit />
                      </div>
                    </div>
                  </li>
                  <li className="px-4 py-2 flex items-center">
                    <div className="flex flex-col flex-1">
                      <label className="text-white">Teléfono</label>
                      <div className="flex items-center">
                        <input
                          type="tel"
                          name="telefono"
                          placeholder="00-0000-0000"
                          value={formData.telefono}
                          className="bg-[#27272A] border rounded p-2 text-white flex-1"
                          onChange={handleInputChange}
                        />
                        <ButtonEdit />
                      </div>
                    </div>
                  </li>
                  <li className="px-4 py-2 flex items-center">
                    <div className="flex flex-col flex-1">
                      <label className="text-white">Fecha de Nacimiento</label>
                      <div className="flex items-center">
                        <input
                          type="text"
                          name="fechaNacimiento"
                          placeholder="00 ENE 0000"
                          value={formData.fechaNacimiento}
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