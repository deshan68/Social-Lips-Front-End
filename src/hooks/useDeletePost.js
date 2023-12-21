import { useState, useEffect } from "react";
import axios from "axios"; // You might need to install and configure an HTTP client like axios

export const useDeletePost = () => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const deletePost = async (userId, postId) => {
    setLoading(true);
    axios({
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      url: `http://localhost:8800/api/posts/${postId}`,
      data: JSON.stringify({
        userId,
      }),
    })
      .then((res) => {
        setLoading(false);
        setResult(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  return {
    loading,
    error,
    result,
    deletePost,
    setLoading,
  };
};
