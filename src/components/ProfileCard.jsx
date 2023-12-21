import React from "react";
import { Link } from "react-router-dom";
import dummyCoverImage from "../assets/dummy_cover.png";
import dummyProfileImage from "../assets/dummy-profile.jpeg";

const ProfileCard = ({ user }) => {
  return (
    <div className="relative h-fit bg-background_light_blue rounded-lg tablet:mb-0 mb-3">
      {/* cover image */}
      <div className="h-[126px] w-auto flex ">
        <img
          src={user?.coverPicture || dummyCoverImage}
          height={126}
          width={600}
          className="object-cover rounded-t-lg"
        />
      </div>

      {/* profile image */}
      <div className="absolute h-[100px] w-[100px] top-[126px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="h-[100px] w-[100px] flex bg-slate-600 rounded-full">
          <img
            src={user?.profilePicture || dummyProfileImage}
            height={100}
            width={100}
            className="object-cover rounded-full border-[4px] border-background_light_blue"
          />
        </div>
      </div>

      {/* name and description */}
      <div className="mt-[60px] flex justify-center flex-col items-center">
        <h1 className="text-white text-[24px] font-semibold">
          {user?.first_name} <span> {user?.last_name}</span>
        </h1>
        <p className="text-[16px] font-light text-font_light_gray">
          {user?.email}
        </p>
        <p className="text-[16px] font-light text-white px-10 text-center leading-5">
          {user?.bio}{" "}
        </p>
      </div>

      {/* followers & following count */}
      <div className="relative border-t-[1px] border-b-[1px] border-input_box_gray h-[100px] flex justify-around items-center mt-5">
        <div className="flex justify-center items-center flex-col">
          <p className="font-semibold text-[24px] text-white">
            {user?.followers.length}
          </p>
          <p className="font-light text-[16px] text-font_light_gray">
            Followers
          </p>
        </div>
        <div className="flex justify-center items-center flex-col">
          <p className="font-semibold text-[24px] text-white">
            {" "}
            {user?.followings.length}
          </p>
          <p className="font-light text-[16px] text-font_light_gray">
            Followings
          </p>
        </div>
        <div className="absolute h-[63px] w-[1px] bg-input_box_gray" />
      </div>

      {/* my profile button */}
      <Link to={`/profile/${user?._id}`}>
        <p className="text-center py-5 font-normal text-[20px] text-button_blue cursor-pointer">
          My Profile
        </p>
      </Link>
    </div>
  );
};

export default ProfileCard;
