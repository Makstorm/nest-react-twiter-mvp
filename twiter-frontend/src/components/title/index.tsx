import React, { FC, PropsWithChildren } from "react";
import "./index.css";

const Title: FC<PropsWithChildren> = ({ children }) => {
  return <h1 className="title">{children}</h1>;
};

export default Title;
