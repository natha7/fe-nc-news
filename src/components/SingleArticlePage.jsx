import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../api";
import { dateConverter } from "../utils/utils";
import CommentsList from "./CommentsList";

export default function SingleArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(() => {
      return true;
    });
    getArticleById(article_id).then((fetchedArticle) => {
      setArticle(() => {
        setIsLoading(() => {
          return false;
        });
        return fetchedArticle;
      });
    });
  }, []);
  return (
    <div>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <section>
          <h1>{article.title}</h1>
          <p>{article.topic}</p>
          <img className="single-article-img" src={article.article_img_url} />
          <p>by {article.author}</p>
          <p>{`Posted ${dateConverter(article.created_at)}`}</p>
          <p className="single-article-body">{article.body}</p>
          <p>Article votes: {article.votes}</p>
          <button>Like Article</button>
          <button>Dislike Article</button>
          <CommentsList article_id={article_id} votes={article.votes} />
        </section>
      )}
    </div>
  );
}
