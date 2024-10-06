import React from "react";

import "./Logo.css";
import LogoWhite from "./logo-light.svg";
import LogoDark from "./logo-dark.svg";

type LogoProps = {
  theme?: "dark" | "light";
};

export const Logo: React.FC<LogoProps> = ({ theme }) => {
  return (
    <div className="logo">
      {theme === "dark" ? <LogoDark /> : <LogoWhite />}
    </div>
  );
};
