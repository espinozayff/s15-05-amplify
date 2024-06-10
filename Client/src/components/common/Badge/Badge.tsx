import React from "react";
import { Link } from "react-router-dom";
import { BadgeProps } from "./Badge.types";

const Badge: React.FC<BadgeProps> = ({ title, href, active = false }) => {
  return (
    <Link
      to={href}
      className={`bg-[#09090b] border-solid border rounded-md 
        ${active ? "border-white bg-white text-black" : "border-[#C2C2C2] text-white"}
        hover:border-white hover:bg-white hover:text-black`}
    >
      <div className="px-3 py-2 text-[11px] font-medium whitespace-nowrap uppercase">{title}</div>
    </Link>
  );
};

export default Badge;
