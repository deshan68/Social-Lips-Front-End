import React, { useEffect } from "react";
import ProfileHeader from "../components/ProfileHeader";
import ProfileBody from "../components/ProfileBody";
import { useGetPosts } from "../hooks/useGetPosts";
import { useParams } from "react-router-dom";
import { useGetUser } from "../hooks/useGetUser";
import Loader from "../components/Loader";
import ProfileHeaderAnimation from "../components/ProfileHeaderAnimation";

const Profile = () => {
  const { getPosts, isLoading, error, posts } = useGetPosts();
  const {
    getUser,
    user,
    isLoading: userIsLoading,
    error: userError,
  } = useGetUser();
  const { id } = useParams();

  useEffect(() => {
    getAllPosts();
    _getUser();
  }, [id]);

  const getAllPosts = async () => {
    await getPosts(id);
  };

  const _getUser = async () => {
    await getUser(id);
  };

  return (
    <main className="max-w-[1100px] pt-[8vh] mx-auto">
      {/* profile screen header */}
      {!userIsLoading ? (
        <ProfileHeader paramsUser={user[0]} />
      ) : (
        <ProfileHeaderAnimation />
      )}

      {/* gray color line */}
      <div className="w-full h-[1px] bg-input_box_gray mt-[50px]" />

      {isLoading && <Loader />}

      {/* profile screen body */}
      {!isLoading && (
        <ProfileBody posts={posts} user={user[0]} isLoading={isLoading} />
      )}
    </main>
  );
};

export default Profile;
