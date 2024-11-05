import { useEffect, useState } from "react";
import { getArticles, getPageNumbers } from "../api";
import ArticleCard from "./ArticleCard";

export default function ArticlesContainer() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [pages, setPages] = useState([]);
  const [pageNum, setPageNum] = useState(1);

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
    getArticles(pageNum)
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
    getPageNumbers().then((pageBtnValues) => {
      setPages(() => {
        return pageBtnValues;
      });
    });
  }, [pageNum]);

  return (
    <>
      {error ? <p className="error-msg">{error}</p> : null}
      {isLoading ? (
        <p>Loading...</p>
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
