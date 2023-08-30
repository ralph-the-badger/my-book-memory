import { PropTypes } from "prop-types";

import styles from "./BooksCard.module.css";
import Button from "../components/ui/Button";

function BooksCard({ book }) {
  return (
    <li key={book._id} className={styles.listItem}>
      <h3 className={styles.title}>{book.title}</h3>
      <p className={styles.authors}>
        {book.authors.length === 1 ? "Autor: " : "Autoren: "}
        {book.authors.map((author) => (
          <span key={author.id}>{author.author}</span>
        ))}
      </p>
      <p className={styles.genre}>
        Genre: <span>{book.genre}</span>
      </p>
      <Button type="primary" className={styles.detailsButton} onClick="">
        Details
      </Button>
    </li>
  );
}

BooksCard.propTypes = {
  book: PropTypes.object,
};

export default BooksCard;
