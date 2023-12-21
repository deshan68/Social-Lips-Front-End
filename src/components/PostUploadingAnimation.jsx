import React from "react";

const PostUploadingAnimation = () => {
  return (
    <div className="flex h-fit bg-background_light_blue px-5 py-4 rounded-lg flex-col gap-y-2">
      <div className="flex gap-x-3">
        <div className="h-[45px] w-[45px] flex bg-slate-700 animate-pulse rounded-full"></div>
        <div className="flex flex-col justify-around">
          <div className="h-[10px] w-[200px] flex animate-pulse rounded-lg bg-slate-700"></div>
          <div className="h-[10px] w-[100px] flex animate-pulse rounded-lg bg-slate-700"></div>
        </div>
      </div>

      <div className="flex flex-col gap-y-1">
        <div className="h-[12px] w-full flex animate-pulse rounded-lg bg-slate-700"></div>
        <div className="h-[12px] w-[500px] flex animate-pulse rounded-lg bg-slate-700"></div>
      </div>

      <div>
        <div className="h-[300px]  flex animate-pulse rounded-lg bg-slate-700"></div>
      </div>
    </div>
  );
};

export default PostUploadingAnimation;
