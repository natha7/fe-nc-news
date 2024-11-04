import { dateConverter } from "../utils/utils";

export default function ArticleCard(props) {
  const {
    article_id,
    author,
    comment_count,
    created_at,
    title,
    topic,
    votes,
    img_url,
  } = props;
  return (
    <article id={article_id} className="article-card">
      <div className="article-card-info">
        <h3>{title}</h3>
        <p>by {author}</p>
        <p>Posted {dateConverter(created_at)}</p>
      </div>
      <div className="article-card-img-votes">
        <img src={img_url} />
        <p className="article-card-topic">{topic}</p>
        <div className="vote-items">
          <p className="comment-count">{comment_count} comments</p>
          <p className="vote-count">{votes} votes</p>
        </div>
      </div>
    </article>
  );
}
