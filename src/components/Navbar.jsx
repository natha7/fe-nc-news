import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/articles">
          <li>Articles</li>
        </Link>
        <Link to="/post">
          <li>Post</li>
        </Link>
      </ul>
    </nav>
  );
}
