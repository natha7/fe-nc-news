import { dateConverter } from "../utils/utils";
import { Link } from "react-router-dom";

export default function ArticleCard(props) {
  const { article } = props;
  return (
    <article id={article.article_id} className="article-card">
      <div className="article-card-info">
        <h3>{article.title}</h3>
        <p>by {article.author}</p>
        <p>Posted {dateConverter(article.created_at, "shortenedDifference")}</p>
        <Link to={`/article/${article.article_id}`}>
          <button>Read this article</button>
        </Link>
      </div>
      <div className="article-card-img-votes">
        <img src={article.article_img_url} />
        <p className="article-card-topic">{article.topic}</p>
        <div className="vote-items">
          <p className="comment-count">{article.comment_count} comments</p>
          <p className="vote-count">{article.votes} votes</p>
        </div>
      </div>
    </article>
  );
}
