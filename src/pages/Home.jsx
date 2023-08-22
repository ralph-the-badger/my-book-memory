import { useNavigate } from "react-router-dom";

import Navigation from "../components/Navigation";
import Button from "../components/ui/Button";

import styles from "./Home.module.css";

function Home() {
  const navigate = useNavigate();

  return (
    <main className={styles.home}>
      <Navigation />
      <section>
        <h1>My Book Memory</h1>
        <h2>
          Dokumentiere deine gelesenen Bücher und ihre wichtigsten Inhalte
        </h2>
        <p>
          Diese Applikation hilft dir dabei einen Überblick über deine gelesenen
          Bücher zu behalten. Außerdem kannst du die wichtigsten und prägendsten
          Inhalte aufschreiben, dass du sie nie wieder vergisst.
        </p>
        <Button type="primary" onClick={() => navigate("/login")}>
          Los geht&#39;s
        </Button>
      </section>
    </main>
  );
}

export default Home;
