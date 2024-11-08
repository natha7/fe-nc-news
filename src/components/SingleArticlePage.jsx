import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../api";
import SingleArticle from "./SingleArticle";
import ErrorMsg from "./ErrorMsg";
import Loader from "./Loader";

export default function SingleArticlePage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { article_id } = useParams();
  const [articleVotes, setArticleVotes] = useState(0);
  const [article, setArticle] = useState({});

  useEffect(() => {
    setIsLoading(() => {
      return true;
    });
    setError(() => {
      return "";
    });
    getArticleById(article_id)
      .then((fetchedArticle) => {
        setArticle(() => {
          return fetchedArticle;
        });
        setIsLoading(() => {
          return false;
        });
      })
      .catch((err) => {
        setError(() => {
          return err;
        });
        setIsLoading(() => {
          return false;
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
        <Loader />
      ) : error ? (
        <ErrorMsg errorToDisplay={error} />
      ) : (
        <SingleArticle
          article={article}
          articleVotes={articleVotes}
          setArticleVotes={setArticleVotes}
        />
      )}
    </div>
  );
}
