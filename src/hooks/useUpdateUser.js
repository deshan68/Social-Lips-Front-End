import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const useUpdateUser = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [result, setResult] = useState(null);
  const { id: paramsId } = useParams();

  const updateUser = async (
    adminId,
    firstName,
    lastName,
    bio,
    studying,
    lives,
    work,
    relationship,
    profilePic,
    coverPic
  ) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const frmData = new FormData();
    frmData.append("adminId", adminId);
    frmData.append("profilePicture", profilePic);
    frmData.append("coverPicture", coverPic);
    frmData.append("first_name", firstName);
    frmData.append("last_name", lastName);
    frmData.append("bio", bio);
    frmData.append("lives_in", lives);
    frmData.append("studying_at", studying);
    frmData.append("work_at", work);
    frmData.append("in_relationship", relationship);

    axios({
      method: "PUT",
      headers: { "Content-Type": "multipart/form-data" },
      url: `http://localhost:8800/api/users/${paramsId}`,
      data: frmData,
    })
      .then((res) => {
        setIsLoading(false);
        setResult(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };

  return { updateUser, isLoading, error, result };
};
