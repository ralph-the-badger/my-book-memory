import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

import { useEditBook } from "../hooks/useEditBook.js";
import { useAuth } from "../context/authContext";

import Navigation from "../components/Navigation";
import SelectGenre from "../components/SelectGenre";
import Button from "../components/ui/Button";

import styles from "./EditBook.module.css";
import "react-datepicker/dist/react-datepicker.css";

function EditBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const { editBook, success } = useEditBook();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [published, setPublished] = useState(new Date());
  // const [image, setImage] = useState(null);
  // const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const [genre, setGenre] = useState("");

  function handleGenreSelect(e) {
    e.preventDefault();
    setGenre(e.target.value);
  }

  // create array from multiple entries divided by seperator
  const join = (arr, sep = "|") =>
    arr[0] ? arr.reduce((acc, item) => acc + sep + item) : "";

  // save multiple authors
  const authorSplittedByComma = authors.split(",");
  const authorsArray = join(authorSplittedByComma);

  // save multiline textarea
  const contentSplittedByLineBreak = content.split("\n");
  const contentArray = join(contentSplittedByLineBreak);

  async function handleEditBook(e) {
    e.preventDefault();

    if (title === "") {
      console.log("ja");
      setError(["Bitte geben Sie einen Titel an."]);
      return { error };
    }
    if (authors === "") {
      console.log("ja");
      setError(["Bitte geben Sie mindestens einen Autor an"]);
      return { error };
    }

    const book = {
      bookId: id,
      title,
      subtitle,
      authors: authorsArray,
      published,
      genre,
      content: contentArray,
    };

    await editBook(book);
  }

  useEffect(() => {
    isAuthenticated ? navigate(`/books/${id}/edit`) : navigate("/books");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    async function getEditBook() {
      try {
        setIsLoading(true);
        setError("");

        const res = await axios({
          method: "get",
          url: `http://localhost:5000/books/${id}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!res || res.status !== 200) {
          throw new Error(
            "Beim Laden des Buchs ist ein Fehler aufgetreten. Bitte stellen Sie sicher, dass Sie angemeldet sind."
          );
        }

        if (res.status === 200) {
          setTitle(() => res.data.book[0].title);
          setSubtitle(() => res.data.book[0].subtitle);
          setAuthors(() =>
            res.data.book[0].authors.map((a) => a.author).join()
          );
          setPublished(() => new Date(res.data.book[0].published));
          setGenre(() =>
            res.data.book[0].genre === undefined
              ? "None"
              : res.data.book[0].genre
          );
          setContent(() => {
            const contentArray = res.data.book[0].content.map(
              (c) => c.paragraph
            );
            const modifiedContent = contentArray.join("|||");
            const paragraphedContent = String(modifiedContent).replaceAll(
              "|||",
              "\n"
            );
            return paragraphedContent;
          });
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    }
    getEditBook();
  }, [user, id]);

  return (
    <main className={styles.editBook}>
      <Navigation />
      <section>
        <form className={styles.form} onSubmit={handleEditBook}>
          <div className={styles.inputRow}>
            <label htmlFor="title">Buchtitel</label>
            <input
              id="title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className={styles.inputRow}>
            <label htmlFor="title">Untertitel</label>
            <input
              id="subtitle"
              type="text"
              onChange={(e) => setSubtitle(e.target.value)}
              value={subtitle}
            />
          </div>
          <div className={styles.inputRow}>
            <label htmlFor="authors">Autor(en)</label>
            <input
              id="authors"
              type="text"
              onChange={(e) => setAuthors(e.target.value)}
              value={authors}
            />
          </div>
          <div className={styles.inputRow}>
            <label htmlFor="datepicker">Erscheinungsjahr</label>
            <DatePicker
              className={styles.datePicker}
              dateFormat="yyyy"
              showYearPicker
              selected={published}
              yearItemNumber={10}
              onChange={(date) => setPublished(date)}
            />
          </div>
          <div className={styles.inputRow}>
            <SelectGenre
              onHandleGenreSelect={handleGenreSelect}
              selectedValue={genre}
            />
          </div>
          <div className={styles.inputRow}>
            <label htmlFor="content">Inhalt</label>
            <textarea
              className={styles.content}
              rows="5"
              id="content"
              type="text"
              onChange={(e) => setContent(e.target.value)}
              value={content}
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
              onClick={() => navigate(`/books/${id}`)}
            >
              zurück
            </Button>
            <Button disabled={isLoading} type="primary">
              {isLoading
                ? "Bucheintrag wird angepasst"
                : "Bucheintrag anpassen"}
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default EditBook;
