import Navbar from "./Navbar";

export default function Header() {
  return (
    <header
      id="header-top"
      className="w-full flex flex-row justify-between h-14 border-b-2 rounded-sm shadow-md sticky top-0 z-50 bg-white items-center"
    >
      <div className="content-center">
        <p className="text-emerald-800 ml-2 h-8 rounded-md font-extrabold text-2xl">
          NCnews
        </p>
      </div>
      <Navbar />
    </header>
  );
}
