import axios from "axios";
import { useState } from "react";

export const useGenerateSub = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [result, setResult] = useState(null);

  const generateSub = async (_fileId, _postId, downloadURL) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    axios({
      method: "GET",
      headers: { "Content-Type": "multipart/form-data" },
      url: `http://127.0.0.1:5000/download/${_fileId}`,
      params: { _postId },
    })
      .then((res) => {
        setIsLoading(false);
        console.log("Sub added successfully");
        // setResult("Upload Successfully");
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
        // setResult("Can't Uploaded");
      });
  };

  return { generateSub, isLoading, error, result, setIsLoading };
};
