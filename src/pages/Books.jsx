import { useState, useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

import Navigation from "../components/Navigation";

function Books() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  // const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    async function getBooks() {
      try {
        setIsLoading(true);
        setError("");

        const res = await axios({
          method: "get",
          url: "http://localhost:5000/books",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!res || res.status !== 200) {
          throw new Error(
            "Beim Laden der Bücher ist ein Fehler aufgetreten. Bitte stellen Sie sicher, dass Sie angemeldet sind."
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
    <>
      <Navigation />
      {isLoading && <p>Ihre Bücher werden geladen ...</p>}
      {error && <p>{error}</p>}
      {books && books.length > 0 && (
        <ul>
          {books.map((book, index) => (
            <li key={index}>
              {book.title} by{" "}
              {/* {book.authors.map((author, i) => (
                <span key={i}>{author}</span>
              ))}
              {book.image ? (
                <img src={`/images/${book.image}`} alt={book.title} />
              ) : (
                <img src={`/images/book-logo.png`} alt="Default Book Image" />
              )} */}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Books;
