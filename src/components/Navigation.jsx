import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useLogout } from "../hooks/useLogout";
import { useAuth } from "../context/authContext";

import Logo from "./Logo";
import Button from "./ui/Button";

import styles from "./Navigation.module.css";

function Navigation() {
  const navRef = useRef();

  const navigate = useNavigate();

  const { user } = useAuth();

  const { logout } = useLogout();

  function handleLogout() {
    logout();
  }

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header className={styles.header}>
      <Logo />
      <nav className={styles.navigation} ref={navRef}>
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
              <Button type="secondary" onClick={() => navigate("/books")}>
                Buch-Übersicht
              </Button>
              <Button type="secondary" onClick={() => navigate("/books/add")}>
                Buch hinzufügen
              </Button>
              <Button type="primary" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
          <button
            className={`${styles["nav-btn"]} ${styles["nav-close-btn"]}`}
            onClick={showNavbar}
          >
            <FaTimes />
          </button>
        </ul>
      </nav>
      <button className={styles["nav-btn"]} onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navigation;
