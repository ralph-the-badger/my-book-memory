import axios from "axios";
import { useState } from "react";

import { useAuth } from "../context/authContext";

export const useGetBook = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { user } = useAuth();

  const getBook = async (id) => {
    setIsLoading(true);
    setError(false);
    const response = await axios({
      method: "GET",
      url: `http://localhost:5000/books/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
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
