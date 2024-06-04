import React from "react";
import { Link } from "react-router-dom";
import { BadgeProps } from "./Badge.types";

const Badge: React.FC<BadgeProps> = ({ title, href }) => {
  return (
    <Link
      to={href}
      className="bg-[#09090b] border-solid border-[2px] border-[#666] rounded-full
       hover:border-[2px] hover:border-white"
    >
      <div className="px-3 py-2 text-white text-[12px] font-bold whitespace-nowrap">{title}</div>
    </Link>
  );
};

export default Badge;
