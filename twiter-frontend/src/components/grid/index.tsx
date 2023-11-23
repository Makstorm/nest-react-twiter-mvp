import React, { FC, PropsWithChildren } from "react";
import style from "./index.module.css";

const Grid: FC<PropsWithChildren> = ({ children }) => {
  return <div className={style.grid}>{children}</div>;
};

export default Grid;
