import Navbar from "./Navbar";

export default function Header() {
  return (
    <header
      id="header-top"
      className="w-full flex flex-row justify-between h-14 border-b-2 rounded-sm shadow-md sticky top-0 z-50 bg-white"
    >
      <div className="content-center">
        <h2 className=" bg-orange-500 p-1.5 text-white ml-1 h-8 text-xs rounded-md">
          NCnews
        </h2>
      </div>
      <Navbar />
    </header>
  );
}
