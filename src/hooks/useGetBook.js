import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/authContext";

export const useGetBook = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  const getBook = async (id) => {
    setIsLoading(true);
    setError(false);
    const response = await axios({
      method: "GET",
      url: `${import.meta.env.VITE_BACKEND_URL}/books/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }).catch((e) => {
      console.log(e.response.data);
      if (e.response.data.error.includes("Session")) {
        setTimeout(() => {
          navigate("/login");
          localStorage.removeItem("userData");
        }, 3000);
        setError(["Die Session ist abgelaufen. Bitte melde dich erneut an."]);
      } else {
        setError([e.response.data]);
      }
    });

    const returnedBook = response.data;

    if (!response.status === 200) {
      setIsLoading(false);
      setError(returnedBook.data);
      return { error };
    }
    if (response.status === 200) {
      setIsLoading(false);
    }
  };
  return { getBook, isLoading, error };
};
