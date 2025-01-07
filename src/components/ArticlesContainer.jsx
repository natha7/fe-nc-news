import { useEffect, useState } from "react";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";
import { useParams, useSearchParams } from "react-router-dom";
import SortArticlesPageBar from "./SortArticlesPageBar";
import PageNumbers from "./PageNumbers";
import ErrorMsg from "./ErrorMsg";
import Loader from "./Loader";

export default function ArticlesContainer(props) {
  const { isTopic } = props;
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [pages, setPages] = useState([]);
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
  }, [topicName, pageNum, searchParams]);

  return (
    <main className="min-h-screen mx-3 z-10 bg-white">
      {error ? (
        <div className="error">
          <ErrorMsg errorToDisplay={error} />
        </div>
      ) : isLoading ? (
        <Loader />
      ) : (
        <section className="animate-appear">
          <div className="flex flex-col pt-5 pb-5 mb-1 items-center border-emerald-800 border-b-2 border-opacity-15">
            <h1 className="text-4xl text-emerald-800 font-semibold">
              {isTopic
                ? topicName[0].toUpperCase() + topicName.slice(1)
                : "Articles"}
            </h1>
            <SortArticlesPageBar setSearchParams={setSearchParams} />
          </div>
          <PageNumbers
            setPageNum={setPageNum}
            topicName={topicName}
            pages={pages}
            setPages={setPages}
          />
          <div className="divide-y divide-gray-200 grid-flow-col">
            {articles.map((article) => {
              return (
                <ArticleCard
                  key={article.author + article.article_id}
                  article={article}
                />
              );
            })}
          </div>
          <PageNumbers
            setPageNum={setPageNum}
            topicName={topicName}
            pages={pages}
            setPages={setPages}
          />
        </section>
      )}
    </main>
  );
}
