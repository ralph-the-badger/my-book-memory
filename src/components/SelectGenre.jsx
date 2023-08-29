import { PropTypes } from "prop-types";

import styles from "./SelectGenre.module.css";

function SelectGenre({ onHandleGenreSelect }) {
  return (
    <div className={styles.selectGenre}>
      <form onChange={(e) => onHandleGenreSelect(e)}>
        <label htmlFor="select-genre">Genre</label>
        <select id="select-genre" name="select-genre">
          <option value="None">Bitte wählen Sie ein Genre aus</option>
          <option value="Biografie">Biografie</option>
          <option value="Entwicklungsroman">Entwicklungsroman</option>
          <option value="Fachbuch">Fachbuch</option>
          <option value="Familienroman">Familienroman</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Gesellschaftsroman">Gesellschaftsroman</option>
          <option value="Historischer Roman">Historischer Roman</option>
          <option value="Horror">Horror</option>
          <option value="Krimi">Krimi</option>
          <option value="Liebesroman">Liebesroman</option>
          <option value="Ratgeber">Ratgeber</option>
          <option value="Reiseroman">Reiseroman</option>
          <option value="Sachbuch">Sachbuch</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Thriller">Thriller</option>
        </select>
      </form>
    </div>
  );
}

SelectGenre.propTypes = {
  onHandleGenreSelect: PropTypes.func,
};

export default SelectGenre;
