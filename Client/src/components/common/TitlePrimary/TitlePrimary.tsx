import React from "react";
import { TitlePrimaryProps } from "./TitlePrimary.types";

const TitlePrimary: React.FC<TitlePrimaryProps> = ({ text, as: Component = "h1" }) => {
  return <Component className="text-3xl font-medium text-black leading-8">{text}</Component>;
};

export default TitlePrimary;
