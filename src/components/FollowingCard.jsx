import React, { useEffect, useState } from "react";
import { useGetUsers } from "../hooks/useGetUsers";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { useUnFollowUser } from "../hooks/useUnFollowUser";
import { Spinner } from "react-activity";
import "react-activity/dist/Spinner.css";

import { CheckIcon } from "@heroicons/react/24/solid";

const FollowingCard = ({ adminUser }) => {
  const { user: adminUserId } = useAuthContext();
  const { getUsers, users: allUsers } = useGetUsers();
  const { unFollowUser, resultUserId, loadingId } = useUnFollowUser();

  const [changeButtonTextValue, setChangeButtonTextValue] = useState([]);

  const adminFollowers = adminUser[0]?.followings;

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    await getUsers(adminUserId._id);
  };

  const handleUnFollowUser = async (paramsId, userId) => {
    await unFollowUser(paramsId, userId);
  };

  useEffect(() => {
    !changeButtonTextValue.includes(resultUserId) &&
      setChangeButtonTextValue((prev) => [...prev, resultUserId]);
  }, [resultUserId]);

  return (
    <div className="max-h-full  bg-background_light_blue rounded-lg overflow-y-scroll py-6 px-4 sticky top-[8vh]">
      <h1 className="font-semibold text-[24px] text-white pb-2">Following</h1>

      {allUsers &&
        allUsers?.map((user, index) => (
          <div key={index}>
            {adminFollowers?.includes(user._id) && (
              <div key={index}>
                <div className="flex justify-between items-center p-3 w-full">
                  {/* profile image and name */}
                  <Link className="flex gap-x-4" to={`/profile/${user._id}`}>
                    {/* image */}
                    <div className="h-[40px] w-[40px] flex">
                      <img
                        src={user.profilePicture}
                        height={50}
                        width={50}
                        className="object-cover rounded-full"
                      />
                    </div>

                    {/* name and user name */}
                    <div className="leading-4">
                      <h2 className="font-semibold text-[16px] text-white">
                        {user.first_name} {user.last_name}
                      </h2>
                      <p className="font-thin text-[12px] text-font_light_gray">
                        {user.email}
                      </p>
                    </div>
                  </Link>

                  {/* un follow button */}
                  <button
                    disabled={changeButtonTextValue.includes(user._id)}
                    onClick={() =>
                      handleUnFollowUser(user._id, adminUserId._id)
                    }
                    className="flex justify-center items-center h-[30px] w-[80px] bg-white rounded-full font-bold text-[12px]"
                  >
                    {loadingId === user._id ? (
                      <Spinner size={10} />
                    ) : changeButtonTextValue.includes(user._id) ? (
                      <CheckIcon className="h-4 w-4" />
                    ) : (
                      <>Unfollow</>
                    )}
                  </button>

                  {/* horizontal line */}
                </div>
                <div className="w-full h-[1px] bg-input_box_gray" />
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default FollowingCard;
