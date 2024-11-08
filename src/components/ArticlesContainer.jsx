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
    <div className="min-h-screen">
      {error ? (
        <div className="error">
          <ErrorMsg errorToDisplay={error} />
        </div>
      ) : isLoading ? (
        <div className="flex flex-col min-h-screen justify-center items-center">
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col pt-5 mt-1 pb-5 mb-1 items-center border-orange-100 border-b-2">
            <h1 className="text-4xl">
              {isTopic
                ? topicName[0].toUpperCase() + topicName.slice(1)
                : "Articles"}
            </h1>
            <SortArticlesPageBar setSearchParams={setSearchParams} />
          </div>
          <PageNumbers setPageNum={setPageNum} topicName={topicName} />
          <div className="divide-y divide-gray-200">
            {articles.map((article) => {
              return (
                <ArticleCard
                  key={article.author + article.article_id}
                  article={article}
                />
              );
            })}
          </div>
          <PageNumbers setPageNum={setPageNum} topicName={topicName} />
        </>
      )}
    </div>
  );
}
