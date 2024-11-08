import { useEffect, useState } from "react";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";
import { useParams, useSearchParams } from "react-router-dom";
import SortArticlesPageBar from "./SortArticlesPageBar";
import PageNumbers from "./PageNumbers";
import ErrorMsg from "./ErrorMsg";

export default function ArticlesContainer(props) {
  const { isTopic } = props;
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const topicName = useParams().topic_name;
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(() => {
      return true;
    });
    setError(() => {
      return "";
    });
    getArticles(pageNum, topicName, searchParams)
      .then((articlesData) => {
        setArticles(() => {
          setIsLoading(() => {
            return false;
          });
          return articlesData;
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
  }, [pageNum, topicName, searchParams]);

  return (
    <>
      {error ? (
        <div className="error">
          <ErrorMsg errorToDisplay={error} />
        </div>
      ) : isLoading ? (
        <div>
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      ) : isTopic ? (
        <>
          <h1>{topicName[0].toUpperCase() + topicName.slice(1)}</h1>
          <SortArticlesPageBar setSearchParams={setSearchParams} />
          {articles.map((article) => {
            return (
              <ArticleCard
                key={article.author + article.article_id}
                article={article}
              />
            );
          })}
          <PageNumbers setPageNum={setPageNum} topicName={topicName} />
        </>
      ) : (
        <>
          <h1>Articles</h1>
          <SortArticlesPageBar setSearchParams={setSearchParams} />
          {articles.map((article) => {
            return (
              <ArticleCard
                key={article.author + article.article_id}
                article={article}
              />
            );
          })}
          <PageNumbers setPageNum={setPageNum} topicName={topicName} />
        </>
      )}
    </>
  );
}
