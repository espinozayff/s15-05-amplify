import React from "react";
import { Link } from "react-router-dom";
import { OverlayContentProps } from "./OverlayContent.types";

const OverlayContent: React.FC<OverlayContentProps> = ({ alt, href }) => {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 p-2 flex flex-col
      items-end justify-center bg-[#0b090bbf]"
    >
      <p className="text-white text-center font-normal uppercase text-sm mb-2">{alt}</p>
      <Link to={href}>
        <button
          className="text-white border border-solid
          border-white py-1 px-4 rounded-md text-[0.75rem]"
        >
          Explorar
        </button>
      </Link>
    </div>
  );
};

export default OverlayContent;
