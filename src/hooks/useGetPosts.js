import axios from "axios";
import { useState } from "react";

export const useGetPosts = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [posts, setPosts] = useState("");

  const getPosts = async (user_id) => {
    setIsLoading(true);
    setError(null);

    axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },
      url: "http://localhost:8800/api/posts",
      params: {
        user_id,
      },
    })
      .then((res) => {
        setIsLoading(false);
        setPosts(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };

  return { getPosts, isLoading, error, posts };
};
