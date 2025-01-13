import { useEffect, useState } from "react";
import { getArticles, getTopArticles } from "../../api";
import { Link } from "react-router-dom";

export default function MoreArticles({
  topic,
  currArticleId,
  setArticlesReady,
}) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    Promise.all([
      getTopArticles(2, topic),
      getArticles(1, topic, undefined, 50),
    ]).then(([topArticles, topicArticles]) => {
      const articlePool = topicArticles.filter((article) => {
        return (
          article.article_id !== topArticles[0].article_id &&
          article.article_id !== currArticleId
        );
      });

      const topPick =
        topArticles[0].article_id === currArticleId
          ? topArticles[1]
          : topArticles[0];

      function pickArticle(articlePool) {
        return articlePool.splice(
          Math.floor(Math.random() * articlePool.length),
          1
        )[0];
      }

      const articlePicks = [
        pickArticle(articlePool),
        pickArticle(articlePool),
        pickArticle(articlePool),
        pickArticle(articlePool),
      ];

      setArticles(() => {
        return [topPick, ...articlePicks];
      });

      setArticlesReady(() => {
        return true;
      });
    });
  }, [currArticleId]);

  return (
    <aside className="border-t-[1px] border-slate-200 max-w-56">
      <h2 className="text-2xl">More like this</h2>
      <ul className="text-emerald-800">
        {articles.map((article) => {
          return (
            <li
              className="list-disc m-2 mt-6 hover:underline"
              key={article.article_id + currArticleId + "more"}
            >
              <Link to={`/article/${article.article_id}`}>{article.title}</Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
