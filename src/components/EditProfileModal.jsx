import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { useAuthContext } from "../hooks/useAuthContext";

import "react-activity/dist/Spinner.css";
import { Spinner } from "react-activity";

import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EditProfileModal = ({ user }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [studying, setStudying] = useState("");
  const [lives, setLives] = useState("");
  const [work, setWork] = useState("");
  const [relationship, setRelationship] = useState("");
  const [profilePic, setProfilePic] = useState();
  const [coverPic, setCoverPic] = useState();

  const { user: adminUser } = useAuthContext();
  const { updateUser, isLoading, result, error } = useUpdateUser();

  const navigate = useNavigate();
  const handleSubmit = async () => {
    await updateUser(
      adminUser._id,
      firstName,
      lastName,
      bio,
      studying,
      lives,
      work,
      relationship,
      profilePic,
      coverPic
    );
  };

  const handleProfilePictureFile = (e) => {
    console.log(e.target.files[0]);
    setProfilePic(e.target.files[0]);
  };
  const handleCoverPictureFile = (e) => {
    setCoverPic(e.target.files[0]);
  };

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  useEffect(() => {
    result && notifySuccess("Update Successfully");
    error && notifyError("Can't Update");
    setTimeout(() => {
      result && navigate("/");
    }, 3000);
  }, [result, error]);

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            background: "#081A26",
            color: "#fff",
          },
        }}
      />
      <div className="w-full flex justify-end mb-8">
        <Dialog.Close className="">
          <img
            src="../src/assets/close.svg"
            height={24}
            width={24}
            className="rounded-full hover:border-[1px] border-font_light_gray"
          />
        </Dialog.Close>
      </div>

      <Dialog.Title className="text-[32px] w-full font-bold leading-6">
        Edit Your Profile
      </Dialog.Title>

      <Dialog.Description className="w-full text-[16px] text-font_light_gray font-thin mb-6">
        Make changes to your profile here. Click save when you're done.
      </Dialog.Description>

      {/* name */}
      <fieldset className="flex w-full justify-between items-center">
        <input
          type="text"
          placeholder={user?.first_name}
          className="edit-form-input  w-[200px]"
          onChange={(e) => setFirstName(e.target.value)}
          // value={user?.first_name}
        />
        <input
          type="text"
          placeholder={user?.last_name}
          className="edit-form-input  w-[200px]"
          onChange={(e) => setLastName(e.target.value)}
          // value={user?.last_name}
        />
      </fieldset>

      {/* bio */}
      <fieldset className="w-full">
        <input
          type="text"
          placeholder={user?.bio}
          className="edit-form-input  w-full"
          onChange={(e) => setBio(e.target.value)}
          // value={user?.bio}
        />
      </fieldset>

      {/* studying at */}
      <fieldset className="w-full">
        <input
          type="text"
          placeholder={user?.studying_at}
          className="edit-form-input  w-full"
          onChange={(e) => setStudying(e.target.value)}
          // value={user?.studying_at}
        />
      </fieldset>

      {/* Lives in */}
      <fieldset className="w-full">
        <input
          type="text"
          placeholder={user?.lives_in}
          className="edit-form-input  w-full"
          onChange={(e) => setLives(e.target.value)}
          // value={user?.lives_in}
        />
      </fieldset>

      {/* work at */}
      <fieldset className="w-full">
        <input
          type="text"
          placeholder={user?.work_at}
          className="edit-form-input  w-full"
          onChange={(e) => setWork(e.target.value)}
          // value={user?.work_at}
        />
      </fieldset>

      {/* in a relationship */}
      <fieldset className="w-full">
        <select
          className="edit-form-input  w-full"
          onChange={(e) => setRelationship(e.target.value)}
        >
          <option selected disabled>
            In a Relationship
          </option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </fieldset>

      {/* profile picture */}
      <div className="w-full edit-form-input flex justify-start">
        <div className="flex justify-center items-center">
          <p className="font-light text-font_light_gray text-[14px] mx-4">
            Profile Picture
          </p>
          <label className="w-[100px] h-[30px] self-center bg-font_dark_gray text-sm font-normal flex justify-center items-center text-white cursor-pointer">
            <p className="text-black text-[12px]">Choose Picture</p>
            <input
              name="profilePicture"
              type="file"
              hidden
              onChange={(e) => handleProfilePictureFile(e)}
            />
          </label>
        </div>
      </div>

      {/* cover picture */}
      <div className="w-full edit-form-input flex justify-start">
        <div className="flex justify-center items-center">
          <p className="font-light text-font_light_gray text-[14px] mx-4">
            Cover Picture
          </p>
          <label className="w-[100px] h-[30px] self-center bg-font_dark_gray text-sm font-normal flex justify-center items-center text-white cursor-pointer">
            <p className="text-black text-[12px]">Choose Picture</p>
            <input
              name="coverPicture"
              type="file"
              hidden
              onChange={(e) => handleCoverPictureFile(e)}
            />
          </label>
        </div>
      </div>

      {/* save button */}
      <div className="flex justify-end w-full my-5">
        <button
          disabled={isLoading}
          onClick={handleSubmit}
          className="flex justify-center items-center w-[120px] h-[40px] border-[0.2px] rounded-lg border-background_dark_blue font-bold text-[14px] bg-background_dark_blue text-white hover:bg-transparent hover:text-background_dark_blue"
        >
          {isLoading ? <Spinner size={13} /> : <>Save changes</>}
        </button>
      </div>
    </>
  );
};

export default EditProfileModal;
