import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { changeArticleVotesById, getArticleById } from "../api";
import { dateConverter } from "../utils/utils";
import CommentsList from "./CommentsList";

export default function SingleArticlePage() {
  const { article_id } = useParams();
  const [articleVotes, setArticleVotes] = useState(0);
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [hasVoteFailedMsg, setHasVoteFailedMsg] = useState(false);

  function changeLikes(event) {
    const likeOrDislike = event.target.value;

    event.target.disabled = true;
    setArticleVotes((curVotes) => {
      return likeOrDislike === "like" ? curVotes + 1 : curVotes - 1;
    });
    changeArticleVotesById(
      article_id,
      likeOrDislike === "like" ? { inc_votes: 1 } : { inc_votes: -1 }
    ).catch(() => {
      setHasVoteFailedMsg(() => {
        setArticleVotes((curVotes) => {
          return likeOrDislike === "like" ? curVotes - 1 : curVotes + 1;
        });
        setTimeout(() => {
          event.target.disabled = false;
          setHasVoteFailedMsg(false);
        }, 3000);
        return true;
      });
    });
  }

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
        <p>Loading</p>
      ) : (
        <section>
          <h1>{article.title}</h1>
          <p>{article.topic}</p>
          <img className="single-article-img" src={article.article_img_url} />
          <p>by {article.author}</p>
          <p>{`Posted ${dateConverter(article.created_at)}`}</p>
          <p className="single-article-body">{article.body}</p>
          <p>Article votes: {articleVotes}</p>
          {hasVoteFailedMsg ? (
            <p>Something went wrong voting, please try again</p>
          ) : null}
          <button
            className="article-like-btn"
            onClick={changeLikes}
            value="like"
          >
            Like Article
          </button>
          <button
            className="article-dislike-btn"
            onClick={changeLikes}
            value="dislike"
          >
            Dislike Article
          </button>
          <CommentsList article_id={article_id} votes={article.votes} />
        </section>
      )}
    </div>
  );
}
