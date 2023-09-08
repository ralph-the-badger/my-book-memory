import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();
  const { loginAuth } = useAuth();

  const register = async (user) => {
    setIsLoading(true);
    setError(false);
    if (!user.accessCode)
      setError(["Bitte gib einen validen Freigabe-Code ein."]);
    if (!user.name) setError(["Bitte gib einen Benutzernamen an."]);
    if (!user.email) setError(["Bitte gib eine E-Mail-Adresse an."]);
    if (!user.password) setError(["Bitte gib ein Passwort an."]);

    const response = await axios({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      url: `${import.meta.env.VITE_BACKEND_URL}/register`,
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
        "Danke für deine Registrierung. Du wirst zum Login weitergeleitet."
      );

      setTimeout(() => navigate("/login"), 2500);
    }
  };
  return { register, isLoading, error, success };
};
