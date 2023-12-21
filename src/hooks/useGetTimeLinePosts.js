import axios from "axios";
import { useState } from "react";

export const useGetTimeLinePosts = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [timelinePosts, setTimelinePosts] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const getTimelinePosts = async (user_id, page_number) => {
    setIsLoading(true);
    setError(null);
    setTimelinePosts("");

    axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },
      url: "http://localhost:8800/api/posts/timeline/all",
      params: {
        user_id,
        page_number,
      },
    })
      .then((res) => {
        setIsLoading(false);
        const data = res.data;

        // Convert createdAt strings to Date objects
        const formattedData = data.map((post) => ({
          ...post,
          createdAt: new Date(post.createdAt),
        }));
        // Sort the posts by createdAt in ascending order
        formattedData.sort((a, b) => b.createdAt - a.createdAt);

        setTimelinePosts(formattedData);
        formattedData.length === 0 ? setHasMore(false) : null;
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };

  return {
    getTimelinePosts,
    isLoading,
    error,
    timelinePosts,
    hasMore,
    setTimelinePosts,
  };
};
