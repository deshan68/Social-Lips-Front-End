import React, { useCallback, useRef, useState } from "react";
import {
  ProfileCard,
  FollowYouCard,
  UploadCard,
  PostCard,
} from "../components";
import FollowingCard from "./FollowingCard";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGetPosts } from "../hooks/useGetPosts";
import { useEffect } from "react";
import { useGetUsers } from "../hooks/useGetUsers";
import { useGetUser } from "../hooks/useGetUser";
import PostUploadingAnimation from "./PostUploadingAnimation";
import { filteringUnfollowUsersId } from "../utils/filteringUnfollowUsersId";
import { useGetTimeLinePosts } from "../hooks/useGetTimeLinePosts";
import Loader from "./Loader";
import ProgressTracker from "./ProgressTracker";
import UploadCard2 from "./UploadCard2";
import PostUploadCardLoader from "./postUploadCardLoader";
import MainLoader from "./MainLoader";
import { useIntersection } from "@mantine/hooks";

const Feed = () => {
  const { user: adminUser } = useAuthContext();
  const { getPosts, isLoading, error, posts } = useGetPosts();
  const {
    getTimelinePosts,
    timelinePosts,
    hasMore,
    isLoading: timelinePostsLoading,
    setTimelinePosts,
  } = useGetTimeLinePosts();
  const {
    getUser,
    user,
    isLoading: userIsLoading,
    error: userError,
  } = useGetUser();
  const {
    getUsers,
    users: allUsers,
    isLoading: allUsersLoading,
  } = useGetUsers();

  const [allPosts, setAllPosts] = useState([]);
  const [newPost, setNewPost] = useState();
  const [isUploading, setIsUploading] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    // getAllPosts();
    getAllUsers();
    _getUser();
    _getTimelinePosts();
  }, []);

  useEffect(() => {
    if (pageNumber === 0) {
      setAllPosts(timelinePosts);
      setTimelinePosts("");
    }
  }, [timelinePostsLoading]);

  const getAllPosts = async () => {
    await getPosts(adminUser._id);
  };
  const _getTimelinePosts = async (_pageNumber) => {
    try {
      await getTimelinePosts(adminUser._id, _pageNumber);
      if (_pageNumber && timelinePosts) {
        timelinePosts?.map((post) => {
          return setAllPosts((prev) => [...prev, post]);
        });
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  const _getUser = async () => {
    await getUser(adminUser._id);
  };
  const getAllUsers = async () => {
    await getUsers(adminUser._id);
  };

  // load posts
  const observer = useRef();
  const lastPostElementRef = useCallback(
    (node) => {
      if (timelinePostsLoading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber((prev) => {
            _getTimelinePosts(prev + 1);
            return prev + 1;
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    [timelinePostsLoading, timelinePosts]
  );

  async function fetchData(pageNumber) {
    try {
      await getTimelinePosts(adminUser._id, pageNumber);
      timelinePosts?.map((post) => {
        return setAllPosts((prev) => [...prev, post]);
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="pt-[60px] px-4 flex justify-center gap-x-2 relative">
      <>
        {/* left column */}
        <div className="h-[90vh] w-[380px] min-w-[250px] gap-y-2 tablet:flex flex-col relative hidden">
          {/* profile card */}
          <ProfileCard user={user[0]} />

          {/* Who is to follow you card */}
          <FollowYouCard
            cardTitle={"Who is to follow you"}
            allUsers={allUsers}
            filterIdArray={filteringUnfollowUsersId(
              allUsers,
              user[0]?.followings
            )}
            adminUser={user}
          />
        </div>

        {/* middle column */}
        <div className="h-[473px] w-[600px] min-w-[400px] flex flex-col">
          {/* profile card */}
          <div className="tablet:hidden block mt-3">
            <ProfileCard user={user[0]} />
          </div>

          {!user ? (
            <PostUploadCardLoader />
          ) : (
            <UploadCard2
              user={user[0]}
              setAl
              lPosts={setAllPosts}
              setIsUploading={setIsUploading}
              setNewPost={setNewPost}
              setUploadProgress={setUploadProgress}
            />
          )}
          {isUploading && <ProgressTracker progressValue={uploadProgress} />}

          {timelinePostsLoading && pageNumber === 0 && (
            <>
              <PostUploadingAnimation />
            </>
          )}

          {newPost && (
            <PostCard post={newPost} postOwner={user[0]} adminUser={user[0]} />
          )}
          {isUploading && <PostUploadingAnimation />}

          {allPosts &&
            allPosts?.map((post, index) => {
              if (allPosts.length === index + 1) {
                return (
                  <div key={index} ref={lastPostElementRef}>
                    <PostCard
                      post={post}
                      postOwner={user[0]}
                      adminUser={user[0]}
                      key={index}
                      setAllPosts={setAllPosts}
                    />
                  </div>
                );
              }
              return (
                <div>
                  <PostCard
                    post={post}
                    postOwner={user[0]}
                    adminUser={user[0]}
                    key={index}
                    setAllPosts={setAllPosts}
                  />
                </div>
              );
            })}

          {timelinePostsLoading && pageNumber > 0 && <Loader />}
        </div>

        {/* right column */}
        <div className="h-[473px] w-[380px] tablet:block hidden">
          <FollowingCard adminUser={user} />
        </div>
      </>
    </div>
  );
};

export default Feed;
