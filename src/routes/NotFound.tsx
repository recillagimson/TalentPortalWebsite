import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="not-found container">
      <h1>404</h1>
      <p>That page doesn't exist (or moved).</p>
      <Link className="btn btn-primary" to="/">
        Go home <span className="btn-arrow">→</span>
      </Link>
    </section>
  );
}
