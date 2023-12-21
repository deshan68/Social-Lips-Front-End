import { useState, useEffect } from "react";
import axios from "axios"; // You might need to install and configure an HTTP client like axios

export const useAddComment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState(null);

  const addComment = async (
    postId,
    userId,
    commentText,
    userName,
    profilePic
  ) => {
    setLoading(true);
    axios({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      url: "http://localhost:8800/api/posts/addComment",
      data: JSON.stringify({
        postId,
        userId,
        commentText,
        userName,
        profilePic,
      }),
    })
      .then((res) => {
        setLoading(false);
        setComment(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  return {
    loading,
    error,
    comment,
    addComment,
  };
};
