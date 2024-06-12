import React, { useState, useEffect } from 'react';

interface HeartButtonProps {
  albumTitle: string;
}

const HeartButton: React.FC<HeartButtonProps> = ({ albumTitle }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [animate, setAnimate] = useState<boolean>(false);

  // Cargar el estado desde localStorage al montar el componente
  useEffect(() => {
    const storedValue = localStorage.getItem(`liked-${albumTitle}`);
    if (storedValue !== null) {
      setLiked(JSON.parse(storedValue));
    }
  }, [albumTitle]);

  const handleToggle = () => {
    const newLikedState = !liked;
    setLiked(newLikedState);
    setAnimate(true);
    localStorage.setItem(`liked-${albumTitle}`, JSON.stringify(newLikedState));
  };

  return (
    <div
      className={`relative w-12 h-12 rounded-full transition-colors duration-300 border-2 ${
        liked ? 'bg-white border-black' : 'bg-black border-white'
      } flex justify-center items-center`}
      title="Like"
    >
      <input
        type="checkbox"
        checked={liked}
        onChange={handleToggle}
        className="absolute w-full h-full opacity-0 z-20 cursor-pointer"
      />
      <div className="w-8 h-8 flex justify-center items-center">
        <svg
          viewBox="0 0 24 24"
          className={`absolute w-6 h-6 ${
            liked ? 'hidden' : 'block'
          } fill-current text-heart-color`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          className={`absolute w-6 h-6 ${
            liked ? (animate ? 'block animate-svg-filled' : 'block') : 'hidden'
          } fill-current text-heart-color`}
          xmlns="http://www.w3.org/2000/svg"
          onAnimationEnd={() => setAnimate(false)}
        >
          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z" />
        </svg>
        <svg
          className={`absolute ${
            liked ? (animate ? 'block animate-svg-celebrate' : 'hidden') : 'hidden'
          } stroke-current text-heart-color fill-current stroke-2`}
          width="100"
          height="100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="10,10 20,20"></polygon>
          <polygon points="10,50 20,50"></polygon>
          <polygon points="20,80 30,70"></polygon>
          <polygon points="90,10 80,20"></polygon>
          <polygon points="90,50 80,50"></polygon>
          <polygon points="80,80 70,70"></polygon>
        </svg>
      </div>
    </div>
  );
};

export default HeartButton;
