import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAddComment } from "../hooks/useAddComment";
import { useGetComments } from "../hooks/useGetComments";

import "react-activity/dist/Dots.css";
import { Dots } from "react-activity";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

export const CommentModal = ({
  postId,
  userId,
  adminUser,
  setCommentsCount,
}) => {
  const { addComment, comment, loading: addingComment } = useAddComment();
  const {
    getComments,
    comments,
    isLoading: gettingComments,
    error,
  } = useGetComments();

  const [commentText, setCommentText] = useState();

  const _addComment = async () => {
    await addComment(
      postId,
      userId,
      commentText,
      adminUser.first_name + " " + adminUser.last_name,
      adminUser.profilePicture
    );
    setCommentText("");
  };

  const _getComments = async () => {
    await getComments(postId);
  };

  useEffect(() => {
    _getComments();
  }, [addingComment]);

  useEffect(() => {
    comment && setCommentsCount((prev) => prev + 1);
  }, [comment]);

  return (
    <section className="w-full">
      <div className="w-full flex justify-end mb-4 px-5">
        <Dialog.Close className="">
          <img
            src="../src/assets/close.svg"
            height={24}
            width={24}
            className="rounded-full border-font_light_gray"
          />
        </Dialog.Close>
      </div>

      <div className="h-[60vh] overflow-y-scroll px-8">
        {/* comments body */}
        {comments?.map((comment, index) => (
          <div key={index} className="h-auto w-full py-1 flex">
            {/* image div */}
            <div className="h-[30px] w-[8%] flex justify-center mt-1">
              <img
                src={comment.commentBy.profilePicture}
                height={30}
                width={30}
                className="object-fill h-full rounded-full "
              />
            </div>

            <div className="flex flex-col w-fit p-2 rounded-xl ml-2 bg-background_light_blue">
              {/* name and update date */}
              <div className="">
                <h1 className="font-medium text-[12px] text-white flex gap-x-2 items-center">
                  <>
                    <span>{comment.commentBy.first_name}</span>{" "}
                    <span>{comment.commentBy.last_name}</span>
                  </>
                  <p className="text-font_light_gray text-[10px] font-thin">
                    {formatDistanceToNow(new Date(comment?.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </h1>
              </div>

              {/*description  */}
              <div className="flex text-white">
                <p className="text-[12px] font-light">{comment?.text}</p>
              </div>
            </div>
          </div>
        ))}
        {gettingComments && (
          <Dots color="#ffff" size={10} className="text-center" />
        )}
        <span className="text-white">{error}</span>
      </div>

      {/* text input */}
      <div className="mb-3">
        <div className="px-8 flex rounded-md justify-between">
          {/* image div */}
          <div className="h-[30px] flex">
            <img
              src={adminUser.profilePicture}
              height={30}
              width={30}
              className="object-cover rounded-full "
            />
          </div>

          <div className="flex flex-col w-[84%]">
            <textarea
              rows={1}
              type="text"
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
              placeholder="Write a comment..."
              className="rounded-full text-[12px] h-[30px] leading-none bg-background_light_blue border-none resize-none text-white"
            />
          </div>

          <button
            onClick={_addComment}
            disabled={!commentText || gettingComments || addingComment}
            className="bg-button_blue text-white rounded-full w-[30px] h-[30px] flex justify-center items-center"
          >
            <PaperAirplaneIcon className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};
