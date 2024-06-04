import React from "react";
import { TitleSecondaryProps } from "./TitleSecondary.types";

const TitleSecondary: React.FC<TitleSecondaryProps> = ({ text, as: Component = "h2" }) => {
  return <Component className="text-3xl font-medium text-[#666666]">{text}</Component>;
};

export default TitleSecondary;
