import React from "react";

const SoundWaves: React.FC = () => {
  const lines = Array.from({ length: 10 });

  return (
    <div className="flex justify-between items-end w-20 h-3 bg-transparent mx-5">
      {lines.map((_, index) => (
        <div
          key={index}
          className="w-[2px] animate-heartbeat"
          style={{
            background: "linear-gradient(to top, #FF5733, #C70039)",
            animationDelay: `${index * 0.1}s`,
            height: "100%",
          }}
        ></div>
      ))}
    </div>
  );
};

export default SoundWaves;
