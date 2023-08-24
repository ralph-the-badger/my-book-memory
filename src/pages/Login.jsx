import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navigation from "../components/Navigation";
import Button from "../components/ui/Button";

import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) setError(["Bitte geben Sie eine E-Mail-Adresse an!"]);
    if (!password) setError(["Bitte geben Sie ein Passwort an!"]);
    const user = { email, password };
    loginUser(user);
  }

  async function loginUser(user) {
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:5000/login",
        data: user,
      });
      console.log({ response });
      await response.json;
      setError([]);
      setSuccess(
        "Die Anmeldung war erfolgreich. Sie werden in Kürze weitergeleitet."
      );
      setEmail("");
      setPassword("");
      setTimeout(() => navigate("/user"), 2500);
    } catch (e) {
      let errorArray;
      const errorString = error.response.data;
      if (errorString.length > 1) {
        errorArray = errorString;
      } else {
        errorArray = [errorString];
      }
      setError(errorArray);
      setEmail("");
      setPassword("");
    }
  }

  return (
    <main className={styles.login}>
      <Navigation />
      <section>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputRow}>
            <label htmlFor="email">E-Mail</label>
            <input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
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
