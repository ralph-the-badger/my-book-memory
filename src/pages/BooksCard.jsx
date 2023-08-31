import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

import styles from "./BooksCard.module.css";
import Button from "../components/ui/Button";

function BooksCard({ book }) {
  return (
    <li key={book._id} className={styles.listItem}>
      <h3 className={styles.title}>
        {book.title} {book.subtitle ? ` - ${book.subtitle}` : ""}
      </h3>
      <p className={styles.authors}>
        {book.authors.length === 1 ? "Autor: " : "Autoren: "}
        {book.authors.map((author) => (
          <span key={author.id}>{author.author}</span>
        ))}
      </p>
      <p className={styles.genre}>
        Genre: <span>{book.genre}</span>
      </p>
      <Link to={`/books/${book._id}`}>
        <Button type="primary">Details</Button>
      </Link>
    </li>
  );
}

BooksCard.propTypes = {
  book: PropTypes.object,
};

export default BooksCard;
