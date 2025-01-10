import { useEffect, useState } from "react";
import { getTopArticles } from "../../api";
import ArticleCard from "../articles/ArticleCard.jsx";

export default function TopArticles() {
  const [topArticles, setTopArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMsgVisible, setIsMsgVisible] = useState(false);

  useEffect(() => {
    getTopArticles()
      .then((articles) => {
        articles[0].top = true;
        setTopArticles(() => {
          return articles;
        });
        setIsLoading(() => {
          return false;
        });
      })
      .catch(() => {
        setIsLoading(() => {
          return false;
        });
        setIsMsgVisible(() => {
          return true;
        });
      });
  }, []);

  {
    return isLoading ? null : isMsgVisible ? (
      <div className="flex flex-col items-center justify-self-center m-2">
        <h2 className="text-3xl">Note:</h2>
        <p className="text-xl">
          As the backend is hosted on a Render free plan, please allow some time
          for API to load.
        </p>
        <p className="text-lg">
          {" "}
          Typically this takes approximately 50 seconds.
        </p>
      </div>
    ) : (
      <>
        <h2 className=" text-2xl ml-1 font-semibold">Top Articles</h2>
        <section className="grid grid-cols-4 grid-rows-auto gap-1 w-fit max-w-[100vw] h-auto animate-appear m-1">
          {topArticles.map((article, index) => {
            return (
              <ArticleCard
                key={article.article_id}
                article={article}
                style="home"
                index={index}
              />
            );
          })}
        </section>
      </>
    );
  }
}
