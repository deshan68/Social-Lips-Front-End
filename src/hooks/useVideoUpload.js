import { useState } from "react";
import axios from "axios";

export const useVideoUpload = () => {
  const [isLoading, setIsLoading] = useState(true);

  const videoUpload = (files) => {
    if (!files) return;
    setIsLoading(true);
    const frmData = new FormData();
    frmData.append("file", files);
    frmData.append("email", "email");
    frmData.append("email", "email");

    axios({
      method: "POST",
      url: "http://localhost:8800/api/video/upload",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: frmData,
    })
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        // setProgress((res.data.loaded / res.data.total) * 100);
        // console.log((res.data.loaded / res.data.total) * 100);
      })
      .catch((err) => console.log(err));

    // axios
    //   .post("http://localhost:8800/upload", {
    //     file: files,
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };

  return { videoUpload, isLoading };
};
