import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/User";
import TopicBar from "./TopicBar";
import { getUserByUsername } from "../api";

export default function Navbar() {
  const { user } = useContext(UserContext);
  const [isTopicsClicked, setIsTopicsClicked] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

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

  useEffect(() => {
    getUserByUsername(user).then(({ data }) => {
      setAvatarUrl(() => {
        return data.user.avatar_url;
      });
    });
  });

  return (
    <nav className="content-center">
      <ul className="flex flex-row justify-between [&>*]:ml-2 [&>*]:p-0.5 h-7">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/articles">Articles</Link>
        </li>
        <li className="hover:cursor-pointer" onClick={handleTopicsClick}>
          <div onMouseLeave={handleTopicsMouseLeave}>
            Topics
            {isTopicsClicked ? <TopicBar /> : null}
          </div>
        </li>
        {user ? (
          <li className="mr-1 self-center">
            <div className="flex aspect-square h-10 overflow-clip rounded-full border-slate-200 border-[0.5px]">
              <img
                className="self-center justify-self-center"
                src={avatarUrl}
              />
            </div>
          </li>
        ) : (
          <li className="mr-1">
            <Link to="/sign-in">Sign in</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
