import React, { useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useGetUsers } from "../hooks/useGetUsers";
import { useAuthContext } from "../hooks/useAuthContext";

import "react-activity/dist/Dots.css";
import { Dots } from "react-activity";

const LikeListModal = ({ likesArray, adminUser }) => {
  const { user: adminUserId } = useAuthContext();

  const { getUsers, isLoading, error, users: allUsers } = useGetUsers();

  const getAllUsers = async () => {
    await getUsers(adminUserId._id);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <section className="w-full">
      <div className="w-full flex justify-end mb-4 px-5">
        <Dialog.Close>
          <img
            src="../src/assets/close.svg"
            height={24}
            width={24}
            className="rounded-full border-font_light_gray"
          />
        </Dialog.Close>
      </div>

      <div className="h-[60vh] overflow-y-scroll px-8 mb-1">
        {isLoading ? (
          <Dots className="text-center" color="white" size={10} />
        ) : (
          <>
            {/* if admin liked to the post */}
            {likesArray?.includes(adminUser?._id) && (
              <div className="flex flex-col gap-x-4 mb-3">
                {/* ---- */}
                <div className="flex items-center gap-x-3">
                  <div className="h-[35px] w-[35px] flex">
                    <img
                      src={adminUser.profilePicture}
                      width={35}
                      height={35}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <span className="text-[12px] text-white">
                    {adminUser.first_name} {adminUser.last_name}
                  </span>
                </div>

                {/* ---- */}
                <div className="w-[88%] h-[0.1px] bg-font_light_gray self-end mt-1" />
              </div>
            )}
            {/* others */}
            {allUsers &&
              allUsers?.map((user, index) => (
                <div key={index}>
                  {likesArray?.includes(user._id) && (
                    <div className="flex flex-col gap-x-4 mb-3">
                      {/* ---- */}
                      <div className="flex items-center gap-x-3">
                        <div className="h-[35px] w-[35px] flex">
                          <img
                            src={user.profilePicture}
                            width={35}
                            height={35}
                            className="rounded-full object-cover"
                          />
                        </div>
                        <span className="text-[12px] text-white">
                          {user.first_name} {user.last_name}
                        </span>
                      </div>

                      {/* ---- */}
                      <div className="w-[290px] h-[0.1px] bg-font_light_gray self-end" />
                    </div>
                  )}
                </div>
              ))}
          </>
        )}
      </div>
    </section>
  );
};

export default LikeListModal;
