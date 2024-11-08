import { Link } from "react-router-dom";
import { getTopics } from "../api";
import { useState, useEffect } from "react";

export default function TopicBar() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((fetchedTopics) => {
      setTopics(() => {
        return [...fetchedTopics];
      });
    });
  }, []);

  return (
    <ul id="topic-list" className=" absolute bg-gray-100 rounded-md">
      {topics.map((topic, index) => {
        return (
          <li key={topic.slug + index} className="">
            <Link
              className=""
              to={`/articles/${topic.slug}`}
              state={{ topicName: topic.slug, topicDesc: topic.description }}
            >
              {topic.slug}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
