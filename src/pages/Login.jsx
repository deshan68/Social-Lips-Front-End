import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogIn } from "../hooks/useLogIn";

import "react-activity/dist/Spinner.css";
import { Spinner } from "react-activity";

function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogIn();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
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

          {/* register button */}
          <button className="bg-button_blue text-white tablet:text-[16px] text-[10px] font-semibold h-[45px] rounded-md mb-8 flex justify-center items-center">
            {isLoading ? <Spinner size={13} /> : <>Log In</>}
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
              alt="logo"
              className="mr-2"
            />
            <p>Sign In with Google</p>
          </button>

          {/* login link */}
          <p className="text-white font-light tablet:text-[16px] text-[10px]  self-center">
            Don’t you have an account?
            <Link
              to={"/signup"}
              className="font-light tablet:text-[16px] text-[10px]  text-[#71A0F7] cursor-pointer"
            >
              {" "}
              Register Here
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default Login;
