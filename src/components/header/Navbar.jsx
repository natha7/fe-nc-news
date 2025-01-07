import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/User";
import TopicBar from "./TopicBar";
import ProfilePic from "../utils/ProfilePic";

export default function Navbar() {
  const { user } = useContext(UserContext);
  const [isTopicsClicked, setIsTopicsClicked] = useState(false);
  //adding on enter to topics bar
  function handleTopicsClick(e) {
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
      <ul className="flex flex-row justify-between [&>*]:ml-2 [&>*]:p-0.5 h-7">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/articles">Articles</Link>
        </li>
        <li
          tabIndex={0}
          className="hover:cursor-pointer"
          onClick={handleTopicsClick}
          onKeyDown={handleTopicsClick}
        >
          Topics
        </li>
        {user ? (
          <li className="mr-1 self-center">
            <ProfilePic size={"md"} username={user} />
          </li>
        ) : (
          <li className="mr-1">
            <Link to="/sign-in">Sign in</Link>
          </li>
        )}
      </ul>
      {isTopicsClicked ? (
        <div onMouseLeave={handleTopicsMouseLeave} className="w-fit">
          <TopicBar setIsTopicsClicked={setIsTopicsClicked} />
        </div>
      ) : null}
    </nav>
  );
}
