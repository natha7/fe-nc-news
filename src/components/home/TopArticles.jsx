import { useEffect, useState } from "react";
import { getTopArticles } from "../../api";
import TopArticleCard from "../articles/TopArticleCard.jsx";

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
      <div className="flex flex-col items-center justify-self-center m-2 ">
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
      <section className="flex min-w-full">
        <div className="flex flex-col lg:max-w-[60%] md:max-w-[90%] m-auto">
          <h2 className=" text-2xl ml-1 font-semibold">Top Articles</h2>
          <section className="min-h-screen m-1">
            {
              <div className="w-full h-max">
                <div className="flex w-full">
                  <div className="w-3/4">
                    <TopArticleCard
                      key={topArticles[0].article_id}
                      article={topArticles[0]}
                      index={0}
                    />
                  </div>
                  <div className="flex flex-col w-1/4 h-full">
                    {[topArticles[1], topArticles[2]].map((article, index) => {
                      return (
                        <div key={article.article_id} className="w-full">
                          <TopArticleCard
                            article={article}
                            style="home"
                            index={index + 1}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex w-full h-fit mt-5">
                  {[
                    topArticles[3],
                    topArticles[4],
                    topArticles[5],
                    topArticles[6],
                  ].map((article, index) => {
                    return (
                      <TopArticleCard
                        key={article.article_id}
                        article={article}
                        style="home"
                        index={index + 1}
                      />
                    );
                  })}
                </div>
              </div>
            }
          </section>
        </div>
      </section>
    );
  }
}
