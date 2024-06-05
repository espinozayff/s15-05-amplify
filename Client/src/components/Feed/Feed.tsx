import { JSX, useState } from "react";
import LoginDialog from "../common/Auth/ingress/Ingress"; // Asegúrate de importar correctamente
import Register from "../common/Auth/register";

function Feed(): JSX.Element {
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);

  const openRegister = () => {
    setRegisterOpen(true);
    setLoginOpen(false);
  };

  const openLogin = () => {
    setRegisterOpen(false);
    setLoginOpen(true);
  };

  return (
    <div className="container mx-auto my-5">
      <div className="flex items-center justify-between w-52">
        <button className="bg-black py-2 px-3 text-white rounded-md" onClick={openLogin}>Iniciar sesion</button>
        <LoginDialog
          openLogin={isLoginOpen}
          onClose={() => setLoginOpen(false)}
          handleRegister={openRegister}
        />
        <button className="bg-white py-2 px-3 text-black rounded-md" onClick={openRegister}>Registro</button>
        <Register
          openLogin={isRegisterOpen}
          onClose={() => setRegisterOpen(false)}
          handleLogin={openLogin}
        />
      </div>
    </div>
  );
}

export default Feed;
