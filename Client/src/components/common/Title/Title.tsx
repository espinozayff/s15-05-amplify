import React from "react";
import { TitleProps } from "./Title.type";
import TitlePrimary from "../TitlePrimary";
import TitleSecondary from "../TitleSecondary";

const Title: React.FC<TitleProps> = ({ text, type, as }) => {
  if (type === "primary") {
    return <TitlePrimary text={text} as={as} />;
  }
  return <TitleSecondary text={text} as={as} />;
};

export default Title;
