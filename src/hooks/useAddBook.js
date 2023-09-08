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
        setError(["Bitte gib einen Titel an."]);
        return { error };
      }
      if (pair[0] === "authors" && pair[1] === "") {
        setError(["Bitte gib mindestens einen Autor an."]);
        return { error };
      }
    }

    const response = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_BACKEND_URL}/books/add`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
      },
      data: formData,
    }).catch((e) => {
      console.log(e.response.data);
      if (e.response.data.error.includes("Session")) {
        setTimeout(() => navigate("/login"), 3000);
        setError(["Die Session ist abgelaufen. Bitte melde dich erneut an."]);
      } else {
        setError([e.response.data]);
      }
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
        "Das Buch wurde erfolgreich angelegt. Du wirst in Kürze zu deiner Buch-Übersicht weitergeleitet."
      );

      setTimeout(() => navigate("/books"), 2000);
    }
  };
  return { addBook, isLoading, error, success };
};
