import React from "react";
import OverlayContent from "../OverlayContent";
import { ImageCardProps } from "./ImageCard.types";

const ImageCard: React.FC<ImageCardProps> = ({ src, alt, href }) => {
  return (
    <div className="relative col-auto h-64 flex-shrink-0 overflow-hidden group">
      <img src={src} alt={alt} className="object-cover w-full h-full" />
      <div
        className="absolute inset-0 bg-[#9C002F] transform translate-y-0 
        group-hover:translate-y-full transition-transform duration-500
        ease-in-out mix-blend-multiply w-full"
      ></div>
      <OverlayContent alt={alt} href={href} />
    </div>
  );
};

export default ImageCard;
