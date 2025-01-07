import { useEffect, useState } from "react";
import { getTopArticles } from "../../api";
import ArticleCard from "../articles/ArticleCard.jsx";

export default function TopArticles() {
  const [topArticles, setTopArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTopArticles().then((articles) => {
      articles[0].top = true;
      setTopArticles(() => {
        return articles;
      });
      setIsLoading(() => {
        return false;
      });
    });
  }, []);
  {
    return isLoading ? null : (
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
    );
  }
}
