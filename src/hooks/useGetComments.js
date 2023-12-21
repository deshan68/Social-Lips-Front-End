import axios from "axios";
import { useState } from "react";

export const useGetComments = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);

  const getComments = async (postId) => {
    setIsLoading(true);
    setError(null);

    axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },
      url: "http://localhost:8800/api/posts/comments",
      params: {
        postId,
      },
    })
      .then((res) => {
        setIsLoading(false);
        setComments(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.error);
      });
  };

  return { getComments, isLoading, error, comments };
};
