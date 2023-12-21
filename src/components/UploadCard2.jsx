import React, { useEffect, useState } from "react";
import dummyProfileImage from "../assets/dummy-profile.jpeg";
import * as Dialog from "@radix-ui/react-dialog";
import { Switch } from "@headlessui/react";
import UploadCardModal from "./UploadCardModal";
import { useCreatePost } from "../hooks/useCreatePost";
import { storage } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";
import { Toaster, toast } from "react-hot-toast";
import { useGenerateSub } from "../hooks/useGenerateSub";

const UploadCard2 = ({
  user,
  setIsUploading,
  setNewPost,
  setUploadProgress,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [postType, setPostType] = useState("");
  const [subtitleEnabled, setSubtitleEnabled] = useState(false);

  const { createPost, newPost, isLoading, result, error, setIsLoading } =
    useCreatePost();

  const { generateSub, isLoading: subGenerating } = useGenerateSub();

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleUpload = async (downloadURL, _fileId) => {
    try {
      await createPost(
        user._id,
        description,
        downloadURL,
        postType,
        subtitleEnabled
      );
      subtitleEnabled && generateSub(_fileId, newPost.post_id, downloadURL);
    } catch (error) {
      console.log("Cannot create post or subtitle");
    }
  };

  const uploadImage = () => {
    if (!file) return;
    closeDialog();
    setIsLoading(true);
    const _fileId = v4();
    const imgRef = ref(storage, `posts/${postType}/${_fileId}`);
    const uploadTask = uploadBytesResumable(imgRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.log(error);
        setIsLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          handleUpload(downloadURL, _fileId);
        });
      }
    );
  };

  const notify = () =>
    (error && toast.error(result)) || (result && toast.success(result));

  useEffect(() => {
    setNewPost(newPost);
    setIsUploading(null);
  }, [newPost]);

  useEffect(() => {
    setIsUploading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    result && notify();
  }, [result]);

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Toaster
        toastOptions={{
          duration: 5000,
        }}
      />
      <Dialog.Trigger>
        <div className="flex bg-background_light_blue px-4 py-4 rounded-lg justify-between mb-2 cursor-pointer">
          {/* image div */}
          <div className="h-[40px] w-[40px] flex mr-2">
            <img
              src={user?.profilePicture || dummyProfileImage}
              height={40}
              width={40}
              className="object-cover rounded-full"
            />
          </div>

          {/* input fields */}
          <div className="flex flex-col w-[92%]">
            <div className="h-[40px] pl-3 flex items-center rounded-full bg-input_box_gray text-font_dark_gray text-[14px] font-extralight border-none">
              What's on your mind, GA?
            </div>

            {/*three buttons  */}
            <div className="flex justify-around items-center gap-x-3 mt-5">
              {/* 1 */}
              <div className="flex justify-center gap-x-3 items-center h-[50px] w-full rounded-md  text-[16px] font-thin text-white border-[.1px] border-input_box_gray">
                <img
                  src="../src/assets/image.svg"
                  height={20}
                  width={20}
                  className="object-contain"
                />
                Photo
              </div>

              {/* 2 */}
              <div className="flex justify-center gap-x-3 items-center h-[50px] w-full  rounded-md text-[16px] font-thin text-white cursor-pointer border-[.1px] border-input_box_gray">
                <img
                  src="../src/assets/video.svg"
                  height={20}
                  width={20}
                  className="object-contain"
                />
                Video
              </div>
            </div>
          </div>
        </div>
      </Dialog.Trigger>
      <Dialog.Overlay className="data-[state=open]:animate-overlayShow bg-black/60 h-screen w-screen fixed inset-0 z-40" />

      <Dialog.Content
        className="data-[state=open]:animate-contentShow data-[state=closed]:animate-contentShowClose fixed flex justify-center items-center flex-col w-[350px] tablet:w-[490px] top-[50%] left-[50%] bg-background_dark_blue translate-x-[-50%] translate-y-[-50%] z-50 rounded-lg"
        // style={{ minWidth: "450px" }}
      >
        <UploadCardModal
          user={user}
          uploadImageHandler={uploadImage}
          setDescription={setDescription}
          setFile={setFile}
          postType={postType}
          setPostType={setPostType}
          subtitleEnabled={subtitleEnabled}
          setSubtitleEnabled={setSubtitleEnabled}
        />
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default UploadCard2;
