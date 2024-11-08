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
    <nav className="content-center">
      <ul className="flex flex-row justify-between [&>*]:ml-1 [&>*]:p-1">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/articles">Articles</Link>
        </li>
        <li onClick={handleTopicsClick}>
          <div className="topics-list" onMouseLeave={handleTopicsMouseLeave}>
            Topics
            {isTopicsClicked ? <TopicBar /> : null}
          </div>
        </li>
        <li>
          <Link to="/post">Post</Link>
        </li>
        {user ? (
          <li className="mr-1">{user}</li>
        ) : (
          <li className="mr-1">
            <Link to="/sign-in">Sign in</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
