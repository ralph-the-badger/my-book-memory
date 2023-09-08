import { useState } from "react";

import { useLogin } from "../hooks/useLogin";

import { useNavigate } from "react-router-dom";

import Navigation from "../components/Navigation";
import Button from "../components/ui/Button";

import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();

  const { login, isLoading, error, success } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    await login(user);
  }

  return (
    <main className={styles.login}>
      <Navigation />
      <section>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3 className={styles.loginHeading}>Login</h3>
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
              {isLoading ? "Du wirst angemeldet" : "Anmelden"}
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Login;
