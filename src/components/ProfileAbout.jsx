import React from "react";

const ProfileAbout = ({ user }) => {
  return (
    <div className="bg-background_light_blue rounded-lg p-8 w-[full] gap-y-4 flex flex-col mb-2">
      {/*  */}
      <div className="flex gap-x-2 text-font_light_gray font-thin text-[14px]">
        <img src="../src/assets/cap.svg" height={20} width={20} />
        <span>Studying at {user?.studying_at} </span>
      </div>
      <div className="flex gap-x-2 text-font_light_gray font-thin text-[14px]">
        <img src="../src/assets/location.svg" height={20} width={20} />
        <span>Lives in {user?.lives_in}</span>
      </div>
      <div className="flex gap-x-2 text-font_light_gray font-thin text-[14px]">
        <img src="../src/assets/work.svg" height={20} width={20} />
        <span>Work at {user?.work_at} </span>
      </div>

      {user?.in_relationship && (
        <div className="flex gap-x-2 text-font_light_gray font-thin text-[14px]">
          <img src="../src/assets/heart.svg" height={20} width={20} />

          <span>In a Relationship</span>
        </div>
      )}

      <div className="flex gap-x-2 text-font_light_gray font-thin text-[14px]">
        <img src="../src/assets/call.svg" height={20} width={20} />
        <span>at 0771234567</span>
      </div>
    </div>
  );
};

export default ProfileAbout;
