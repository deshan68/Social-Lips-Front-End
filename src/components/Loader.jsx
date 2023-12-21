import React from "react";
import "react-activity/dist/Dots.css";
import "react-activity/dist/Spinner.css";
import "react-activity/dist/Digital.css";
import { Dots, Spinner, Digital } from "react-activity";

const Loader = () => {
  return (
    <div className="w-full flex justify-center items-center my-3">
      <Digital size={18} color="white" />
    </div>
  );
};

export default Loader;
