import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSignUp } from "../hooks/useSignUp";

import "react-activity/dist/Spinner.css";
import { Spinner } from "react-activity";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [file, setFile] = useState();

  const { signup, isLoading, error } = useSignUp();

  function handleFile(e) {
    setFile(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password, file, firstName, lastName);
  };
  return (
    <main className="flex justify-center">
      {/* logo section */}
      <div className="bg-background_dark_blue text-white h-screen w-1/2 tablet:flex justify-center items-center flex-col hidden">
        <img src="../src/assets/logo.png" alt="logo" width={320} height={320} />
        <h1 className="text-[64px] font-extrabold">Social Lips</h1>
        <p className="text-[20px] font-light leading-3">SOUL FOR SILENT LIPS</p>
      </div>
      {/* sign up form section */}
      <div className="bg-background_light_blue tablet:w-1/2 min-w-[370px] h-screen tablet:px-40 px-4 flex flex-col justify-center">
        <h1 className="text-white text-[24px] font-medium mb-10">
          Hey, Hello 👋
        </h1>
        <form action="POST" onSubmit={handleSubmit} className="flex flex-col">
          {/* name row */}
          <div className="flex w-full justify-between items-center">
            <input
              type="text"
              placeholder="First Name"
              className="text_input w-[200px]"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="text_input w-[200px]"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* email row */}
          <input
            type="email"
            placeholder="Enter Your Email"
            className="text_input"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* password email */}
          <input
            type="password"
            placeholder="Enter Your Password"
            className="text_input"
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* choose file */}
          <div className="flex items-center mb-8">
            <label
              onChange={handleFile}
              htmlFor="formId"
              className="w-[100px] h-[45px] self-center bg-input_box_gray rounded-md text-sm font-normal flex justify-center items-center text-white cursor-pointer"
            >
              <p className="tablet:text-[12px] text-[10px] ">Choose Picture</p>
              <input name="" type="file" id="formId" hidden />
            </label>
            <p className="font-light text-font_dark_gray tablet:text-[14px] text-[10px]  ml-2 ">
              Profile Picture
            </p>
          </div>

          {/* register button */}
          <button
            disabled={isLoading}
            className="bg-button_blue text-white tablet:text-[16px] text-[10px] font-semibold h-[45px] rounded-md mb-8 flex justify-center items-center"
          >
            {isLoading ? <Spinner size={13} /> : <>Register</>}
          </button>

          {/* -----OR----- */}
          <div className="flex items-center justify-center w-full mb-8">
            <div className="bg-input_box_gray h-[1px] w-full " />
            <p className="mx-2 text-input_box_gray">OR</p>
            <div className="bg-input_box_gray h-[1px] w-full " />
          </div>

          {/* google button */}
          <button className="bg-white text-black tablet:text-[16px] text-[10px] font-semibold h-[45px] rounded-md flex justify-center items-center mb-8">
            <img
              src="../src/assets/google.svg"
              height={20}
              width={20}
              className="mr-2"
            />
            <p>Sign Up with Google</p>
          </button>

          {/* signup link */}
          <p className="text-white font-light tablet:text-[16px] text-[10px]  self-center">
            Already you have an account?
            <Link
              to={"/login"}
              className="font-light tablet:text-[16px] text-[10px]  text-[#71A0F7] cursor-pointer"
            >
              {" "}
              Login Here
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default SignUp;
