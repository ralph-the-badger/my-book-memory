import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();
  const { loginAuth } = useAuth();

  const login = async (user) => {
    setIsLoading(true);
    setError(false);
    if (!user.email) setError(["Bitte gib eine E-Mail-Adresse an."]);
    if (!user.password) setError(["Bitte gib ein Passwort an."]);

    const response = await axios({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      url: `${import.meta.env.VITE_BACKEND_URL}/login`,
      data: user,
    });

    const returnedUser = response.data;

    if (response.status !== 200) {
      setIsLoading(false);
      setError(returnedUser.data);
      return { error };
    }
    if (response.status === 200) {
      // save user to localStorage
      localStorage.setItem("userData", JSON.stringify(returnedUser));

      // update auth context
      loginAuth(returnedUser);
      setIsLoading(false);

      setSuccess(
        "Du wurdest erfolgreich angemeldet. Du wirst in Kürze weitergeleitet."
      );

      setTimeout(() => navigate("/books"), 2000);
    }
  };
  return { login, isLoading, error, success };
};
