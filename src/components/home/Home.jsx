import TopArticles from "./TopArticles";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <h2 className=" mx-auto text-4xl text-emerald-800 font-semibold pt-5 pb-5 mb-1">
          Home
        </h2>
      </div>
      <TopArticles />
    </div>
  );
}
