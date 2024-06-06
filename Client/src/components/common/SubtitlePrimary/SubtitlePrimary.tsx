import React from "react";
import { SubtitlePrimaryProps } from "./SubtitlePrimary.types";

const SubtitlePrimary: React.FC<SubtitlePrimaryProps> = ({ text }) => {
  return <h4 className="text-lg font-medium text-white leading-3">{text}</h4>;
};

export default SubtitlePrimary;
