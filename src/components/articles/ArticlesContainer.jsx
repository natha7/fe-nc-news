import { useEffect, useState } from "react";
import { getArticles } from "../../api";
import ArticleCard from "./ArticleCard.jsx";
import { useParams } from "react-router-dom";
import SortArticlesPageBar from "./SortArticlesPageBar";
import PageNumbers from "../utils/PageNumbers";
import ErrorMsg from "../errors/ErrorMsg";
import Loader from "../loader/Loader";

export default function ArticlesContainer() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [pages, setPages] = useState([]);
  const newTopic = useParams().topic_name;
  const [topicName, setTopicName] = useState(newTopic);
  const [filters, setFilters] = useState(["created_at", "desc"]);

  const pageNumbers = (
    <PageNumbers
      setPageNum={setPageNum}
      topicName={topicName}
      pages={pages}
      setPages={setPages}
    />
  );

  if (topicName !== useParams().topic_name) {
    setTopicName(() => {
      return newTopic;
    });
    setPageNum(() => {
      return 1;
    });
  }

  useEffect(() => {
    setIsLoading(() => {
      return true;
    });
    setError(() => {
      return "";
    });

    getArticles(pageNum, topicName, filters)
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
  }, [topicName, pageNum, filters]);

  return (
    <section className="min-h-screen mx-3 z-10 flex justify-center mb-7">
      {error ? (
        <ErrorMsg errorToDisplay={error} />
      ) : isLoading && pages.length ? (
        <Loader />
      ) : (
        <div>
          <div className="flex flex-col pt-5 pb-5 mb-1 items-center border-emerald-800 border-b-2 border-opacity-15">
            <h1 className="text-4xl text-emerald-800 font-semibold">
              {topicName
                ? topicName[0].toUpperCase() + topicName.slice(1)
                : "Articles"}
            </h1>
            <SortArticlesPageBar setFilters={setFilters} />
          </div>
          {pageNumbers}
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
          {pageNumbers}
        </div>
      )}
    </section>
  );
}
