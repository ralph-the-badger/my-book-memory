import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const useLogout = () => {
  const navigate = useNavigate();
  const { logoutAuth } = useAuth();

  const logout = () => {
    // remove local storage
    localStorage.removeItem("userData");

    // logout
    logoutAuth();
    setTimeout(() => navigate("/login"), 1000);
  };
  return { logout };
};
