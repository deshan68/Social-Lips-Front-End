import React from "react";

const PostUploadCardLoader = () => {
  return (
    <div className="flex bg-background_light_blue px-4 py-4 rounded-lg justify-between mb-2 cursor-pointer">
      {/* image div */}
      <div className="h-[40px] w-[40px] flex mr-2 bg-slate-700 animate-pulse rounded-full"></div>

      {/* input fields */}
      <div className="flex flex-col w-[92%]">
        <div className="h-[40px] pl-3 flex items-center rounded-full bg-slate-700 animate-pulse text-font_dark_gray text-[14px] font-extralight border-none"></div>

        {/*three buttons  */}
        <div className="flex justify-around items-center gap-x-3 mt-5">
          {/* 1 */}
          <div className="flex justify-center gap-x-3 items-center h-[50px] w-full rounded-md  text-[16px] font-thin text-white border-[.1px] border-input_box_gray bg-slate-700 animate-pulse"></div>

          {/* 2 */}
          <div className="flex justify-center gap-x-3 items-center h-[50px] w-full  rounded-md text-[16px] font-thin text-white cursor-pointer border-[.1px] border-input_box_gray bg-slate-700 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default PostUploadCardLoader;
