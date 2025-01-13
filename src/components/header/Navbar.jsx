import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserProvider";
import TopicBar from "./TopicBar";
import ProfilePic from "../utils/ProfilePic";

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
      <ul className="flex flex-row justify-between [&>*]:ml-2 [&>*]:p-0.5 h-7">
        <li>
          <Link to="/" className="hover:text-emerald-800">
            Home
          </Link>
        </li>
        <li>
          <Link to="/articles" className="hover:text-emerald-800">
            Articles
          </Link>
        </li>
        <li
          className="hover:cursor-pointer hover:text-emerald-800"
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
