import React from "react";
import { Link } from "react-router-dom";

const ProfileModal = ({ handleClick, user }) => {
  const optionList = [
    {
      title: "Settings & Privacy",
      handler: null,
      pngURL: "setting",
    },
    {
      title: "Help & Support",
      handler: null,
      pngURL: "help",
    },
    {
      title: "Dark Mode",
      handler: null,
      pngURL: "moon",
    },
    {
      title: "Give feedbacks",
      handler: null,
      pngURL: "feedback",
    },
    {
      title: "Log Out",
      handler: handleClick,
      pngURL: "logout",
    },
  ];
  return (
    <div className="bg-background_dark_blue w-[350px] rounded-md flex flex-col p-7">
      {/* ----- */}
      <Link to={`/profile/${user[0]?._id}`}>
        <div className="flex items-center">
          <div className="h-[40px] w-[40px] flex mr-4">
            <img
              src={user[0]?.profilePicture}
              height={40}
              width={40}
              className="object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col leading-4">
            <span className="text-[16px] font-bold text-white">
              {user[0]?.first_name} <span>{user[0]?.last_name}</span>
            </span>
            <span className="text-[12px] font-thin text-white">
              {user[0]?.email}
            </span>
          </div>
        </div>
      </Link>

      {/* ------ */}
      <div className="w-full h-[1px] bg-input_box_gray my-7" />

      {/* ------------- */}
      <div className="flex gap-y-4 flex-col">
        {optionList.map((item, index) => (
          <button
            key={index}
            onClick={item.handler}
            className="flex items-center"
          >
            <div className="h-[40px] w-[40px] flex mr-4 justify-center items-center bg-input_box_gray rounded-full">
              <img
                src={`../src/assets/${item.pngURL}.png`}
                height={25}
                width={25}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[16px] font-thin text-white">
                {item.title}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileModal;
