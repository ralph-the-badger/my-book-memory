import { useLogout } from "../hooks/useLogout";
import { useAuth } from "../context/authContext";

import { useNavigate } from "react-router-dom";

import Logo from "./Logo";
import Button from "./ui/Button";

import styles from "./Navigation.module.css";

function Navigation() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const { logout } = useLogout();

  function handleLogout() {
    logout();
  }

  return (
    <nav className={styles.navigation}>
      <Logo />
      <ul>
        {!user && (
          <>
            <Button type="primary" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button type="secondary" onClick={() => navigate("/register")}>
              Registrieren
            </Button>
          </>
        )}
        {user && (
          <>
            <span className={styles.welcome}>Hallo, {user.name}</span>
            <Button type="primary" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
