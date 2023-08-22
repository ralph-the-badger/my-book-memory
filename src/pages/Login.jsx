import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Navigation from "../components/Navigation";
import Button from "../components/ui/Button";

import styles from "./Login.module.css";

function Login() {
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
    <main className={styles.login}>
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
          </div>
          <div className={styles.inputRow}>
            <label htmlFor="password">Passwort</label>
            <input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.buttonRow}>
            <Button type="secondary" onClick={() => navigate("/")}>
              zurück
            </Button>
            <Button type="primary">Anmelden</Button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Login;
