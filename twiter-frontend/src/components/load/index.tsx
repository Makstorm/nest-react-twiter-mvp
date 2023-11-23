import { FC } from "react";
import "./index.css";

export const LOAD_STATUS = {
  PROGRESS: "progres",
  SUCCESS: "success",
  ERROR: "error",
};

interface IAlertP {
  status?: string;
  message: string;
}

export const Alert: FC<IAlertP> = ({ status = "default", message }) => {
  return <div className={`alert alert--${status}`}>{message}</div>;
};

export const Loader = () => {
  return <div className="loader"></div>;
};

export const Skeleton = () => {
  return (
    <div className="skeleton">
      <div className="skeleton__item"></div>
      <div className="skeleton__item"></div>
      <div className="skeleton__item"></div>
    </div>
  );
};
