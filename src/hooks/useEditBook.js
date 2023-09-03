import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useAuth } from "../context/authContext";

export const useEditBook = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [success, setSuccess] = useState(null);

  //   const navigate = useNavigate();
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

  // const getBookData = async () => {
  //   setIsLoading(true);
  //   setError(false);
  //   try {
  //     const response = await axios({
  //       method: "get",
  //       url: `http://localhost:5000/books/${id}`,
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     });

  //     if (!response || response.status !== 200) {
  //       throw new Error(
  //         "Beim Laden des Buchs ist ein Fehler aufgetreten. Bitte stellen Sie sicher, dass Sie angemeldet sind."
  //       );
  //     }

  //     if (response.status === 200) {
  //       setTitle(() => response.data.book[0].title);
  //       setSubtitle(() => response.data.book[0].subtitle);
  //       setAuthors(() =>
  //         response.data.book[0].authors.map((a) => a.author).join()
  //       );
  //       setPublished(() => new Date(response.data.book[0].published));

  //       setGenre(() =>
  //         response.data.book[0].genre === undefined
  //           ? "None"
  //           : response.data.book[0].genre
  //       );
  //       setContent(() => {
  //         const contentArray = response.data.book[0].content.map(
  //           (c) => c.paragraph
  //         );
  //         const modifiedContent = contentArray.join("|||");
  //         const paragraphedContent = String(modifiedContent).replaceAll(
  //           "|||",
  //           "\n"
  //         );
  //         return paragraphedContent;
  //       });
  //     }
  //   } catch (e) {
  //     setError(e.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return { editBook, isLoading, error, success };
};
