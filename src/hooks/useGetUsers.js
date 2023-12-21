import axios from "axios";
import { useState } from "react";

export const useGetUsers = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState("");

  const getUsers = async (user_id) => {
    setIsLoading(true);
    setError(null);

    axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },
      url: "http://localhost:8800/api/users",
      params: {
        user_id,
      },
    })
      .then((res) => {
        setIsLoading(false);
        setUsers(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };

  return { getUsers, isLoading, error, users };
};
