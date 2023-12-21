import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFollowUser } from "../hooks/useFollowUser";

import { CheckIcon } from "@heroicons/react/24/solid";
import { Spinner } from "react-activity";
import "react-activity/dist/Spinner.css";

const FollowYouCard = ({ cardTitle, allUsers, filterIdArray, adminUser }) => {
  const { followUser, resultUserId, loadingId } = useFollowUser();

  const [changeButtonTextValue, setChangeButtonTextValue] = useState([]);

  const handleFollowUser = async (paramsId, userId) => {
    await followUser(paramsId, userId);
  };

  useEffect(() => {
    !changeButtonTextValue.includes(resultUserId) &&
      setChangeButtonTextValue((prev) => [...prev, resultUserId]);
  }, [resultUserId]);

  return (
    <div className=" bg-background_light_blue rounded-lg p-6 w-[full] sticky top-[8vh]">
      <h1 className="font-semibold text-[24px] text-white pb-2">{cardTitle}</h1>
      {allUsers &&
        allUsers.map((user, index) => (
          <div key={index}>
            {filterIdArray?.includes(user._id) && (
              <div>
                <div className="flex justify-between items-center m-3">
                  {/* here */}
                  <Link key={index} to={`/profile/${user._id}`}>
                    {/* profile image and name */}
                    <div className="flex gap-x-4">
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
                          {user?.first_name} <span>{user?.last_name}</span>
                        </h2>
                        <p className="font-thin text-[12px] text-font_light_gray">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    {/* here */}
                  </Link>

                  {adminUser &&
                  cardTitle === "Followers" &&
                  adminUser[0]?.followings?.includes(user._id) ? (
                    <button
                      disabled={true}
                      className="h-[30px] w-[80px] bg-white rounded-full font-bold text-[12px]"
                    >
                      Following
                    </button>
                  ) : (
                    <button
                      disabled={changeButtonTextValue.includes(user._id)}
                      onClick={() =>
                        handleFollowUser(user._id, adminUser[0]?._id)
                      }
                      className="h-[30px] w-[80px] flex justify-center items-center bg-white rounded-full font-bold text-[12px]"
                    >
                      {loadingId === user._id ? (
                        <Spinner size={10} />
                      ) : changeButtonTextValue.includes(user._id) ? (
                        <CheckIcon className="h-4 w-4" />
                      ) : (
                        <>Follow</>
                      )}
                    </button>
                  )}

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

export default FollowYouCard;
