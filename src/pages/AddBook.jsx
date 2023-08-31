import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useAddBook } from "../hooks/useAddBook.js";
import { useAuth } from "../context/authContext";

import Navigation from "../components/Navigation";
import Button from "../components/ui/Button.jsx";

import styles from "./AddBook.module.css";
import "react-datepicker/dist/react-datepicker.css";
import SelectGenre from "../components/SelectGenre.jsx";

function AddBook() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addBook, isLoading, error, success } = useAddBook();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [published, setPublished] = useState(new Date());
  const [image, setImage] = useState(null);
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

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("authors", authorsArray);
    formData.append("published", published);
    if (image) {
      formData.append("image", image);
      formData.append("filename", image.name);
    }
    // formData.append("image", image);
    formData.append("content", contentArray);
    formData.append("genre", genre);

    await addBook(formData);
  }

  useEffect(() => {
    isAuthenticated ? navigate("/books/add") : navigate("/books");
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.addBook}>
      <Navigation />
      <section>
        <form className={styles.form} onSubmit={handleSubmit}>
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
            <label htmlFor="image">Bild</label>
            <input
              id="image"
              type="file"
              name="image"
              accept="image/png, image/jpeg, image/jpg"
              //   onChange={(e) => setFile(e.target.files[0])}
              //   onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className={styles.inputRow}>
            <SelectGenre onHandleGenreSelect={handleGenreSelect} />
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
            <Button disabled={isLoading} type="secondary">
              zurück
            </Button>
            <Button disabled={isLoading} type="primary">
              {isLoading
                ? "Bucheintrag wird erstellt"
                : "Bucheintrag erstellen"}
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default AddBook;
