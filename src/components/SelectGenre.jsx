import { PropTypes } from "prop-types";

import styles from "./SelectGenre.module.css";

const genreArray = [
  { id: 1, value: "None", option: "Bitte wählen Sie ein Genre aus" },
  { id: 2, value: "Biografie", option: "Biografie" },
  { id: 3, value: "Entwicklungsroman", option: "Entwicklungsroman" },
  { id: 4, value: "Fachbuch", option: "Fachbuch" },
  { id: 5, value: "Familienroman", option: "Familienroman" },
  { id: 6, value: "Fantasy", option: "Fantasy" },
  { id: 7, value: "Gesellschaftsroman", option: "Gesellschaftsroman" },
  { id: 8, value: "Historischer Roman", option: "Historischer Roman" },
  { id: 9, value: "Horror", option: "Horror" },
  { id: 10, value: "Krimi", option: "Krimi" },
  { id: 11, value: "Liebesroman", option: "Liebesroman" },
  { id: 12, value: "Ratgeber", option: "Ratgeber" },
  { id: 13, value: "Reiseroman", option: "Reiseroman" },
  { id: 14, value: "Sachbuch", option: "Sachbuch" },
  { id: 15, value: "Science Fiction", option: "Science Fiction" },
  { id: 16, value: "Thriller", option: "Thriller" },
];

function SelectGenre({ onHandleGenreSelect, selectedValue }) {
  return (
    <div className={styles.selectGenre}>
      <label htmlFor="select-genre">Genre</label>
      <select
        id="select-genre"
        name="select-genre"
        onChange={(e) => onHandleGenreSelect(e)}
      >
        {genreArray.map((genre) => (
          <option
            key={genre.id}
            value={genre.value}
            selected={selectedValue === genre.option ? true : false}
          >
            {genre.option}
          </option>
        ))}
      </select>
    </div>
  );
}

SelectGenre.propTypes = {
  onHandleGenreSelect: PropTypes.func,
  selectedValue: PropTypes.string,
};

export default SelectGenre;
