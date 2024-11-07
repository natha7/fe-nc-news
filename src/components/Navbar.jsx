import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import TopicBar from "./TopicBar";

export default function Navbar() {
  const { user } = useContext(UserContext);
  const [isTopicsClicked, setIsTopicsClicked] = useState(false);

  function handleTopicsClick() {
    setIsTopicsClicked((isTopicsClicked) => {
      return !isTopicsClicked;
    });
  }

  function handleTopicsMouseLeave() {
    setIsTopicsClicked(() => {
      return false;
    });
  }
  return (
    <nav>
      <ul id="main-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/articles">Articles</Link>
        </li>
        <li onClick={handleTopicsClick}>
          <div className="topics-list" onMouseLeave={handleTopicsMouseLeave}>
            <p id="navbar-topics-dropdown">Topics</p>
            {isTopicsClicked ? <TopicBar /> : null}
          </div>
        </li>
        <li>
          <Link to="/post">Post</Link>
        </li>
        {user ? (
          <li id="signed-in-info">Signed in as {user}</li>
        ) : (
          <li>
            <Link to="/sign-in">Sign in</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
