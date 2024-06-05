import React, { useEffect, useState } from "react";
import mainIMG from "../../../assets/img/mainIMG.png";

// const images: string[] = [
//   mainIMG,
//   "https://static.vecteezy.com/system/resources/previews/011/000/296/non_2x/abstract-music-soundwave-banner-design-free-vector.jpg",
//   "https://static.vecteezy.com/ti/vetor-gratis/p1/5004846-abstrato-som-onda-curva-fundo-ilustracao-com-ouro-e-particulas-azuis-criativo-colorido-equalizador-e-espectro-musica-para-banner-e-poster-vetor.jpg",
// ];

const Carousel: React.FC = () => {
  // const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [fade, setFade] = useState<boolean>(false);

  // const changeImage = (newIndex: number): void => {
  //   setFade(true);
  //   setTimeout(() => {
  //     setCurrentIndex(newIndex);
  //     setFade(false);
  //   }, 200); // Duration of the fade-out transition
  // };

  // const goToPrevious = (): void => {
  //   const isFirstSlide = currentIndex === 0;
  //   const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
  //   changeImage(newIndex);
  // };

  // const goToNext = (): void => {
  //   const isLastSlide = currentIndex === images.length - 1;
  //   const newIndex = isLastSlide ? 0 : currentIndex + 1;
  //   changeImage(newIndex);
  // };

  // useEffect(() => {
  //   const interval = setInterval(goToNext, 5000);
  //   return () => clearInterval(interval);
  // }, [currentIndex]);

  return (
    <div className="relative w-full mx-auto my-10">
      <div
        className={`overflow-hidden rounded-lg shadow-lg ${
          fade
            ? "opacity-70 transition-opacity duration-500"
            : "opacity-100 transition-opacity duration-500"
        }`}
      >
        <img src={mainIMG} alt="Carousel slide" className="w-full " />
      </div>
      {/* <button
        onClick={goToPrevious}
        className="absolute top-1/2 h-full left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-l-xl"
      >
        &#10094;
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 h-full right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-r-xl"
      >
        &#10095;
      </button> */}
    </div>
  );
};

export default Carousel;
