import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/authContext";
import Navigation from "../components/Navigation";
import BooksCard from "./BooksCard";

import styles from "./Books.module.css";

function Books() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    async function getBooks() {
      try {
        setIsLoading(true);
        setError("");

        const res = await axios({
          method: "get",
          url: `${import.meta.env.VITE_BACKEND_URL}/books`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }).catch((e) => {
          if (e.response.data.error.includes("Session")) {
            setTimeout(() => navigate("/login"), 3000);
            setError([
              "Die Session ist abgelaufen. Bitte melde dich erneut an. Du wirst in Kürze zum Login weitergeleitet.",
            ]);
          } else {
            setError([e.response.data]);
          }
        });

        if (!res || res.status !== 200) {
          throw new Error(
            "Beim Laden der Bücher ist ein Fehler aufgetreten. Bitte vergewissere dich, dass du angemeldet bist."
          );
        }
        if (res.status === 200) {
          setBooks(res.data.books);
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    }
    getBooks();
  }, [user]);

  return (
    <main className={styles.booksOverview}>
      <Navigation />
      {error && (
        <section className={styles.messageSection}>
          <div className={styles.errorContainer}>
            <p>{error}</p>
          </div>
        </section>
      )}
      {isLoading && (
        <section className={styles.messageSection}>
          {isLoading && <p>Ihre Bücher werden geladen ...</p>}
          {error && <p>{error}</p>}
        </section>
      )}
      {!error && books && books.length === 0 && (
        <section>
          <h1>Meine Buch-Übersicht</h1>
          <p>Sie haben noch keine Bücher eingetragen.</p>
        </section>
      )}
      {books && books.length > 0 && (
        <section>
          <h1>Meine Buch-Übersicht</h1>
          <ul className={styles.list}>
            {books.map((book) => (
              <BooksCard key={book._id} book={book} />
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

export default Books;
