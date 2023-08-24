import { useNavigate } from "react-router-dom";

import Logo from "./Logo";
import Button from "./ui/Button";

import styles from "./Navigation.module.css";

function Navigation() {
  const navigate = useNavigate();

  return (
    <nav className={styles.navigation}>
      <Logo />
      <ul>
        <li>Overview</li>
        <li>Add Book</li>
        <Button type="primary" onClick={() => navigate("/login")}>
          Login
        </Button>
        <Button type="secondary" onClick={() => navigate("/register")}>
          Registrieren
        </Button>
      </ul>
    </nav>
  );
}

export default Navigation;
