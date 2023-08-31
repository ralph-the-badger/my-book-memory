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

    // for (const pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }

    for (const pair of formData.entries()) {
      // if (pair[0] === "title") {
      //   if (pair[1] === "") {
      //     setError(["Bitte geben Sie bitte einen Buchtitel an!"]);
      //     return { error };
      //   }
      // }
      // if (pair[0] === "authors") {
      //   console.log(pair[1]);
      //   if (pair[1] === "") {
      //     setError(["Bitte geben Sie bitte mind. einen Autor an!"]);
      //     return { error };
      //   }
      // }
      if (pair[0] === "filename") {
        if (!pair[1].match(/^[a-zA-Z 0-9.,_-]*$/)) {
          setError([
            "Bitte stellen Sie sicher, dass im Dateinamen keine Leerzeichen, Umlaute und Sonderzeichen (Ausnahme: _ und -) enthalten sind, da es sonst zu Komplikationen bei der Bereitstellung von Bildern kommen kann.",
          ]);
          return { error };
        }
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
    const returnedBook = response.data;

    // if (response.code === "ERR_BAD_REQUEST") {
    //   setError([
    //     "Die Daten können aufgrund eines Server-Fehlers nicht verarbeitet werden.",
    //   ]);
    //   return { error };
    // }

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
