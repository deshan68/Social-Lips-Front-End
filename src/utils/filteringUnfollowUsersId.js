export const filteringUnfollowUsersId = (allUsers, adminFollowingList) => {
  const filteredUserUnfollowArray =
    allUsers &&
    adminFollowingList &&
    allUsers?.map((user) => {
      if (!adminFollowingList.includes(user._id)) return user._id;
    });
  return filteredUserUnfollowArray;
};
