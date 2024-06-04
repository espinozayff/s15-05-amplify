import React from "react";
import { TitleSecundaryProps } from "./TitleSecundary.types";

const TitleSecundary: React.FC<TitleSecundaryProps> = ({ text }) => {
  return <h2 className="text-3xl font-medium text-[#666666]">{text}</h2>;
};

export default TitleSecundary;
