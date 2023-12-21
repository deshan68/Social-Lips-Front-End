import { useState } from "react";
import axios from "axios";

export const useLikeDislike = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [likeValue, setLikeValue] = useState(null);

  const likeDislike = async (postId, userId) => {
    setIsLoading(true);
    setError(null);

    const frmData = new FormData();
    frmData.append("userId", userId);
    axios({
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      url: `http://localhost:8800/api/posts/${postId}/like`,
      data: frmData,
    })
      .then((res) => {
        setIsLoading(false);
        setLikeValue(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
        console.log(err);
      });
  };

  return { likeDislike, likeValue, isLoading, error };
};
