import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Navigation from "../components/Navigation";
import Button from "../components/ui/Button";

import styles from "./Register.module.css";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) throw new Error("Bitte geben Sie einen Benutzernamen an!");
    if (!password) throw new Error("Bitte geben Sie ein Passwort an!");
    console.log(username, password);
  }

  return (
    <main className={styles.register}>
      <Navigation />
      <section>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputRow}>
            <label htmlFor="username">Benutzername</label>
            <input
              id="username"
              type="name"
              onChange={(e) => setUsername(e.target.value)}
            />
            <span className={styles.registerInfo}>
              Bitte wählen Sie einen Benutzernamen ohne Leerzeichen
            </span>
          </div>
          <div className={styles.inputRow}>
            <label htmlFor="password">Passwort</label>
            <input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className={styles.registerInfo}>
              Bitte wählen Sie ein sicheres Passwort
            </span>
          </div>
          <div className={styles.buttonRow}>
            <Button type="secondary" onClick={() => navigate("/")}>
              zurück
            </Button>
            <Button type="primary">Registrieren</Button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Register;
