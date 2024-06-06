import mainIMG from "../../../assets/img/mainIMG.png";

const Carousel: React.FC = () => {
  return (
    <div className="relative w-full text-center mx-auto mb-10">
      <div className="absolute inset-0 bg-[#9D174D] mix-blend-multiply"></div>
      <img src={mainIMG} alt="Carousel slide" className="w-full " />
      <div className="absolute  flex justify-center items-center flex-col  inset-0 mix-blend-normal">
        <h3 className="font-normal text-white md:text-7xl text-4xl">Amplify yourself</h3>
        <div className="flex justify-center gap-2 items-center mt-5">
          {/* Boton Inicio sesion */}
          <button className="text-white border rounded py-2 px-5">Descubir</button>
          {/* Boton Registrarse */}
          <button className="text-black bg-white rounded py-2 px-5">Subir Musica</button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
