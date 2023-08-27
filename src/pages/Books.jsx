import { useState, useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

import Navigation from "../components/Navigation";

function Books() {
  const [books, setBooks] = useState([]);

  // const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    async function getBooks() {
      const res = await axios({
        method: "get",
        url: "http://localhost:5000/books",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      setBooks(res.data.books);
    }
    getBooks();
  }, [user]);

  return (
    <>
      <Navigation />
      {books && books.length > 0 && (
        <ul>
          {books.map((book, index) => (
            <li key={index}>
              {book.title} by{" "}
              {book.authors.map((author, i) => (
                <span key={i}>{author}</span>
              ))}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Books;
