import React, { useEffect, useState } from "react";
import Login from "./Login";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FileUpload from "../components/FileUpload";
import axios from "axios";
import { useVideoUpload } from "../hooks/useVideoUpload";

const imgURL =
  "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

function Test(props) {
  const [files, setFile] = useState();
  const { videoUpload, isLoading } = useVideoUpload();

  function handleFile(e) {
    setFile(e.target.files[0]);
  }

  const uploadHandler = async () => {
    if (!files) return;
    await videoUpload(files);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8800/list")
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  return (
    <div className="bg-slate-800 mx-auto max-w-xl flex flex-col mt-5 p-3 rounded-md gap-3">
      <div className="flex justify-between gap-3">
        <img
          className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
          src={imgURL}
        />
        <input
          type="text"
          className="rounded-md w-full bg-slate-700 border-0 text-white"
          placeholder="What's happening?"
        />
      </div>
      <div className="flex flex-row gap-2">
        <div className="w-1/2">
          <label
            onChange={handleFile}
            htmlFor="formId"
            className="w-full self-center bg-blue-800 rounded-md text-lg font-semibold text-white p-2 flex justify-center cursor-pointer"
          >
            <p className="cursor-pointer">Choose video</p>
            <input name="" type="file" id="formId" hidden className="w-1/2" />
          </label>
        </div>
        <button
          className="w-1/2 self-center bg-blue-800 rounded-md text-lg font-semibold text-white p-2 disabled:opacity-30 disabled:cursor-not-allowed"
          disabled={files === ""}
          onClick={uploadHandler}
        >
          Upload
        </button>
      </div>
      {isLoading ? <h1>Loading</h1> : <h1>Uploaded</h1>}
      <img src="https://social-lips.s3.ap-south-1.amazonaws.com/daf712f6a2977f0172ab6a0eefa0a7360e04dc748d3f28d07111a53db6cb26ea?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIATVMCFFMCIUHMGIXF%2F20230730%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230730T083752Z&X-Amz-Expires=3600&X-Amz-Signature=fa3bf8e226d7f42618717a7111f55b609164be8ac86710cd3786819c96620527&X-Amz-SignedHeaders=host&x-id=GetObject" />
    </div>
  );
}

export default Test;
