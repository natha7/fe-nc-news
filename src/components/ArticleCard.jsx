import { dateConverter } from "../utils/utils";
import { Link } from "react-router-dom";

export default function ArticleCard(props) {
  const { article } = props;
  return (
    <article id={article.article_id} className="m-2 p-2">
      <div className="article-card-info">
        <div className="flex flex-col">
          <p className="bg-emerald-200 max-w-fit text-sm text-black px-2 rounded-sm font-medium">
            {article.topic}
          </p>
          <p className="font-semibold text-xl">{article.title}</p>
        </div>
        <p>by {article.author}</p>
        <p>Posted {dateConverter(article.created_at, "shortenedDifference")}</p>
      </div>
      <div className="article-card-img-votes">
        <img
          className="w-80 h-auto mx-auto my-3 rounded-sm"
          src={article.article_img_url}
        />
        <div className="flex flex-row justify-between">
          <div className="flex flex-row ">
            <p className="px-1 m-1">{article.comment_count} comments</p>
            <p className="px-1 m-1">{article.votes} votes</p>
          </div>
          <div className="flex justify-end px-1 my-1">
            <Link to={`/article/${article.article_id}`}>
              <button className="bg-emerald-800 rounded-md px-3 text-white font-medium">
                Read this article
              </button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
