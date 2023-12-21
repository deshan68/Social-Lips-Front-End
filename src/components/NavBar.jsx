import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogOut } from "../hooks/useLogOut";
import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "react-router-dom";
import { useGetUser } from "../hooks/useGetUser";
import { useEffect } from "react";
import dummyProfileImage from "../assets/dummy-profile.jpeg";
import ProfileModal from "./ProfileModal";

const NavBar = () => {
  const { logout } = useLogOut();
  const { user: adminUser } = useAuthContext();
  const { getUser, user } = useGetUser();

  useEffect(() => {
    _getUser();
  }, []);

  const _getUser = async () => {
    await getUser(adminUser?._id);
  };

  const handleClick = () => {
    logout();
  };
  return (
    <nav className="bg-background_dark_blue/80 h-[8vh] flex justify-between items-center backdrop-blur-md px-4 fixed w-full z-50">
      {/* image and searchbox */}
      <div className="flex justify-center items-center gap-x-1">
        <Link to={"/"}>
          <img src="../src/assets/logo.png" height={50} width={50} />
        </Link>
        <input
          type="text"
          className="h-[40px] tablet:w-[250px] w-auto rounded-full pl-5 text-[12px] font-extralight bg-input_box_gray border-none text-white"
          placeholder="#Explore"
        />
      </div>

      {/* home button, notification button, profile button */}
      <Dialog.Root>
        <div className="flex justify-center items-center gap-x-1">
          <Link to={`/`}>
            <div className="bg-white h-[36px] w-auto tablet:px-3 p-2  flex justify-center items-center rounded-full gap-1 cursor-pointer">
              <img src="../src/assets/home1.svg" height={22} width={22} />
              <p className="text-[12px] font-bold tablet:block hidden">Home</p>
            </div>
          </Link>

          <div className="relative cursor-pointer">
            <img src="../src/assets/bell.svg" height={24} width={24} />
            <div className="absolute h-[12px] w-[12px] rounded-full bg-button_blue top-0 right-0 border-[1.5px] border-background_dark_blue" />
          </div>

          <div className="bg-input_box_gray w-[1px] h-[40px] mx-3" />
          <Dialog.Trigger>
            <div className="h-[45px] w-[45px] flex cursor-pointer">
              <img
                src={user[0]?.profilePicture || dummyProfileImage}
                height={45}
                width={45}
                className="rounded-full ml-[2px] object-cover border-2 border-button_blue"
              />
            </div>
          </Dialog.Trigger>
        </div>
        <Dialog.Content className="fixed flex justify-center items-center top-[8vh] right-[16px] shadow-2xl shadow-black duration-500">
          <ProfileModal handleClick={handleClick} user={user} />
        </Dialog.Content>
      </Dialog.Root>
    </nav>
  );
};

export default NavBar;
