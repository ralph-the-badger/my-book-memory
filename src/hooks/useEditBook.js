import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useAuth } from "../context/authContext";

export const useEditBook = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [success, setSuccess] = useState(null);

  const { user } = useAuth();

  const navigate = useNavigate();

  const { id } = useParams();

  const editBook = async (book) => {
    setIsLoading(true);
    setError(false);

    console.log("BOOK: " + book.bookId);

    const response = await axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      url: `${import.meta.env.VITE_BACKEND_URL}/books/edit`,
      data: book,
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

    const editedBook = await response.data;

    if (!response.status === 200) {
      setIsLoading(false);
      setError(editedBook.data);
      return { error };
    }
    if (response.status === 200) {
      setIsLoading(false);

      setSuccess(
        "Das Buch wurde erfolgreich angepasst. Du wirst in Kürze zu deinem Buch weitergeleitet."
      );

      setTimeout(() => navigate(`/books/${id}`), 2000);
    }
  };

  return { editBook, isLoading, error, success };
};
