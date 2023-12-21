import React, { useEffect, useState } from "react";

function ProgressTracker({ progressValue }) {
  return (
    <div>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          {/* <div>
            <span className="text-xs font-semibold inline-block py-1 px-4 uppercase rounded-full text-black bg-white">
              {progressValue === 100 ? <>Uploaded</> : <>Uploading...</>}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-light inline-block text-white">
              {parseInt(progressValue) - 5}%
            </span>
          </div> */}
        </div>
        <div className="flex h-2 mb-4 overflow-hidden text-xs bg-input_box_gray rounded">
          <div
            style={{ width: `${parseInt(progressValue) - 7}%` }}
            className="flex flex-col justify-center text-center whitespace-nowrap text-white bg-button_blue shadow-none py-1 px-2 transition-width duration-500 ease-in-out"
          ></div>
        </div>
      </div>
    </div>
  );
}

export default ProgressTracker;
