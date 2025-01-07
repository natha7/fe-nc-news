import { Link } from "react-router-dom";
import { getTopics } from "../../api";
import { useState, useEffect } from "react";

export default function TopicBar({ setIsTopicsClicked }) {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function handleTopicClick() {
    setIsTopicsClicked(() => {
      return false;
    });
  }

  useEffect(() => {
    getTopics().then((fetchedTopics) => {
      setTopics(() => {
        return [...fetchedTopics].sort((a, b) => {
          if (a.slug > b.slug) return 1;
          if (a.slug < b.slug) return -1;
          if (a.slug === b.slug) return 0;
        });
      });

      setIsLoading(() => {
        return false;
      });
    });
  }, []);

  {
    return !isLoading ? (
      <div className="absolute bg-white/95 backdrop-blur-sm border-slate-200 border-[0.5px] w-auto p-1 shadow-md top-[56px] right-[0px]">
        <p className="px-2 m-1 underline underline-offset-2">Topics</p>
        <ul className="grid w-auto h-auto grid-cols-3">
          {topics.map((topic, index) => {
            return (
              <Link
                key={topic.slug + index}
                to={`/articles/${topic.slug}`}
                state={{
                  topicName: topic.slug,
                  topicDesc: topic.description,
                }}
                onClick={handleTopicClick}
                className="m-1"
              >
                <li className="p-1 hover:underline hover:text-emerald-600 text-emerald-800 text-center">
                  {topic.slug[0].toUpperCase() + topic.slug.slice(1)}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    ) : null;
  }
}
