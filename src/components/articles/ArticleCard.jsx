import { dateConverter } from "../../utils/utils";
import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  return (
    <Link to={`/article/${article.article_id}`} className={`group bg-white`}>
      <article
        id={article.article_id}
        className={`m-2 p-2 md:min-w-[750px] sm:min-w-[335px] border-b-[1px]`}
      >
        <div className="flex flex-col">
          <p className="bg-emerald-200 max-w-fit text-sm text-black px-2 rounded-sm font-medium">
            {article.topic}
          </p>
          <p className="font-semibold text-xl group-hover:text-emerald-800 group-hover:underline">
            {article.title}
          </p>
        </div>
        <p>by {article.author}</p>
        <p>Posted {dateConverter(article.created_at, "shortenedDifference")}</p>

        <img
          className="max-w-full h-auto mx-auto my-3 rounded-md"
          src={article.article_img_url}
        />
        <div className="flex flex-row justify-between">
          <div className="flex flex-row ">
            <p className="px-1 m-1">{article.comment_count} comments</p>
            <p className="px-1 m-1">{article.votes} votes</p>
          </div>
        </div>
      </article>
    </Link>
  );
}
