import { useState, useEffect } from "react";
import axios from "axios"; // You might need to install and configure an HTTP client like axios

export const useFollowUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [resultUserId, setResultUserId] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  const followUser = async (paramsId, userId) => {
    setLoading(true);
    setResult(null);
    setLoadingId(paramsId);

    axios({
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      url: `http://localhost:8800/api/users/${paramsId}/follow`,
      data: JSON.stringify({
        userId,
      }),
    })
      .then((res) => {
        setResult("Following");
        setResultUserId(paramsId);
        setLoading(false);
        setLoadingId(null);
      })
      .catch((err) => {
        setLoading(false);
        setLoadingId(null);
        setError(err);
      });
  };

  return {
    loading,
    error,
    result,
    followUser,
    setResult,
    resultUserId,
    loadingId,
  };
};
