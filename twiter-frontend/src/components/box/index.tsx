import React, { FC, PropsWithChildren } from "react";
import "./index.css";

interface IBoxProp {
  className?: string;
  style?: React.CSSProperties;
}

const Box: FC<PropsWithChildren<IBoxProp>> = ({
  children,
  style = {},
  className = "",
}) => {
  return (
    <div style={style} className={`box ${className}`}>
      {children}
    </div>
  );
};

export default Box;
