import React from "react";
import { TitleProps } from "./Title.types";

const TitlePrimary: React.FC<TitleProps> = ({ text, as: Component = "h1" }) => (
  <Component className="text-3xl font-medium text-white leading-8">{text}</Component>
);

const TitleSecondary: React.FC<TitleProps> = ({ text, as: Component = "h2" }) => (
  <Component className="text-3xl font-medium text-[#666666]">{text}</Component>
);

const Title: React.FC<TitleProps> = ({ text, type, as }) => {
  if (type === "primary") {
    return <TitlePrimary text={text} type={type} as={as} />;
  }
  return <TitleSecondary text={text} type={type} as={as} />;
};

export default Title;
