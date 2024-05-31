import React from "react";
import { TitlePrimaryProps } from "./TitlePrimary.types";

const TitlePrimary: React.FC<TitlePrimaryProps> = ({ text }) => {
  return <h2 className="text-3xl font-medium text-black leading-8">{text}</h2>;
};

export default TitlePrimary;
