import { useEffect, useState } from "react";
import { getCommentsByArticleId } from "../../api";
import CommentCard from "./CommentCard";
import CommentPoster from "./CommentPoster";

export default function CommentsList(props) {
  const { article_id } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [hasCommentFailedToPost, setHasCommentFailedToPost] = useState(false);
  const [isCommentEmpty, setIsCommentEmpty] = useState(false);

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
  }, [article_id]);

  return (
    <section className="border-t-[1px] border-slate-200 m-2 md:mx-[15%]">
      <h2 className="text-2xl">Comments</h2>
      {hasCommentFailedToPost ? <p>Failed to post, please try again.</p> : null}
      {isCommentEmpty ? <p>Comments cannot be empty</p> : null}
      <CommentPoster
        article_id={article_id}
        setComments={setComments}
        setHasCommentFailedToPost={setHasCommentFailedToPost}
        setIsCommentEmpty={setIsCommentEmpty}
      />
      {isLoading ? (
        <p>Loading comments...</p>
      ) : (
        comments.map((comment) => {
          return (
            <CommentCard
              key={comment.author + comment.comment_id}
              comment={comment}
              setComments={setComments}
            />
          );
        })
      )}
    </section>
  );
}
