import React, { useEffect, useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import * as Dialog from "@radix-ui/react-dialog";

import { useLikeDislike } from "../hooks/useLikeDislike";
import dummyProfileImage from "../assets/dummy-profile.jpeg";

import "react-activity/dist/Spinner.css";
import { Spinner } from "react-activity";

import { useAuthContext } from "../hooks/useAuthContext";
import { CommentModal } from "./CommentModal";

import LikeListModal from "./LikeListModal";

import "vidstack/styles/defaults.css";
import "vidstack/styles/community-skin/video.css";

import {
  MediaCommunitySkin,
  MediaOutlet,
  MediaPlayer,
  MediaPoster,
} from "@vidstack/react";
import MoreOptionDropDown from "./MoreOptionDropDown";
import { useDeletePost } from "../hooks/useDeletePost";

const PostCard = ({ post, postOwner, adminUser, setAllPosts }) => {
  const { user: adminUserId } = useAuthContext();
  const {
    deletePost,
    loading: deleteLoading,
    setLoading: setDeleteLoading,
  } = useDeletePost();
  const { likeDislike, likeValue, isLoading } = useLikeDislike();

  const [likes, setLikes] = useState(post?.likes?.length);
  const [commentsCount, setCommentsCount] = useState(post?.comments?.length);
  const sub = post?.subtitle_url;
  const [likesArray, setLikesArray] = useState(post?.likes);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Update the likes state when the likeValue changes
    if (likeValue !== null && likeValue === "liked") {
      setLikes((prev) => prev + 1); // Update the likes count with the new value
      setLikesArray((prev) => [...prev, adminUserId._id]);
    } else if (likeValue !== null && likeValue === "disliked") {
      setLikes((prev) => prev - 1); // Update the dislikes count with the new value
      setLikesArray((prev) => prev.filter((value) => value != adminUserId._id));
    }
  }, [likeValue]);

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleLike = async () => {
    await likeDislike(post?.post_id, adminUser._id);
  };

  const _deletePost = async () => {
    await deletePost(adminUser?._id, post?.post_id);
  };

  return (
    <div className="flex flex-col relative h-fit bg-background_light_blue py-4 rounded-lg mb-2">
      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Trigger>
          {/* option Dot 3 button */}
          <div className="absolute right-4 top-4 cursor-pointer">
            <img
              src="../src/assets/dots.png"
              height={20}
              width={20}
              className="object-cover"
            />
          </div>
        </Dialog.Trigger>
        <Dialog.Overlay className="bg-black/30 h-screen w-screen fixed inset-0 z-40" />
        <Dialog.Content className="flex justify-center items-center absolute flex-col w-[200px] py-2 top-7 right-4 bg-background_light_blue transform animate-wiggle z-50 rounded-lg drop-shadow-none">
          <MoreOptionDropDown
            adminId={adminUser?._id}
            userId={post?.user_id}
            postId={post?.post_id}
            _deletePost={_deletePost}
            deleteLoading={deleteLoading}
            setAllPosts={setAllPosts}
            closeDialog={closeDialog}
            setDeleteLoading={setDeleteLoading}
            // postId={post?.postId}
          />
        </Dialog.Content>
      </Dialog.Root>

      <div className="flex items-center">
        {/* image div */}
        <div className="h-[40px] w-[40px] flex justify-center items-center overflow-hidden rounded-full mx-4">
          <img
            src={post?.profilePicture || dummyProfileImage}
            height={40}
            width={40}
            className="object-cover rounded-full h-full"
          />
        </div>

        {/* name and update date */}
        <div className="leading-none">
          <h1 className="font-bold text-[16px] text-white mb-1">
            {post?.first_name} <span>{post?.last_name}</span>
          </h1>
          <p className="text-font_light_gray text-[12px] font-thin">
            {formatDistanceToNow(new Date(post?.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>

        {/* Wrap the last div to move it to the right */}
        <div className="flex-grow"></div>
        {post.subtitle_status == "generating" && post.postType == "video" && (
          <div className="self-baseline mx-12 bg-[#301F11] text-[12px] px-2 py-[2px] text-[#F1A060] rounded-[4px]">
            Subtitle generating...
          </div>
        )}
      </div>

      {/*description  */}
      <div className="flex ml-4 my-3">
        <p className="text-[16px] text-white leading-5 font-light">
          {post?.description}
        </p>
      </div>

      <div className="flex flex-col justify-between">
        {/* post image or video*/}
        <div className="flex justify-center items-center max-h-[400px] max-w-[600px] overflow-hidden">
          {post?.postType === "image" ? (
            <>
              <img
                src={post?.img_url}
                height={400}
                width={600}
                className="object-fill blur-2xl scale-150"
              />
              <img
                src={post?.img_url}
                // height={400}
                // width={600}
                className="object-contain absolute max-h-[400px] shadow-md"
              />
            </>
          ) : (
            <MediaPlayer
              className="rounded-none"
              title="Sprite Fight"
              src={{ src: post?.img_url, type: "video/mp4" }}
              //poster="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.webp?time=268&width=980"
              //thumbnails="https://media-files.vidstack.io/sprite-fight/thumbnails.vtt"
              aspectRatio={16 / 9}
              crossorigin="anonymus"
              load="visible"
            >
              <MediaOutlet>
                <MediaPoster alt="" />
                <track
                  src={sub}
                  label="English"
                  srcLang="en-US"
                  kind="subtitles"
                  default
                />
              </MediaOutlet>
              <MediaCommunitySkin />
            </MediaPlayer>
          )}
        </div>

        {/* likes and comment view area */}
        <div className="flex justify-between items-center mx-4 my-2">
          {/* like count */}
          <Dialog.Root>
            <Dialog.Trigger>
              <button
                className="flex items-center gap-x-1"
                disabled={!likesArray?.at(0)?.length > 0}
              >
                <img
                  src="../src/assets/like.svg"
                  height={18}
                  width={18}
                  className="object-contain bg-button_blue rounded-full p-[2px]"
                />
                <span className="text-[14px] font-light text-font_light_gray">
                  {likes}
                </span>
              </button>
            </Dialog.Trigger>
            <Dialog.Overlay className=" data-[state=open]:animate-overlayShow bg-black/60 h-screen w-screen fixed inset-0 z-40" />

            <Dialog.Content
              className="data-[state=open]:animate-contentShow fixed flex justify-center items-center flex-col py-4 w-[350px] tablet:w-[400px] top-[50%] left-[50%] bg-background_dark_blue   translate-x-[-50%] translate-y-[-50%] z-50 rounded-2xl drop-shadow-none"
              style={{ minWidth: "200px" }}
            >
              <LikeListModal likesArray={likesArray} adminUser={adminUser} />
            </Dialog.Content>
          </Dialog.Root>

          {/* comment view */}
          <div>
            <span className="text-[14px] font-light text-font_light_gray">
              {commentsCount} comments
            </span>
          </div>
        </div>

        <div className="h-[1px] bg-input_box_gray mx-4" />

        {/* like and comment button */}
        <div className="flex justify-between w-full">
          {/* like */}
          <button
            disabled={isLoading}
            onClick={handleLike}
            className="flex justify-center gap-x-2 items-center h-[45px] w-[50%] text-[16px] text-white rounded-lg"
          >
            {isLoading ? (
              <Spinner size={13} />
            ) : (
              <>
                <img
                  src={
                    !likesArray?.includes(adminUserId._id)
                      ? "../src/assets/outlineLike.svg"
                      : "../src/assets/like.svg"
                  }
                  height={22}
                  width={22}
                  className="object-contain"
                />
                Like
              </>
            )}
          </button>

          <div className="w-[1px] bg-input_box_gray my-1" />

          {/* comment */}
          <Dialog.Root>
            <Dialog.Trigger className="w-[50%]">
              <button className="flex justify-center gap-x-2 items-center h-[45px] w-full text-[16px]  text-white rounded-lg">
                <img
                  src="../src/assets/comment.svg"
                  height={17}
                  width={17}
                  className="object-contain"
                />
                Comment
              </button>
            </Dialog.Trigger>
            <Dialog.Overlay className=" data-[state=open]:animate-overlayShow bg-black/60 h-screen w-screen fixed inset-0 z-40" />

            <Dialog.Content
              className="data-[state=open]:animate-contentShow fixed flex justify-center items-center flex-col py-4 w-[350px] tablet:w-[490px] top-[50%] left-[50%] bg-background_dark_blue   translate-x-[-50%] translate-y-[-50%] z-50 rounded-2xl drop-shadow-none"
              style={{ minWidth: "300px" }}
            >
              <CommentModal
                postId={post.post_id}
                userId={adminUserId._id}
                adminUser={adminUser}
                setCommentsCount={setCommentsCount}
              />
            </Dialog.Content>
          </Dialog.Root>
        </div>
        <div className="h-[1px] bg-input_box_gray mx-4" />
      </div>
    </div>
  );
};

export default PostCard;
