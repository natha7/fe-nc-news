import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header
      id="header-top"
      className="w-full flex flex-row justify-between h-14 border-b-2 rounded-sm shadow-md sticky top-0 z-50 bg-white items-center"
    >
      <Link to="/">
        <div className="content-center">
          <p className="text-emerald-800 ml-2 h-8 rounded-md font-extrabold text-2xl">
            NCnews
          </p>
        </div>
      </Link>
      <Navbar />
    </header>
  );
}
