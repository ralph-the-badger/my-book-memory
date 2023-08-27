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
    if (!user.email) setError(["Bitte geben Sie eine E-Mail-Adresse an!"]);
    if (!user.password) setError(["Bitte geben Sie ein Passwort an!"]);

    const response = await axios({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      url: "http://localhost:5000/login",
      data: user,
    });

    const returnedUser = response.data;

    if (response.status === 400) {
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
        "Sie wurden erfolgreich angemeldet. Sie werden in Kürze weitergeleitet."
      );

      setTimeout(() => navigate("/books"), 2500);
    }
  };
  return { login, isLoading, error, success };
};
