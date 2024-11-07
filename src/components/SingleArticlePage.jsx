import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../api";
import { dateConverter } from "../utils/utils";
import CommentsList from "./CommentsList";
import VotingBtns from "./VotingBtns";

export default function SingleArticlePage() {
  const { article_id } = useParams();
  const [articleVotes, setArticleVotes] = useState(0);
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

  useEffect(() => {
    setArticleVotes(() => {
      return article.votes;
    });
  }, [article]);

  return (
    <div>
      {isLoading ? (
        <div>
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <section>
          <h1>{article.title}</h1>
          <p>{article.topic}</p>
          <img className="single-article-img" src={article.article_img_url} />
          <p>by {article.author}</p>
          <p>{`Posted ${dateConverter(article.created_at)}`}</p>
          <p className="single-article-body">{article.body}</p>
          <p>Article votes: {articleVotes}</p>
          <VotingBtns
            setVotes={setArticleVotes}
            itemToVoteId={article.article_id}
            typeOfItem="article"
          />
          <CommentsList article_id={article_id} votes={article.votes} />
        </section>
      )}
    </div>
  );
}
