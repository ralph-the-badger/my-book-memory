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

    const response = await axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      url: `http://localhost:5000/books/edit`,
      data: book,
    }).catch(() => {
      setTimeout(() => navigate("/login"), 3000);
      setError([
        "Die Session ist abgelaufen. Bitte melden Sie sich erneut an.",
      ]);
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
        "Das Buch wurde erfolgreich angepasst. Sie werden in Kürze zu Ihrem Buch weitergeleitet."
      );

      setTimeout(() => navigate(`/books/${id}`), 2000);
    }
  };

  return { editBook, isLoading, error, success };
};
