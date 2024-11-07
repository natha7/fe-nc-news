import { useEffect, useState } from "react";
import { getArticles, getPageNumbers } from "../api";
import ArticleCard from "./ArticleCard";
import { useParams, useSearchParams } from "react-router-dom";
import SortArticlesPageBar from "./SortArticlesPageBar";

export default function ArticlesContainer(props) {
  const { isTopic } = props;
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [pages, setPages] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const topicName = useParams().topic_name;
  const [searchParams, setSearchParams] = useSearchParams();

  function choosePageNum(event) {
    setPageNum(() => {
      return event.target.value;
    });
  }

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
        setIsLoading(() => {
          return true;
        });
        setError(() => {
          setIsLoading(() => {
            return false;
          });
          return err.message;
        });
      });
    getPageNumbers(undefined, topicName).then((pageBtnValues) => {
      setPages(() => {
        return pageBtnValues;
      });
    });
  }, [pageNum, topicName, searchParams]);

  return (
    <>
      {isTopic ? (
        <>
          <h1>{topicName[0].toUpperCase() + topicName.slice(1)}</h1>
          <SortArticlesPageBar setSearchParams={setSearchParams} />
        </>
      ) : (
        <>
          <h1>Articles</h1>
          <SortArticlesPageBar setSearchParams={setSearchParams} />
        </>
      )}
      {error ? <p className="error-msg">{error}</p> : null}
      {isLoading ? (
        <div>
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      ) : (
        articles.map((article) => {
          return (
            <ArticleCard
              key={article.author + article.article_id}
              article={article}
            />
          );
        })
      )}
      {isLoading
        ? null
        : pages.map((page) => {
            return (
              <button key={"page" + page} onClick={choosePageNum} value={page}>
                {page}
              </button>
            );
          })}
    </>
  );
}
