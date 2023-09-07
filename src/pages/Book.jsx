import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useAuth } from "../context/authContext";
import Navigation from "../components/Navigation";
import Button from "../components/ui/Button";

import styles from "./Book.module.css";

function formatDate(date) {
  const formattedDate = String(date).split("T")[0].split("-")[0];
  return formattedDate;
}

function Book() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [book, setBook] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [success, setSuccess] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    async function getBook() {
      try {
        setIsLoading(true);
        setError("");

        if (!user) {
          setTimeout(() => navigate("/login"), 3000);
          throw new Error(
            "Die Session ist abgelaufen. Bitte melden Sie sich erneut an. Sie werden zum Login weitergeleitet."
          );
        }

        const res = await axios({
          method: "get",
          url: `http://localhost:5000/books/${id}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }).catch(() => {
          setTimeout(() => navigate("/login"), 3000);
          throw new Error(
            "Die Session ist abgelaufen. Bitte melden Sie sich erneut an."
          );
        });

        if (!res || res.status !== 200) {
          throw new Error(
            "Beim Laden des Buchs ist ein Fehler aufgetreten. Bitte stellen Sie sicher, dass Sie angemeldet sind."
          );
        }

        if (res.status === 200) {
          setBook(res.data.book);
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    }
    getBook();
  }, [user]);

  async function deleteBook() {
    try {
      const res = await axios({
        method: "delete",
        url: `http://localhost:5000/books/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!res || res.status !== 200) {
        throw new Error(
          "Beim Löschen des Buchs ist ein Fehler aufgetreten. Bitte versuchen Sie es noch einmal."
        );
      }

      if (res.status === 200) {
        setSuccess(
          "Das Buch wurde erfolgreich gelöscht. Sie werden in Kürze zu Ihrer Buch-Übersicht weitergeleitet."
        );
        setTimeout(() => navigate("/books"), 2000);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className={styles.bookDetails}>
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
      {!error && book && book.length > 0 && (
        <>
          <section
            className={`${styles.bookDetailsSection} ${styles.bookDetailsMetaSection}`}
          >
            {book.map((b) => (
              <Fragment key={b._id}>
                <div className={styles.bookDetailsMeta}>
                  {b.subtitle ? (
                    <h1 className={styles.bookDetailsHeading}>
                      {b.title} -
                      <br />
                      <span className={styles.bookDetailsSubheading}>
                        {b.subtitle}
                      </span>
                    </h1>
                  ) : (
                    <h1 className={styles.bookDetailsHeading}>{b.title}</h1>
                  )}
                  <p className={styles.bookDetailsAuthors}>
                    {b.authors.length === 1 ? (
                      <strong>Autor: </strong>
                    ) : (
                      <strong>Autoren: </strong>
                    )}
                    {b.authors.map((author) => (
                      <span key={author.id}>{author.author}</span>
                    ))}
                  </p>
                  <p className={styles.bookDetailsGenre}>
                    <strong>Genre: </strong>
                    {b.genre}
                  </p>
                  <p className={styles.bookDetailsPublished}>
                    <strong>erschienen: </strong>
                    {formatDate(b.published)}
                  </p>
                </div>
                <div className={styles.bookDetailsImage}>
                  {b.image ? (
                    <img src={`/images/${b.image}`} alt={b.title} />
                  ) : (
                    <img src={`/images/book-logo.png`} alt="Book Memory Logo" />
                  )}
                </div>
              </Fragment>
            ))}
          </section>
          <section
            className={`${styles.bookDetailsSection} ${styles.bookDetailsContentSection}`}
          >
            <h2>Inhalt</h2>
            {book.map((b) => (
              <Fragment key={b._id}>
                {b.content.map((c) => (
                  <p key={c.id} className={styles.bookDetailsContentParagraph}>
                    {c.paragraph}
                  </p>
                ))}
              </Fragment>
            ))}
          </section>
          {success && (
            <section className={styles.messageSection}>
              {success !== null && (
                <div className={styles.successContainer}>
                  <p>{success}</p>
                </div>
              )}
            </section>
          )}
          <section className={styles.buttonRow}>
            <Button
              disabled={isLoading}
              type="primary"
              onClick={() => navigate("/books")}
            >
              zurück
            </Button>
            <Button disabled={isLoading} type="error" onClick={deleteBook}>
              Buch löschen
            </Button>
            <Button
              disabled={isLoading}
              type="tertiary"
              onClick={() => navigate(`/books/${id}/edit`)}
            >
              Buch editieren
            </Button>
          </section>
        </>
      )}
    </main>
  );
}

export default Book;
