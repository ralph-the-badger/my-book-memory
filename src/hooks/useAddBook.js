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
    // if (!book.title) setError(["Bitte geben Sie einen Buchtitel an!"]);
    // if (!book.authors) setError(["Bitte geben Sie einen Autor an!"]);
    const response = await axios({
      method: "POST",
      url: "http://localhost:5000/books/add",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
      },
      data: formData,
    });
    const returnedBook = response.data;

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
