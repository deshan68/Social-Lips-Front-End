import React from "react";

const ProfileHeaderAnimation = () => {
  return (
    <div className="w-full relative">
      {/* cover image */}
      <div className="w-[1100px] h-[350px] flex relative animate-pulse bg-slate-700 rounded-xl" />

      {/* profile image */}
      <div className="h-[200px] w-[200px] flex absolute top-2/3 transform -translate-y-[10%] border-[4px] border-background_dark_blue rounded-full animate-pulse bg-slate-700" />

      {/* about and buttons */}
      <div className="flex justify-between items-center mt-4">
        {/* description */}
        <div className="text-white ml-[240px]">
          <div className="animate-pulse h-[35px] w-[200px] bg-slate-700 rounded-md mb-1" />
          <div className="leading-3 h-[15px] w-[700px] animate-pulse bg-slate-700 rounded-sm" />

          <div className="flex justify-right items-center gap-x-5 mt-2">
            <div className="h-[15px] w-[60px] animate-pulse bg-slate-700 rounded-sm " />
            <div className="w-[1px] h-[20px] bg-input_box_gray" />
            <div className="h-[15px] w-[60px] animate-pulse bg-slate-700 rounded-sm " />
          </div>
        </div>

        {/* button */}
        <div className="w-[110px] h-[40px] rounded-lg animate-pulse bg-slate-700"></div>
      </div>
    </div>
  );
};

export default ProfileHeaderAnimation;
