import React, { useEffect } from "react";
import "react-activity/dist/Spinner.css";
import { Spinner } from "react-activity";
import { CheckIcon } from "@heroicons/react/24/outline";

const MoreOptionDropDown = ({
  adminId,
  userId,
  _deletePost,
  deleteLoading,
  setAllPosts,
  postId,
  closeDialog,
  setDeleteLoading,
}) => {
  useEffect(() => {
    if (deleteLoading == false) {
      setAllPosts((prev) => prev.filter((post) => post.post_id != postId));
      setDeleteLoading(null);
      closeDialog();
    }
  }, [deleteLoading]);

  return (
    <div className="w-full">
      {adminId === userId ? (
        <>
          <button className="group text-[14px] w-full leading-none rounded-[3px] flex items-center h-[40px] px-[5px] relative gap-x-4 pl-[15px] select-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-input_box_gray text-white">
            <img
              src="../src/assets/edit.png"
              height={20}
              width={20}
              className="object-cover"
            />
            Edit Post
          </button>
          <button
            onClick={() => _deletePost()}
            className="group text-[14px] leading-none w-full rounded-[3px] flex items-center h-[40px] px-[5px] relative gap-x-4 pl-[15px] select-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-input_box_gray text-white"
          >
            <img
              src="../src/assets/delete.png"
              height={20}
              width={20}
              className="object-cover"
            />
            Delete Post
            {deleteLoading && <Spinner size={10} />}
            {deleteLoading == false && (
              <CheckIcon className="h-4 w-4 text-white" />
            )}
          </button>
        </>
      ) : (
        <div className="group text-[14px] leading-none rounded-[3px] flex items-center h-[40px] px-[5px] relative gap-x-4 pl-[15px] select-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-input_box_gray text-white">
          <img
            src="../src/assets/report.png"
            height={20}
            width={20}
            className="object-cover"
          />
          Report Post
        </div>
      )}
    </div>
  );
};

export default MoreOptionDropDown;
