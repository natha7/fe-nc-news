import { Link } from "react-router-dom";

export default function TopArticleCard({ article, index }) {
  return (
    <Link
      to={`/article/${article.article_id}`}
      className={`${!index ? "" : ""} group bg-white`}
    >
      <article
        id={article.article_id}
        className={`${!index ? "" : ""} p-1 m-auto`}
      >
        <p className="bg-emerald-800/20 max-w-fit text-[11px] text-black px-2 rounded-sm shadow-sm font-medium">
          {article.topic}
        </p>
        <img
          className="aspect-auto mx-auto my-1 rounded-sm w-full"
          src={article.article_img_url}
        />

        <p
          className={`${
            !index ? "text-xl" : "text-xs"
          } font-semibold title group-hover:text-emerald-700 group-hover:underline group-active:text-emerald-700 group-active:underline underline-offset-[1px]`}
        >
          {article.title}
        </p>

        <p
          className={`${!index ? "text-l" : "text-[10px]"}`}
        >{`by ${article.author}`}</p>
      </article>
    </Link>
  );
}
