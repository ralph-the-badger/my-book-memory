// import axios from "axios";
import { useState } from "react";

import { useRegister } from "../hooks/useRegister";

import { useNavigate } from "react-router-dom";

import Navigation from "../components/Navigation";
import Button from "../components/ui/Button";

import styles from "./Register.module.css";

function Register() {
  const navigate = useNavigate();

  const [accessCode, setAccessCode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, isLoading, error, success } = useRegister();

  async function handleSubmit(e) {
    e.preventDefault();
    const user = {
      accessCode,
      name,
      email,
      password,
    };
    await register(user);
  }

  return (
    <main className={styles.register}>
      <Navigation />
      <section>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3 className={styles.registerHeading}>Registrieren</h3>
          <div className={styles.inputRow}>
            <label htmlFor="accessCode">Freigabe-Code *</label>
            <input
              id="accessCode"
              type="accessCode"
              onChange={(e) => setAccessCode(e.target.value)}
              value={accessCode}
            />
          </div>
          <div className={styles.inputRow}>
            <label htmlFor="name">Benutzername *</label>
            <input
              id="name"
              type="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className={styles.inputRow}>
            <label htmlFor="email">E-Mail *</label>
            <input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className={styles.inputRow}>
            <label htmlFor="password">Passwort *</label>
            <input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          {error && (
            <div className={styles.errorContainer}>
              <ul>
                {error.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}
          {success !== null && (
            <div className={styles.successContainer}>
              <p>{success}</p>
            </div>
          )}
          <div className={styles.buttonRow}>
            <Button
              disabled={isLoading}
              type="secondary"
              onClick={() => navigate("/")}
            >
              zurück
            </Button>
            <Button disabled={isLoading} type="primary">
              {isLoading ? "Du wirst registriert" : "Registrieren"}
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Register;
