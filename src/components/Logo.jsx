import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <img src="/book-logo.png" alt="Book Icon" />
    </Link>
  );
}

export default Logo;
