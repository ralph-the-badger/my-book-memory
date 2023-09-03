import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/authContext";

export const useAddBook = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();
  const { user } = useAuth();

  const addBook = async (formData) => {
    setIsLoading(true);
    setError(false);

    for (const pair of formData.entries()) {
      if (pair[0] === "title" && pair[1] === "") {
        setError(["Bitte geben Sie einen Titel an."]);
        return { error };
      }
      if (pair[0] === "authors" && pair[1] === "") {
        setError(["Bitte geben Sie mindestens einen Autor an"]);
        return { error };
      }
    }

    const response = await axios({
      method: "POST",
      url: "http://localhost:5000/books/add",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
      },
      data: formData,
    });
    const returnedBook = await response.data;

    if (!response.status === 200) {
      setIsLoading(false);
      setError(returnedBook.data);
      return { error };
    }
    if (response.status === 200) {
      setIsLoading(false);

      setSuccess(
        "Das Buch wurde erfolgreich angelegt. Sie werden in Kürze zu Ihrer Buch-Übersicht weitergeleitet."
      );

      setTimeout(() => navigate("/books"), 2000);
    }
  };
  return { addBook, isLoading, error, success };
};
