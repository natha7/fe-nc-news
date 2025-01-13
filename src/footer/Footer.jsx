export default function Footer() {
  function handleBtnPress() {
    scrollTo({ top: 0, left: 0 });
  }

  return (
    <footer className="w-full flex flex-row justify-center h-8 border-t-[1px] rounded-sm bg-white items-center text-sm [&>*]:m-2 p-5">
      <p>🗞️ NC News</p>
      <button onClick={handleBtnPress} className="hover:text-emerald-800">
        Back to top ↑
      </button>
    </footer>
  );
}
