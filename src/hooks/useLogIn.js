import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogIn = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    axios({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      url: "http://localhost:8800/api/auth/login",
      data: JSON.stringify({ email, password }),
    })
      .then((res) => {
        setIsLoading(false);
        const json = res.data;

        //save the user to local storage
        localStorage.setItem("user", JSON.stringify(json));
        //update the auth context
        dispatch({ type: "LOGIN", payload: json });
      })
      .catch((err) => {
        setIsLoading(false);
        // alert("error");
        setError(err);
        console.log(err);
      });
  };

  return { login, isLoading, error };
};
