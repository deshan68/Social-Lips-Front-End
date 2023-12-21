import axios from "axios";
import { useState } from "react";

export const useGetUser = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState("");

  const getUser = async (user_id) => {
    setIsLoading(true);
    setError(null);

    axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },
      url: `http://localhost:8800/api/users/${user_id}`,
    })
      .then((res) => {
        setIsLoading(false);
        setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };

  return { getUser, isLoading, error, user };
};
