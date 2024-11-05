import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/User";

export default function Navbar() {
  const { user } = useContext(UserContext);

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
        {user ? (
          <li>Signed in as {user}</li>
        ) : (
          <Link to="/sign-in">
            <li>Sign in</li>
          </Link>
        )}
      </ul>
    </nav>
  );
}
