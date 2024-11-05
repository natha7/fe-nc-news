import { useEffect, useState } from "react";
import { getCommentsByArticleId } from "../api";
import CommentCard from "./CommentCard";

export default function CommentsList(props) {
  const { article_id } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setIsLoading(() => {
      return true;
    });
    getCommentsByArticleId(article_id).then((fetchedComments) => {
      setComments(() => {
        setIsLoading(() => {
          return false;
        });
        return fetchedComments;
      });
    });
  }, []);

  return (
    <section className="article-control">
      {isLoading ? (
        <p>Loading comments...</p>
      ) : (
        comments.map((comment) => {
          return (
            <CommentCard
              key={comment.author + comment.comment_id}
              comment={comment}
            />
          );
        })
      )}
    </section>
  );
}
