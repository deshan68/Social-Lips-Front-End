import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Switch } from "@headlessui/react";

const UploadCardModal = ({
  user,
  uploadImageHandler,
  setDescription,
  setFile,
  postType,
  setPostType,
  subtitleEnabled,
  setSubtitleEnabled,
}) => {
  const [itemSrc, setItemSrc] = useState(null);
  // const [enabled, setEnabled] = useState(false);

  function handleFile(e) {
    const _fileType = e.target.files[0].type;
    setPostType(_fileType.split("/")[0]);
    setItemSrc(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  }
  function handleCloseItem() {
    setItemSrc(null);
    setPostType("");
    setFile(null);
  }

  useEffect(() => {
    setPostType("");
  }, []);

  return (
    <div className="p-4 w-full">
      {/* ------title and close button---- */}
      <div className="flex w-full justify-center items-center">
        <Dialog.Title className="text-[20px] font-bold text-white w-[95%] text-center">
          Create Post
        </Dialog.Title>
        <Dialog.Close className="w-[5%] flex justify-center items-center">
          <img
            src="../src/assets/close.svg"
            height={24}
            width={24}
            className="rounded-full"
          />
        </Dialog.Close>
      </div>

      {/* horizontal line */}
      <div className="w-full h-[1px] bg-input_box_gray my-4" />

      {/* body */}
      <div>
        {/* profile and name */}
        <div className="flex gap-x-3 items-center">
          <div className="flex h-[40px] w-[40px]">
            <img
              src={user.profilePicture}
              height={40}
              width={40}
              className="rounded-full border-font_light_gray"
            />
          </div>

          <span className="font-bold text-[16px] text-white">Arun Deshan</span>
        </div>
        {/* input box */}
        <div className="mt-3">
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            className="flex p-0 w-full bg-transparent border-none text-white font-thin text-[16px] focus:ring-0 resize-none overflow-y-scroll stroke-background_light_blue"
            placeholder="What's on your mind, Silva?"
            rows={2}
          />
        </div>

        {/* image view box */}
        <div className="flex h-[220px] relative w-full border-[0.3px] border-input_box_gray rounded-md my-2">
          {/* close button */}
          <div
            onClick={() => handleCloseItem()}
            className="flex absolute top-2 right-3 h-[20px] w-[20px] justify-center items-center cursor-pointer rounded-full z-10"
          >
            <img
              src="../src/assets/close.svg"
              height={20}
              width={20}
              className="object-fill rounded-full"
            />
          </div>
          {postType ? (
            <div className="flex w-full items-center justify-center overflow-hidden max-h-[220px] rounded-md">
              {postType === "image" ? (
                <>
                  <img
                    src={itemSrc}
                    height={400}
                    className="object-contain blur-2xl scale-150"
                  />
                  <img
                    src={itemSrc}
                    // height={220}
                    className="object-contain absolute max-h-[220px]"
                  />
                </>
              ) : (
                <video src={itemSrc} controls width="100%" />
              )}
            </div>
          ) : (
            <div className="flex bg-background_light_blue h-full w-full rounded-md justify-center items-center flex-col">
              {/* -------- */}
              <label
                onChange={handleFile}
                className="flex h-[35px] w-[35px] justify-center items-center bg-input_box_gray rounded-full cursor-pointer"
              >
                <img
                  src="../src/assets/add.png"
                  height={20}
                  width={20}
                  className="object-fill"
                />
                <input name="" type="file" id="formId" hidden />
              </label>
              <span className="text-[16px] font-light text-white">
                Add Photos/Videos
              </span>
              <span className="text-[12px] font-extralight text-font_dark_gray leading-[8px]">
                or drag and drop
              </span>
            </div>
          )}
        </div>

        {/* switch */}

        <div className="justify-between items-center flex my-2 relative">
          {!(postType === "video") && (
            <div className="absolute bg-background_dark_blue/70 h-full w-full z-10" />
          )}
          <span className="font-normal text-[16px] text-white">
            Do you want to add subtitles?
          </span>
          <Switch
            disabled={!(postType === "video")}
            checked={subtitleEnabled}
            onChange={setSubtitleEnabled}
            className={`${
              subtitleEnabled ? "bg-button_blue" : "bg-input_box_gray"
            }
              relative inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${
                subtitleEnabled ? "translate-x-[18px]" : "translate-x-0"
              }
                pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div>

        {/* post button */}
        <button
          onClick={uploadImageHandler}
          className="w-full h-[40px] bg-button_blue rounded-md text-white text-[16px] font-normal mt-6"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default UploadCardModal;
