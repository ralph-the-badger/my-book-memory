import { useState, useEffect } from "react";
import axios from "axios";

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function getBooks() {
      const res = await axios({
        method: "get",
        url: "http://localhost:5000/books",
      });
      setBooks(res.data.books);
    }
    getBooks();
  }, []);

  return (
    books.length > 0 && (
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.name} by {book.author}
          </li>
        ))}
      </ul>
    )
  );
}

export default Books;
