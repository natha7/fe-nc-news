import { dateConverter } from "../utils/utils";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { deleteCommentByCommentId } from "../api";

export default function CommentCard(props) {
  const { comment, setComments } = props;
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  function handleDeleteComment(event) {
    event.target.disabled = true;
    setIsLoading(() => {
      return true;
    });
    deleteCommentByCommentId(comment.comment_id).then(() => {
      setComments((currentComments) => {
        const indexToSplice = currentComments.findIndex((currComment) => {
          return currComment.comment_id === comment.comment_id;
        });
        const splicedComments = currentComments.toSpliced(indexToSplice, 1);

        return [...splicedComments];
      });
      setIsLoading(() => {
        return false;
      });
    });
  }

  return (
    <article className="comment-card">
      <p className="comment-author">{comment.author}</p>
      <section className="comment-body">
        {comment.body.split("\n").map((commentSegment, index) => {
          return (
            <p key={comment.comment_id + `segment${index}`}>{commentSegment}</p>
          );
        })}
      </section>
      <p>Comment votes: {comment.votes}</p>
      <p>Posted: {dateConverter(comment.created_at, "shortenedDifference")}</p>
      {user === comment.author ? (
        <button className="delete-comment-btn" onClick={handleDeleteComment}>
          {isLoading ? "Deleting..." : "Delete comment"}
        </button>
      ) : null}
    </article>
  );
}
