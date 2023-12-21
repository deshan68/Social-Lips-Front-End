import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, file, first_name, last_name) => {
    setIsLoading(true);
    setError(null);

    // const response = await fetch("http://localhost:8800/api/auth/register", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, password }),
    // });

    // const json = await response.json();

    // if (!response.ok) {
    //   setIsLoading(false);
    //   alert("error");

    //   setError(json.error);
    // }
    // if (response.ok) {
    //   setIsLoading(false);
    //   alert("ok");
    // }

    // axios create
    const frmData = new FormData();
    frmData.append("file", file);
    frmData.append("password", password);
    frmData.append("email", email);
    frmData.append("first_name", first_name);
    frmData.append("last_name", last_name);

    axios({
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      url: "http://localhost:8800/api/auth/register",
      data: frmData,
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

  return { signup, isLoading, error };
};
