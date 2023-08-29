// import axios from "axios";
import { useState } from "react";

import { useRegister } from "../hooks/useRegister";

import { useNavigate } from "react-router-dom";

import Navigation from "../components/Navigation";
import Button from "../components/ui/Button";

import styles from "./Register.module.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, isLoading, error, success } = useRegister();

  async function handleSubmit(e) {
    e.preventDefault();
    const user = {
      name,
      email,
      password,
    };
    await register(user);
  }

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   if (!name) setError(["Bitte geben Sie einen Benutzernamen an!"]);
  //   if (!email) setError(["Bitte geben Sie eine E-Mail-Adresse an!"]);
  //   if (!password) setError(["Bitte geben Sie ein Passwort an!"]);
  //   const user = {
  //     name,
  //     email,
  //     password,
  //   };
  //   await registerUser(user);
  // }

  // async function registerUser(user) {
  //   try {
  //     const response = await axios({
  //       method: "POST",
  //       url: "http://localhost:5000/register",
  //       data: user,
  //     });
  //     const returnedUser = response.data;
  //     console.log(returnedUser);

  //     await response.json;
  //     setError([]);
  //     setSuccess(
  //       "Danke für Ihre Registrierung. Sie werden zum Login weitergeleitet."
  //     );
  //     setName("");
  //     setEmail("");
  //     setPassword("");
  //     // setTimeout(() => navigate("/login"), 2500);
  //   } catch (error) {
  //     let errorArray;
  //     const errorString = error.response.data;
  //     if (errorString.length > 1) {
  //       errorArray = errorString;
  //     } else {
  //       errorArray = [errorString];
  //     }
  //     setError(errorArray);
  //     setName("");
  //     setEmail("");
  //     setPassword("");
  //   }
  // }

  return (
    <main className={styles.register}>
      <Navigation />
      <section>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3 className={styles.registerHeading}>Registrieren</h3>
          <div className={styles.inputRow}>
            <label htmlFor="name">Benutzername</label>
            <input
              id="name"
              type="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            {/* <span className={styles.registerInfo}>
              Bitte wählen Sie einen Benutzernamen ohne Leerzeichen
            </span> */}
          </div>
          <div className={styles.inputRow}>
            <label htmlFor="email">E-Mail</label>
            <input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {/* <span className={styles.registerInfo}>
              Bitte geben Sie eine validate E-Mail-Adresse an
            </span> */}
          </div>
          <div className={styles.inputRow}>
            <label htmlFor="password">Passwort</label>
            <input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {/* <span className={styles.registerInfo}>
              Bitte wählen Sie ein sicheres Passwort
            </span> */}
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
              {isLoading ? "Sie werden registriert" : "Registrieren"}
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Register;
