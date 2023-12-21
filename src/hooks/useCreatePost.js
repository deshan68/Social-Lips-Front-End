import axios from "axios";
import { useState } from "react";

export const useCreatePost = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [newPost, setNewPost] = useState(null);
  const [result, setResult] = useState(null);

  const createPost = async (
    user_id,
    description,
    img_url,
    postType,
    subtitleEnabled
  ) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const _subtitleStatus = subtitleEnabled ? "generating" : null;

    const frmData = new FormData();
    frmData.append("img_url", img_url);
    frmData.append("user_id", user_id);
    frmData.append("description", description);
    frmData.append("postType", postType);
    frmData.append("subtitle_status", _subtitleStatus);

    axios({
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      url: "http://localhost:8800/api/posts",
      data: frmData,
    })
      .then((res) => {
        setIsLoading(false);
        setNewPost(res.data);
        setResult("Upload Successfully");
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
        setResult("Can't Uploaded");
      });
  };

  return { createPost, newPost, isLoading, error, result, setIsLoading };
};
